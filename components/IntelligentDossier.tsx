'use client';

import parse, { HTMLReactParserOptions } from 'html-react-parser';
import GlossaryHover from './GlossaryHover';
import GeoTag from './GeoTag';

const bunoTailCodeRegex = /\b(\d{5})\s*(\d{2,3}V)?\b/g;
const geoRegex = /\b(Atsugi|Kamchatka|Yakutat|Shemya|Whidbey Island|Kurile)\b/g;

export default function IntelligentDossier({ htmlContent }: { htmlContent: string }) {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      // @ts-ignore - checking for text node
      if (domNode.type === 'text' && domNode.data) {
        let text = (domNode as any).data as string;
        
        // Quick check to avoid regex loop if not present
        const hasBuno = bunoTailCodeRegex.test(text);
        const hasGeo = geoRegex.test(text);
        
        if (hasBuno || hasGeo) {
          bunoTailCodeRegex.lastIndex = 0;
          geoRegex.lastIndex = 0;

          // First pass: replace GeoTags
          let elements: (string | JSX.Element)[] = [text];

          if (hasGeo) {
            const newElements: (string | JSX.Element)[] = [];
            elements.forEach((el) => {
              if (typeof el === 'string') {
                const parts = el.split(geoRegex);
                parts.forEach((part, i) => {
                  if (i % 2 === 1) { // It's a match
                    newElements.push(<GeoTag key={`geo-${i}-${part}`} location={part} />);
                  } else if (part) {
                    newElements.push(part);
                  }
                });
              } else {
                newElements.push(el);
              }
            });
            elements = newElements;
          }

          if (hasBuno) {
            const finalElements: (string | JSX.Element)[] = [];
            elements.forEach((el) => {
              if (typeof el === 'string') {
                let lastIndex = 0;
                let match;
                bunoTailCodeRegex.lastIndex = 0;
                
                while ((match = bunoTailCodeRegex.exec(el)) !== null) {
                  if (match.index > lastIndex) {
                    finalElements.push(el.substring(lastIndex, match.index));
                  }

                  const buno = match[1];
                  const tailCode = match[2];

                  finalElements.push(
                    <span key={`buno-${match.index}`} className="inline-flex items-center gap-2 mx-1 px-2 py-0.5 rounded-sm bg-[#12151c] border border-[var(--gold)]/30 font-mono text-[var(--gold)] shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                      <GlossaryHover term="BuNo">{buno}</GlossaryHover>
                      {tailCode && (
                        <span className="text-gray-300 px-1 border-l border-white/20">
                          <GlossaryHover term="Tail Code">{tailCode}</GlossaryHover>
                        </span>
                      )}
                    </span>
                  );

                  lastIndex = match.index + match[0].length;
                }

                if (lastIndex < el.length) {
                  finalElements.push(el.substring(lastIndex));
                }
              } else {
                finalElements.push(el);
              }
            });
            elements = finalElements;
          }

          return <>{elements.map((el, i) => <span key={i}>{el}</span>)}</>;
        }
      }
      return domNode;
    }
  };

  return <>{parse(htmlContent, options)}</>;
}
