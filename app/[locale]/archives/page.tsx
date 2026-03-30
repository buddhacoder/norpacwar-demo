import { client } from '@/sanity/lib/client';
import ArchivesClientLayout from './ArchivesClientLayout';
import { Article } from '@/components/ArchiveSearch';
import { Artifact } from '@/components/ArtifactViewer';

export default async function Archives() {
  // Fetch the massive legacy data payload
  const articles: Article[] = await client.fetch(`*[_type == "diary"] | order(date desc) {
    _id,
    title_en,
    content_en,
    date,
    author
  }`);
  
  const artifacts: Artifact[] = await client.fetch(`*[_type == "artifact"] | order(order asc) {
    _id,
    artifact_id,
    title_en,
    title_ru,
    description_en,
    description_ru,
    "model_url": model_file.asset->url
  }`);

  return <ArchivesClientLayout articles={articles} artifacts={artifacts} />;
}
