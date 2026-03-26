import { setRequestLocale } from 'next-intl/server';
import TributeClientLayout from './TributeClientLayout';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function TributePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <TributeClientLayout />;
}
