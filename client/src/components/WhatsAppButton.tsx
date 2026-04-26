import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const WHATSAPP_NUMBER = '972523381822';
const WHATSAPP_MESSAGE = encodeURIComponent('שלום, אני מעוניין לשמוע על שירותי ORTAM AI');

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  const svgRef = useRef<SVGSVGElement>(null);

  // Inject the SVG defs into document body so the mask works cross-browser
  useEffect(() => {
    const existing = document.getElementById('wa-svg-defs');
    if (existing) return;
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('id', 'wa-svg-defs');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.position = 'absolute';
    svg.style.overflow = 'hidden';
    svg.innerHTML = `
      <defs>
        <clipPath id="wa-clipping" clipPathUnits="objectBoundingBox">
          <polygon points="0.5,0.07 0.93,0.28 0.93,0.72 0.5,0.93 0.07,0.72 0.07,0.28"/>
        </clipPath>
      </defs>
    `;
    document.body.appendChild(svg);
    return () => { svg.remove(); };
  }, []);

  return (
    <>
      <style>{`
        .wa-btn-outer {
          --color-one: #25D366;
          --color-two: #128C7E;
          --color-three: #25D36680;
          --color-four: #128C7E80;
          --color-five: #25D36640;
          --time-animation: 2s;
          position: relative;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          box-shadow:
            0 0 25px 0 var(--color-three),
            0 20px 50px 0 var(--color-four);
          animation: wa-colorize calc(var(--time-animation) * 3) ease-in-out infinite;
        }

        .wa-btn-outer::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border-top: solid 1px var(--color-one);
          border-bottom: solid 1px var(--color-two);
          background: linear-gradient(180deg, var(--color-five), var(--color-four));
          box-shadow:
            inset 0 10px 10px 0 var(--color-three),
            inset 0 -10px 10px 0 var(--color-four);
        }

        .wa-btn-fill {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(180deg, var(--color-one) 30%, var(--color-two) 70%);
          clip-path: url(#wa-clipping);
          animation: wa-morph calc(var(--time-animation) / 2) linear infinite;
        }

        .wa-btn-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.5));
        }

        @keyframes wa-morph {
          0%   { clip-path: polygon(50% 7%, 93% 28%, 93% 72%, 50% 93%, 7% 72%, 7% 28%); }
          25%  { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
          50%  { clip-path: polygon(50% 7%, 93% 28%, 93% 72%, 50% 93%, 7% 72%, 7% 28%); }
          75%  { clip-path: polygon(50% 12%, 88% 30%, 88% 70%, 50% 88%, 12% 70%, 12% 30%); }
          100% { clip-path: polygon(50% 7%, 93% 28%, 93% 72%, 50% 93%, 7% 72%, 7% 28%); }
        }

        @keyframes wa-colorize {
          0%   { filter: hue-rotate(0deg); }
          20%  { filter: hue-rotate(-10deg); }
          40%  { filter: hue-rotate(-20deg); }
          60%  { filter: hue-rotate(-10deg); }
          80%  { filter: hue-rotate(-5deg); }
          100% { filter: hue-rotate(0deg); }
        }
      `}</style>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp.tooltip}
        className="fixed bottom-6 left-6 z-50 cursor-pointer"
        style={{ display: 'block', width: 60, height: 60 }}
      >
        <div className="wa-btn-outer">
          <div className="wa-btn-fill" />
          <div className="wa-btn-icon">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
        </div>
      </a>
    </>
  );
}
