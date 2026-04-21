import type { CollectionConfig } from 'payload'
import { hasAnyRoles, isEditor } from './auth-utils'
import { renderEmailTemplate } from '@/emails/EmailTemplate'
import type { Event } from '@/payload-types'

// Returns html for email given event info
async function getEmailData(rsvpName: string | null, eventDoc: Event) {
  if (!eventDoc) {
    return
  }

  // Build event-specific info
  const start = eventDoc.start ? new Date(eventDoc.start) : null
  const startTextFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
    timeZone: 'America/New_York',
  })
  const startText = startTextFormatter.format(start)

  const subject = `Excited to see you at ${eventDoc.name}!`
  const heading = `Excited to see you at ${eventDoc.name}!!`
  const text = `${rsvpName ? `Hey ${rsvpName}` : 'Hello friend'}! You're registered to attend ${eventDoc.name} on ${startText} at ${eventDoc.location_name}.`

  // Generate html from React Email
  const html = await renderEmailTemplate({
    heading,
    previewText: text,
    body: text,
    locationName: eventDoc.location_name,
    locationUrl: eventDoc.location_url,
    ctaUrl: `https://events.purduehackers.com/events/${eventDoc.id}`,
  })

  return { subject, text, html }
}

export const Rsvps: CollectionConfig = {
  slug: 'rsvps',
  admin: {
    useAsTitle: 'email',
    group: 'Events',
  },
  access: {
    read: hasAnyRoles('viewer', 'events_website'),
    readVersions: hasAnyRoles('viewer', 'events_website'),
    create: hasAnyRoles('editor', 'events_website'),
    update: hasAnyRoles('editor', 'events_website'),
    delete: isEditor,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'unsubscribed',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Designates whether owner of this email has unsubscribed from further notifs.',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req: { payload } }) => {
        if (operation === 'create') {
          try {
            // Send confirmation email after new rsvp is created
            console.log('New rsvp created:', doc.id)

            const eventId = typeof doc.event === 'object' ? doc.event.id : doc.event
            const eventDoc = await payload.findByID({
              collection: 'events',
              id: eventId,
            })

            const emailInfo = await getEmailData(doc.name, eventDoc)
            if (!emailInfo) {
              console.error('Email data generation failed', { doc, eventDoc })
              return
            }

            await payload.sendEmail({
              to: doc.email,
              subject: emailInfo.subject,
              text: emailInfo.text,
              html: emailInfo.html,
            })
          } catch (err) {
            console.error('RSVP email send hook failed:', err)
          }
        }
      },
    ],
  },
}
