import { client } from '@/sanity/lib/client';
import AircraftClientLayout from './AircraftClientLayout';

export const revalidate = 60;

export default async function AircraftPage() {
  const query = `{
    "gallery": *[_type == "diary" && defined(image)][0...6] {
      "src": image.asset->url,
      "alt": title_en,
      "id": _id,
      "caption": title_en
    },
    "overview": *[_type == "diary" && title_en == "pv-1-ventura-overview"][0],
    "losses": *[_type == "diary" && title_en == "PV-1 losses in North Pacific Theatre"][0]
  }`;

  const data = await client.fetch(query);
  
  return <AircraftClientLayout data={data} />;
}
