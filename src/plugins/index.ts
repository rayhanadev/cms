import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { searchPlugin } from '@payloadcms/plugin-search'
import { sentryPlugin } from '@payloadcms/plugin-sentry'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import * as Sentry from '@sentry/nextjs'
import type { Plugin } from 'payload'

import type { Event, HackNightSession, Microgrant, Shelter } from '@/payload-types'

type SeoDoc = Event | HackNightSession | Shelter | Microgrant

const generateTitle: GenerateTitle<SeoDoc> = ({ doc }) => {
  const title = 'name' in doc && doc.name ? doc.name : 'title' in doc ? doc.title : undefined
  return title ? `${title} | Purdue Hackers` : 'Purdue Hackers CMS'
}

const generateURL: GenerateURL<SeoDoc> = ({ doc }) => {
  const base = 'https://cms.purduehackers.com'
  return doc?.id ? `${base}/admin/collections/${doc.id}` : base
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['events', 'shelter', 'microgrants', 'hack-night-sessions'],
    overrides: {
      admin: { group: 'Meta' },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  searchPlugin({
    collections: ['events', 'shelter', 'microgrants', 'hack-night-sessions'],
    searchOverrides: {
      admin: { group: 'Meta' },
    },
  }),
  sentryPlugin({
    Sentry,
    options: {
      captureErrors: [400, 403, 500],
    },
  }),
  mcpPlugin({
    collections: {
      events: { enabled: { find: true } },
      rsvps: { enabled: { find: true } },
      'hack-night-sessions': { enabled: { find: true } },
      shelter: { enabled: { find: true } },
      microgrants: { enabled: { find: true } },
    },
  }),
]
