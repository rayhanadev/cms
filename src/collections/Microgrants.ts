import type { CollectionConfig } from 'payload'
import { accessTrySequential, isEditor, isViewer } from './auth-utils'

export const Microgrants: CollectionConfig = {
  slug: 'microgrants',
  admin: {
    useAsTitle: 'name',
    group: 'Microgrants',
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
      name: 'author',
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
    {
      name: 'authorUrl',
      type: 'text',
      admin: {
        description: 'URL to the author\'s website',
      },
    },
    {
      name: 'projectUrl',
      type: 'text',
      admin: {
        description: 'URL to the project\'s website',
      },
    },
  ],
}
