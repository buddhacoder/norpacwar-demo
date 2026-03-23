'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Clock } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export type Article = {
  _id: string;
  title_en: string;
  content_en: string;
  date: string;
  author: string;
};

type Dossier = {
  id: string;
  name: string;
  rank: string;
  squadron: string;
  date: string;
  buno: string;
  status: string;
  detail: string;
};

// Hardcoded cinematic data
const historicDossiers: Dossier[] = [
  { id: '1', name: 'Owen L. Parmenter', rank: 'Lt. (j.g)', squadron: 'VB-136', date: '5/10/43', buno: '29847/9', status: 'M.I.A.', detail: 'Missing following operational search in heavy weather.' },
  { id: '2', name: 'Robert J. Molloy', rank: 'Lt. (j.g)', squadron: 'VB-136', date: '5/10/43', buno: '29794/5', status: 'K.I.A.', detail: 'Crashed into Kuluk Bay, Adak, in bad weather while returning from rescue search.' },
  { id: '3', name: 'Byron L. Lough', rank: 'Lt. (j.g)', squadron: 'VB-138', date: '5/14/43', buno: '33142', status: 'K.I.A.', detail: 'Hit Mt. Washington near its top in heavy weather following departure.' },
];

export function ArchiveSearch({ articles = [] }: { articles: Article[] }) {
  const tSearch = useTranslations('Search');
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (isOpen || selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, selectedArticle]);

  // Strip HTML for the search index to find text matches within the massive legacy WP content
  const stripHtml = (html: string) => {
    if (typeof window === 'undefined') return html.replace(/<[^>]*>?/gm, '');
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const filteredDossiers = historicDossiers.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) || 
    d.buno.includes(query) ||
    d.squadron.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArticles = articles.filter(a => {
    if(!a.title_en) return false;
    const titleMatch = a.title_en.toLowerCase().includes(query.toLowerCase());
    if (titleMatch) return true;
    // Don't search the entire raw body on every keystroke unless query is long enough
    if (query.length > 3 && a.content_en) {
      const stripped = stripHtml(a.content_en);
      return stripped.toLowerCase().includes(query.toLowerCase());
    }
    return false;
  });

  return (
    <>
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between glass-panel px-6 py-5 border border-white/10 hover:border-[var(--gold)]/50 transition-colors group cursor-pointer"
      >
        <div className="flex items-center gap-4 text-gray-300">
          <Search className="w-6 h-6 text-[var(--gold)] group-hover:text-white transition-colors" />
          <span className="font-serif text-lg tracking-wide">{tSearch('placeholder')}</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 font-mono bg-black/40 px-3 py-1.5 rounded-sm">
          <span>⌘</span><span>K</span>
        </div>
      </motion.button>

      {/* Full Screen Reader Modal for Legacy Articles */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a] overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto px-6 py-20 relative">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-8 right-6 text-white/50 hover:text-white glass-panel p-3 rounded-full z-50 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
                 {locale === 'ru' && (selectedArticle as any).title_ru ? (selectedArticle as any).title_ru : selectedArticle.title_en}
              </h1>
              <div className="flex items-center gap-4 text-gray-400 font-mono text-sm border-b border-white/10 pb-8 mb-12">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {selectedArticle.date || 'Historical Record'}</span>
                <span>&bull;</span>
                <span>Archived by {selectedArticle.author || 'bilchenko-admin'}</span>
              </div>

              {/* Legacy WordPress Content Rendered Safely */}
              <div 
                className="prose prose-invert prose-lg max-w-none font-light leading-relaxed [&_img]:rounded-md [&_img]:mx-auto [&_a]:text-[var(--gold)] [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: locale === 'ru' && (selectedArticle as any).content_ru ? (selectedArticle as any).content_ru : (selectedArticle.content_en || '') }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && !selectedArticle && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex flex-col pt-32 px-4 sm:px-8 bg-black/80"
          >
            <motion.button 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => { setIsOpen(false); setQuery(''); }}
              className="absolute top-10 right-10 text-white/50 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all"
            >
              <X className="w-8 h-8" />
            </motion.button>

            <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 h-full pb-20">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                className="w-full relative"
              >
                <input 
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={tSearch('placeholder')}
                  className="w-full bg-transparent border-b-2 border-white/20 pb-4 text-3xl sm:text-5xl font-serif text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-white/20 font-mono text-sm">
                  {articles.length > 0 ? `${articles.length} Archival Records Loaded` : 'Initializing Archive DB...'}
                </div>
              </motion.div>

              <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                <AnimatePresence mode="popLayout">
                  {query && (filteredDossiers.length > 0 || filteredArticles.length > 0) ? (
                    <motion.div layout className="flex flex-col gap-10">
                      
                      {/* DOSSIERS SECTION */}
                      {filteredDossiers.length > 0 && (
                        <div className="flex flex-col gap-4">
                          <h4 className="text-[var(--gold)] font-mono text-sm tracking-widest uppercase mb-2">Roll of Honor Personnel Files</h4>
                          {filteredDossiers.map((dossier, i) => (
                            <motion.div
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.4, delay: i * 0.05 }}
                              key={dossier.id}
                              className="glass-panel p-6 sm:p-8 relative overflow-hidden group hover:border-[var(--gold)]/30 transition-colors border-l-4 border-l-[var(--gold)]"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 relative z-10">
                                <div className="col-span-12 sm:col-span-8 flex flex-col justify-center">
                                  <h3 className="text-3xl font-serif text-white mb-2">{dossier.name}</h3>
                                  <p className="text-gray-400 font-mono text-sm tracking-wider uppercase">
                                    {dossier.rank} &bull; {dossier.squadron} &bull; BUNO: {dossier.buno}
                                  </p>
                                  <p className="mt-4 text-gray-300 italic opacity-80 leading-relaxed">"{dossier.detail}"</p>
                                </div>
                                <div className="col-span-12 sm:col-span-4 flex flex-col sm:items-end justify-center border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                                   <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Status</div>
                                   <div className={`text-2xl font-bold font-serif ${dossier.status.includes('K.I.A.') || dossier.status.includes('M.I.A.') ? 'text-red-500/90' : 'text-[var(--gold)]'}`}>
                                     {dossier.status}
                                   </div>
                                   <div className="text-sm font-mono text-white/50 mt-2">{dossier.date}</div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* LEGACY WORDPRESS ARTICLES SECTION */}
                      {filteredArticles.length > 0 && (
                        <div className="flex flex-col gap-4">
                          <h4 className="text-gray-500 font-mono text-sm tracking-widest uppercase mb-2 mt-4">Legacy Archival Scans</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredArticles.map((article, i) => (
                              <motion.div
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: i * 0.03 }}
                                key={article._id}
                                onClick={() => setSelectedArticle(article)}
                                className="glass-panel p-6 cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all flex flex-col gap-4 border border-white/5"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="p-3 bg-black/40 rounded-lg shrink-0">
                                    <BookOpen className="w-6 h-6 text-gray-400" />
                                  </div>
                                    <div>
                                      <h3 className="text-xl font-serif text-white mb-1 line-clamp-2">
                                        {locale === 'ru' && (article as any).title_ru ? (article as any).title_ru : article.title_en}
                                      </h3>
                                      <div className="text-xs font-mono tracking-wider text-gray-500 uppercase">
                                        {article.date || 'Archive Record'}
                                      </div>
                                    </div>
                                  </div>
                                  <p className="text-sm font-light text-gray-400 line-clamp-3 leading-relaxed pl-14">
                                    {(locale === 'ru' && (article as any).content_ru) 
                                      ? stripHtml((article as any).content_ru).substring(0, 150) + '...'
                                      : (article.content_en ? stripHtml(article.content_en).substring(0, 150) + '...' : 'No preview available. Tap to view full archival scan.')}
                                  </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                    </motion.div>
                  ) : null}

                  {query && filteredDossiers.length === 0 && filteredArticles.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center pt-20"
                    >
                      <p className="text-2xl font-serif text-white/30 italic">No corresponding records found in the archive.</p>
                      <p className="text-sm text-white/20 mt-4 font-mono">Archive database contains {articles.length} legacy records. Try a broader term.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
