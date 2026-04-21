import { withPayload } from '@payloadcms/next/withPayload'
import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '*': ['node_modules/@sentry/nextjs/build/**/*'],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin',
        permanent: false,
      },
    ]
  },
  reactStrictMode: true,
}

export default withSentryConfig(withPayload(nextConfig, { devBundleServerPackages: false }), {
  org: 'purduehackers',
  project: 'cms',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
})
