import {defineField, defineType} from 'sanity'

export const diaryType = defineType({
  name: 'diary',
  title: 'Diary Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title_ru',
      title: 'Title (Russian)',
      type: 'string',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'content_en',
      title: 'Content (English)',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content_ru',
      title: 'Content (Russian)',
      type: 'text',
    }),
    defineField({
      name: 'date',
      title: 'Document Date',
      type: 'date',
    }),
    defineField({
      name: 'image',
      title: 'Scanned Document / Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
  ],
  preview: {
    select: {
      title: 'title_en',
      subtitle: 'author',
      media: 'image',
    },
  },
})
