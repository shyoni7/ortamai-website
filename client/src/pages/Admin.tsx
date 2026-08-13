import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  LogOut, Plus, Save, Trash2, ChevronDown, ChevronUp, Eye, EyeOff,
  GraduationCap, Inbox, ShieldAlert, Lock, RefreshCw,
} from 'lucide-react';
import { trpc } from '@/lib/trpc';
import type { CourseSection, PriceUnit } from '@shared/defaultCourses';

// Owner-facing admin panel — Hebrew-only, RTL, intentionally utilitarian.

const SECTION_LABELS: Record<CourseSection, string> = {
  courses: 'קורסים',
  lessons: 'שיעורים קבוצתיים ופרטיים',
  subsidized: 'מסלולים מסובסדים',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'חדש',
  contacted: 'יצרנו קשר',
  closed: 'נסגר',
  not_eligible: 'לא זכאי/ת',
};

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-green-100 text-green-800',
  not_eligible: 'bg-gray-200 text-gray-600',
};

const inputClass = 'w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-gray-500 transition-colors';
const labelClass = 'block text-xs font-medium text-gray-500 mb-1';

interface CourseDraft {
  id?: number;
  section: CourseSection;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  originalPrice: number | null;
  priceUnit: PriceUnit;
  badge: string;
  badgeEn: string;
  audience: string;
  audienceEn: string;
  sortOrder: number;
  visible: boolean;
}

export default function Admin() {
  const utils = trpc.useUtils();
  const me = trpc.admin.me.useQuery(undefined, { retry: false, refetchOnWindowFocus: false });

  if (me.isLoading) {
    return (
      <Shell>
        <p className="text-gray-500 text-center py-20">טוען...</p>
      </Shell>
    );
  }

  if (!me.data?.isAdmin) {
    return <LoginScreen configured={me.data?.configured ?? false} onSuccess={() => utils.admin.me.invalidate()} />;
  }

  return <Dashboard dbAvailable={me.data.dbAvailable} onLogout={() => utils.admin.me.invalidate()} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 text-gray-900" style={{ fontFamily: 'inherit' }}>
      {children}
    </div>
  );
}

function LoginScreen({ configured, onSuccess }: { configured: boolean; onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const login = trpc.admin.login.useMutation({
    onSuccess: () => { toast.success('התחברת בהצלחה'); onSuccess(); },
    onError: err => {
      toast.error(err.message === 'Wrong password' ? 'סיסמה שגויה' : 'ההתחברות נכשלה: ' + err.message);
    },
  });

  return (
    <Shell>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-gray-900">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">ניהול האתר</h1>
              <p className="text-xs text-gray-500">ORTAM AI</p>
            </div>
          </div>

          {!configured && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm mb-4">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>הכניסה למערכת אינה מוגדרת עדיין. יש להגדיר את משתנה הסביבה <code dir="ltr">ADMIN_PASSWORD</code> בהגדרות הפרויקט ב-Vercel.</span>
            </div>
          )}

          <form onSubmit={e => { e.preventDefault(); if (password) login.mutate({ password }); }}>
            <label className={labelClass}>סיסמת ניהול</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={inputClass + ' mb-4'}
              autoFocus
            />
            <button type="submit" disabled={login.isPending || !password}
              className="w-full py-2.5 rounded-lg bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 disabled:opacity-50 transition-colors">
              {login.isPending ? 'מתחבר...' : 'כניסה'}
            </button>
          </form>
        </div>
      </div>
    </Shell>
  );
}

function Dashboard({ dbAvailable, onLogout }: { dbAvailable: boolean; onLogout: () => void }) {
  const [tab, setTab] = useState<'courses' | 'orders'>('courses');
  const logout = trpc.admin.logout.useMutation({ onSuccess: onLogout });

  return (
    <Shell>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-bold">ניהול האתר — ORTAM AI</h1>
          </div>
          <button onClick={() => logout.mutate()}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <LogOut className="w-4 h-4" /> יציאה
          </button>
        </div>
        <div className="max-w-5xl mx-auto px-4 flex gap-1">
          <TabButton active={tab === 'courses'} onClick={() => setTab('courses')} icon={GraduationCap} label="קורסים ומחירים" />
          <TabButton active={tab === 'orders'} onClick={() => setTab('orders')} icon={Inbox} label="פניות והזמנות" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {!dbAvailable && (
          <div className="flex items-start gap-2 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm mb-6">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-1">אין חיבור לדאטהבייס</p>
              <p>האתר מציג כרגע את קטלוג ברירת המחדל המובנה. כדי לערוך קורסים ולראות פניות כאן, יש להגדיר את משתנה הסביבה <code dir="ltr">DATABASE_URL</code> ב-Vercel. פניות ממשיכות להגיע אליך במייל בכל מקרה.</p>
            </div>
          </div>
        )}
        {tab === 'courses' ? <CoursesTab dbAvailable={dbAvailable} /> : <OrdersTab dbAvailable={dbAvailable} />}
      </main>
    </Shell>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: {
  active: boolean; onClick: () => void; icon: React.ElementType; label: string;
}) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
        active ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}>
      <Icon className="w-4 h-4" /> {label}
    </button>
  );
}

// ─── Courses tab ───

function CoursesTab({ dbAvailable }: { dbAvailable: boolean }) {
  const utils = trpc.useUtils();
  const coursesQuery = trpc.admin.listCourses.useQuery(undefined, { refetchOnWindowFocus: false });
  const createCourse = trpc.admin.createCourse.useMutation({
    onSuccess: () => { toast.success('הקורס נוצר'); utils.admin.listCourses.invalidate(); utils.courses.list.invalidate(); },
    onError: err => toast.error('היצירה נכשלה: ' + err.message),
  });

  if (!dbAvailable) return null;
  if (coursesQuery.isLoading) return <p className="text-gray-500 text-center py-10">טוען קורסים...</p>;
  if (!coursesQuery.data?.dbAvailable) return null;

  const allCourses = coursesQuery.data.courses;
  const sections: CourseSection[] = ['courses', 'lessons', 'subsidized'];

  return (
    <div className="space-y-8">
      {sections.map(section => {
        const items = allCourses.filter(c => c.section === section);
        return (
          <section key={section}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg">{SECTION_LABELS[section]}</h2>
              <button
                onClick={() => createCourse.mutate({
                  section,
                  title: 'קורס חדש',
                  price: 0,
                  priceUnit: section === 'lessons' ? 'lesson' : 'course',
                  sortOrder: items.length + 1,
                  visible: false,
                })}
                disabled={createCourse.isPending}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <Plus className="w-4 h-4" /> הוספה
              </button>
            </div>
            <div className="space-y-3">
              {items.map(course => <CourseEditor key={course.id} course={course} />)}
              {items.length === 0 && <p className="text-sm text-gray-400">אין פריטים בסקשן הזה.</p>}
            </div>
          </section>
        );
      })}
      <p className="text-xs text-gray-400">
        שינויים נשמרים מיידית באתר החי אחרי לחיצה על "שמירה". פריט מוסתר (עין מחוקה) לא מוצג לגולשים.
      </p>
    </div>
  );
}

function CourseEditor({ course }: { course: any }) {
  const utils = trpc.useUtils();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<CourseDraft>({
    id: course.id,
    section: course.section,
    title: course.title ?? '',
    titleEn: course.titleEn ?? '',
    subtitle: course.subtitle ?? '',
    subtitleEn: course.subtitleEn ?? '',
    description: course.description ?? '',
    descriptionEn: course.descriptionEn ?? '',
    price: course.price ?? 0,
    originalPrice: course.originalPrice ?? null,
    priceUnit: course.priceUnit ?? 'course',
    badge: course.badge ?? '',
    badgeEn: course.badgeEn ?? '',
    audience: course.audience ?? '',
    audienceEn: course.audienceEn ?? '',
    sortOrder: course.sortOrder ?? 0,
    visible: Boolean(course.visible),
  });

  const invalidate = () => { utils.admin.listCourses.invalidate(); utils.courses.list.invalidate(); };
  const update = trpc.admin.updateCourse.useMutation({
    onSuccess: () => { toast.success('נשמר'); invalidate(); },
    onError: err => toast.error('השמירה נכשלה: ' + err.message),
  });
  const remove = trpc.admin.deleteCourse.useMutation({
    onSuccess: () => { toast.success('נמחק'); invalidate(); },
    onError: err => toast.error('המחיקה נכשלה: ' + err.message),
  });

  const set = <K extends keyof CourseDraft>(key: K, value: CourseDraft[K]) =>
    setDraft(p => ({ ...p, [key]: value }));

  const save = () => {
    if (!draft.title.trim()) { toast.error('חסר שם קורס'); return; }
    update.mutate({
      id: course.id,
      section: draft.section,
      title: draft.title.trim(),
      titleEn: draft.titleEn.trim() || null,
      subtitle: draft.subtitle.trim() || null,
      subtitleEn: draft.subtitleEn.trim() || null,
      description: draft.description.trim() || null,
      descriptionEn: draft.descriptionEn.trim() || null,
      price: draft.price,
      originalPrice: draft.originalPrice,
      priceUnit: draft.priceUnit,
      badge: draft.badge.trim() || null,
      badgeEn: draft.badgeEn.trim() || null,
      audience: draft.audience.trim() || null,
      audienceEn: draft.audienceEn.trim() || null,
      sortOrder: draft.sortOrder,
      visible: draft.visible,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 px-4 py-3 cursor-pointer" onClick={() => setOpen(o => !o)}>
        {draft.visible
          ? <Eye className="w-4 h-4 text-green-600 flex-shrink-0" />
          : <EyeOff className="w-4 h-4 text-gray-400 flex-shrink-0" />}
        <span className="font-medium text-sm flex-1 truncate">{draft.title || '(ללא שם)'}</span>
        <span className="text-sm font-bold whitespace-nowrap">₪{draft.price.toLocaleString('he-IL')}</span>
        {draft.originalPrice != null && draft.originalPrice > 0 && (
          <span className="text-xs text-gray-400 line-through whitespace-nowrap">₪{draft.originalPrice.toLocaleString('he-IL')}</span>
        )}
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </div>

      {open && (
        <div className="border-t border-gray-100 p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>שם (עברית)</label>
              <input className={inputClass} value={draft.title} onChange={e => set('title', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>שם (אנגלית)</label>
              <input dir="ltr" className={inputClass} value={draft.titleEn} onChange={e => set('titleEn', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>שורת משנה (עברית)</label>
              <input className={inputClass} value={draft.subtitle} onChange={e => set('subtitle', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>שורת משנה (אנגלית)</label>
              <input dir="ltr" className={inputClass} value={draft.subtitleEn} onChange={e => set('subtitleEn', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>תיאור (עברית)</label>
              <textarea rows={2} className={inputClass} value={draft.description} onChange={e => set('description', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>תיאור (אנגלית)</label>
              <textarea dir="ltr" rows={2} className={inputClass} value={draft.descriptionEn} onChange={e => set('descriptionEn', e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className={labelClass}>מחיר (₪)</label>
              <input type="number" min={0} className={inputClass} value={draft.price}
                onChange={e => set('price', Math.max(0, Number(e.target.value) || 0))} />
            </div>
            <div>
              <label className={labelClass}>מחיר לפני הנחה (₪)</label>
              <input type="number" min={0} className={inputClass} value={draft.originalPrice ?? ''}
                placeholder="ללא"
                onChange={e => set('originalPrice', e.target.value === '' ? null : Math.max(0, Number(e.target.value) || 0))} />
            </div>
            <div>
              <label className={labelClass}>סוג תמחור</label>
              <select className={inputClass} value={draft.priceUnit} onChange={e => set('priceUnit', e.target.value as PriceUnit)}>
                <option value="course">לקורס מלא</option>
                <option value="lesson">למפגש</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>סקשן</label>
              <select className={inputClass} value={draft.section} onChange={e => set('section', e.target.value as CourseSection)}>
                <option value="courses">קורסים</option>
                <option value="lessons">שיעורים</option>
                <option value="subsidized">מסובסד</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>תגית (עברית)</label>
              <input className={inputClass} value={draft.badge} onChange={e => set('badge', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>קהל זכאי (למסובסד)</label>
              <input className={inputClass} value={draft.audience} onChange={e => set('audience', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>סדר תצוגה</label>
              <input type="number" min={0} className={inputClass} value={draft.sortOrder}
                onChange={e => set('sortOrder', Math.max(0, Number(e.target.value) || 0))} />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input type="checkbox" checked={draft.visible} onChange={e => set('visible', e.target.checked)}
                  className="w-4 h-4 accent-gray-900" />
                מוצג באתר
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <button
              onClick={() => { if (window.confirm(`למחוק את "${draft.title}"? פעולה זו אינה הפיכה.`)) remove.mutate({ id: course.id }); }}
              disabled={remove.isPending}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition-colors">
              <Trash2 className="w-4 h-4" /> מחיקה
            </button>
            <button onClick={save} disabled={update.isPending}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition-colors">
              <Save className="w-4 h-4" /> {update.isPending ? 'שומר...' : 'שמירה'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Orders tab ───

function OrdersTab({ dbAvailable }: { dbAvailable: boolean }) {
  const utils = trpc.useUtils();
  const ordersQuery = trpc.admin.listOrders.useQuery(undefined, { refetchOnWindowFocus: false });
  const updateStatus = trpc.admin.updateOrderStatus.useMutation({
    onSuccess: () => utils.admin.listOrders.invalidate(),
    onError: err => toast.error('עדכון הסטטוס נכשל: ' + err.message),
  });

  if (!dbAvailable) return null;
  if (ordersQuery.isLoading) return <p className="text-gray-500 text-center py-10">טוען פניות...</p>;

  const orders = ordersQuery.data?.orders ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{orders.length} פניות</p>
        <button onClick={() => ordersQuery.refetch()}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <RefreshCw className="w-4 h-4" /> רענון
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400">
          עדיין אין פניות. כשמישהו יזמין קורס או יבקש בדיקת זכאות — זה יופיע כאן.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  order.type === 'eligibility_check' ? 'bg-purple-100 text-purple-800' : 'bg-gray-900 text-white'
                }`}>
                  {order.type === 'eligibility_check' ? 'בדיקת זכאות' : 'הזמנה'}
                </span>
                <span className="font-semibold text-sm">{order.courseTitle}</span>
                <span className="text-xs text-gray-400 mr-auto whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' })}
                </span>
              </div>
              <div className="text-sm text-gray-700 flex flex-wrap gap-x-6 gap-y-1 mb-2">
                <span>👤 {order.name}</span>
                <a href={`tel:${order.phone}`} className="hover:underline" dir="ltr">📞 {order.phone}</a>
                <a href={`mailto:${order.email}`} className="hover:underline" dir="ltr">✉️ {order.email}</a>
              </div>
              {order.message && (
                <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 mb-3 whitespace-pre-wrap">{order.message}</p>
              )}
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                  {STATUS_LABELS[order.status]}
                </span>
                <select
                  className="text-sm border border-gray-300 rounded-lg px-2 py-1 bg-white"
                  value={order.status}
                  onChange={e => updateStatus.mutate({ id: order.id, status: e.target.value as any })}>
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
