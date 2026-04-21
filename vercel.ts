import { type VercelConfig, routes } from '@vercel/config/v1'

export const config: VercelConfig = {
  redirects: [routes.redirect('/', '/admin')],
}
