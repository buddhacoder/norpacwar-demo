import { client } from '@/sanity/lib/client';
import UnitsClientLayout from './UnitsClientLayout';

export const revalidate = 60;

export default async function UnitsPage() {
  const query = `*[_type == "diary" && title_en match "*VPB*"] {
    title_en,
    content_en,
    "image": image.asset->url
  }`;

  const fetchedUnits = await client.fetch(query);
  
  return <UnitsClientLayout data={fetchedUnits} />;
}
