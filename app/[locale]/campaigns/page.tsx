import { client } from '@/sanity/lib/client';
import CampaignsClientLayout from './CampaignsClientLayout';

export const revalidate = 60;

export default async function CampaignsPage() {
  const query = `*[_type == "diary" && title_en in ["Aleutian Campaign", "Dutch Harbor Attack", "Kurile Operations", "Shumshu Landing"]] {
    title_en,
    content_en,
    "image": image.asset->url
  }`;

  const fetchedCampaigns = await client.fetch(query);
  
  return <CampaignsClientLayout data={fetchedCampaigns} />;
}
