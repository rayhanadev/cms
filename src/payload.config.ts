import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import * as Sentry from '@sentry/nextjs'
import path from 'path'
import { buildConfig, type EmailAdapter } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Emails } from './collections/Emails'
import { Events } from './collections/Events'
import { HackNightSessions } from './collections/HackNightSessions'
import { Media } from './collections/Media'
import { Microgrants } from './collections/Microgrants'
import { Rsvps } from './collections/Rsvps'
import { ServiceAccounts } from './collections/ServiceAccounts'
import { Shelter } from './collections/Shelter'
import { Users } from './collections/Users'
import { plugins } from './plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const allowedOrigins = [
  'https://cms.purduehackers.com',
  'https://events.purduehackers.com',
  'http://localhost:4321',
  process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`,
].filter((value): value is string => Boolean(value))

function wrapAdapterWithSentry(adapter: EmailAdapter): EmailAdapter {
  return (...outerArgs) => {
    const instance = adapter(...outerArgs)
    return {
      ...instance,
      sendEmail: (...innerArgs) =>
        instance.sendEmail(...innerArgs).catch((error) => {
          Sentry.captureException(error)
          throw error
        }),
    }
  }
}

export default buildConfig({
  serverURL: 'https://cms.purduehackers.com',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    ServiceAccounts,
    Media,
    Events,
    Emails,
    Rsvps,
    HackNightSessions,
    Shelter,
    Microgrants,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.TURSO_DATABASE_URL || '',
      authToken: process.env.TURSO_AUTH_TOKEN,
    },
    push: false,
  }),
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  email: wrapAdapterWithSentry(
    resendAdapter({
      defaultFromAddress: 'events@purduehackers.com',
      defaultFromName: 'Purdue Hackers',
      apiKey: process.env.RESEND_API_KEY || '',
    }),
  ),
  cors: allowedOrigins,
  csrf: allowedOrigins,
})
