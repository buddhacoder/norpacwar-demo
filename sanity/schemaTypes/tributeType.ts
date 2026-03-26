import { defineType, defineField } from 'sanity';

export const tributeType = defineType({
  name: 'tribute',
  title: 'Tribute Carnations',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Visitor Name' }),
    defineField({ name: 'message', type: 'text', title: 'Message / Social Handling' }),
    defineField({ name: 'xLocation', type: 'number', title: 'X Coordinate (%)' }),
    defineField({ name: 'rotation', type: 'number', title: 'Rotation Angle' }),
    defineField({ name: 'approved', type: 'boolean', title: 'Moderation Approved', initialValue: true })
  ],
  preview: {
    select: { title: 'name', subtitle: 'message' }
  }
});
