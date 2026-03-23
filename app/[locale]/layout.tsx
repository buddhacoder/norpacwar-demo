import type { Metadata } from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Link} from '@/i18n/routing';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import AleutianAsh from '@/components/AleutianAsh';
import CyrillicGhostQuotes from '@/components/CyrillicGhostQuotes';
import HapticsProvider from '@/components/HapticsProvider';
import AmbientAudio from '@/components/AmbientAudio';
import '../globals.css';

export const metadata: Metadata = {
  title: "North Pacific Skies – People and Machines",
  description: "Honoring the history of the Aleutian and Kurile campaigns.",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  
  // Fetch translations for server-rendered UI components
  const tNav = await getTranslations('Navigation');
  const tFoot = await getTranslations('Footer');

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <HapticsProvider />
          <AleutianAsh />
          <CyrillicGhostQuotes />
          <AmbientAudio />
          <nav className="fixed w-full z-50 glass-panel border-b-0 border-white/5 top-0 transition-all duration-300 backdrop-blur-md bg-black/30">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/" className="text-gold font-serif text-xl font-semibold tracking-wider">
                North Pacific Skies
              </Link>
              <div className="flex gap-6 text-sm text-gray-300 font-medium tracking-wide items-center">
                <Link href="/campaigns" className="hover:text-gold transition-colors">{tNav('campaigns')}</Link>
                <Link href="/units" className="hover:text-gold transition-colors">{tNav('units')}</Link>
                <Link href="/aircraft" className="hover:text-gold transition-colors">{tNav('aircraft')}</Link>
                <Link href="/archives" className="hover:text-gold transition-colors">{tNav('archives')}</Link>
                <LocaleSwitcher locale={locale} />
              </div>
            </div>
          </nav>
          <main className="flex-grow pt-20">
            {children}
          </main>
          <footer className="glass-panel py-8 mt-20 text-center text-gray-500 text-sm border-t border-white/10">
            <p>© {new Date().getFullYear()} {tFoot('rights')}</p>
            <p className="mt-2 text-xs italic opacity-70">{tFoot('dedication')}</p>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
