import { Link } from 'wouter';
import { ArrowLeft, ArrowRight, CalendarCheck, GraduationCap, MessageCircle, Briefcase, Users } from 'lucide-react';
import type { ActiveSlide } from '../HeroScene';

export interface Service {
  /** slide id on the projected screen */
  id: string;
  short: string;
  audience: string;
  line: string;
  cta: string;
  href: string;
  external?: boolean;
  more: string;
  moreHref: string;
}

interface Props {
  he: boolean;
  services: Service[];
  active: ActiveSlide | null;
  onPick: (id: string) => void;
}

const ICONS: Record<string, typeof Users> = { ai: GraduationCap, cyber: Users, strategy: Briefcase };

// Three service tabs under the hero screen. The screen and the tabs stay in
// sync: the slide that plays lights its tab and fills its progress bar, and
// picking a tab jumps the screen to that service.
export default function ServiceTabs({ he, services, active, onPick }: Props) {
  // The logo intro counts as the first service so a button is always on show.
  const currentId = services.some(s => s.id === active?.id) ? active!.id : services[0].id;
  const current = services.find(s => s.id === currentId)!;
  const Arrow = he ? ArrowLeft : ArrowRight;
  const CtaIcon = current.external ? MessageCircle : CalendarCheck;
  const playing = active && active.id === currentId;

  return (
    <div className="hero-tabs">
      <div role="group" aria-label={he ? 'בחרו שירות' : 'Choose a service'} className="hero-tabs-row">
        {services.map(s => {
          const Icon = ICONS[s.id] ?? GraduationCap;
          const on = s.id === currentId;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={on}
              onClick={() => onPick(s.id)}
              className="hero-tab"
            >
              <Icon size={20} aria-hidden="true" className="hero-tab-icon" />
              <span className="hero-tab-label">{s.short}</span>
              <span className="hero-tab-aud">{s.audience}</span>
              <span aria-hidden="true" className="hero-tab-track">
                {on && playing && (
                  <span key={`${s.id}-${active!.startedAt}`} className="hero-tab-fill" style={{ animationDuration: `${active!.duration}ms` }} />
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="hero-tabs-panel" aria-live="polite">
        <p key={current.id} className="hero-tabs-line">{current.line}</p>
        <div className="hero-tabs-actions">
          {current.external ? (
            <a href={current.href} target="_blank" rel="noopener noreferrer" className="h-btn h-btn-accent">
              <CtaIcon size={19} aria-hidden="true" />
              <span>{current.cta}</span>
            </a>
          ) : (
            <Link href={current.href} className="h-btn h-btn-accent">
              <CtaIcon size={19} aria-hidden="true" />
              <span>{current.cta}</span>
            </Link>
          )}
          <Link href={current.moreHref} className="h-link hero-tabs-more">
            {current.more}
            <Arrow size={17} className="h-link-arrow" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
