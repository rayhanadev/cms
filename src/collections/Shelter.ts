import type { CollectionConfig } from 'payload'
import { accessTrySequential, isEditor, isViewer } from './auth-utils'

export const Shelter: CollectionConfig = {
  slug: 'shelter',
  admin: {
    useAsTitle: 'name',
    group: 'Shelter',
  },
  access: {
    read: accessTrySequential(isViewer, () => ({ visible: { equals: true } })),
    readVersions: isViewer,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to hide from the public API',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'last_division',
      type: 'text',
      required: true,
    },
    {
      name: 'last_owner',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
