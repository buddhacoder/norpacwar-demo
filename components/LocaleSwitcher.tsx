'use client';

import {usePathname, Link} from '@/i18n/routing';

export default function LocaleSwitcher({locale}: {locale: string}) {
  const pathname = usePathname();

  return (
    <div className="ml-4 border-l border-white/20 pl-4 flex gap-2">
      <Link 
        href={pathname} 
        locale="en" 
        className={`transition-colors ${locale === 'en' ? 'text-gold hover:text-white' : 'hover:text-gold'}`}
      >
        EN
      </Link>
      <span className="text-gray-600">|</span>
      <Link 
        href={pathname} 
        locale="ru" 
        className={`transition-colors ${locale === 'ru' ? 'text-gold hover:text-white' : 'hover:text-gold'}`}
      >
        RU
      </Link>
    </div>
  );
}
