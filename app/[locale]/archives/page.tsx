import { client } from '@/sanity/lib/client';
import ArchivesClientLayout from './ArchivesClientLayout';
import { Article } from '@/components/ArchiveSearch';

export default async function Archives() {
  // Fetch the massive legacy data payload
  const articles: Article[] = await client.fetch(`*[_type == "diary"] | order(date desc) {
    _id,
    title_en,
    content_en,
    date,
    author
  }`);

  return <ArchivesClientLayout articles={articles} />;
}
