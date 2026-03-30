import { setRequestLocale } from 'next-intl/server';
import TributeClientLayout from './TributeClientLayout';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TributePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TributeClientLayout />;
}
