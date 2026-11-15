import type { Dish, DishLabels } from '@/components/ui/dish-orbit-carousel';

/**
 * The made-up restaurant menu shown inside the Claude Code hero demo.
 * Plates are free Unsplash photos, cut out (see client/public/images/demo).
 */

const IMG = '/images/demo';

interface DemoDish {
  image: string;
  rating: number;
  likes: number;
  accent: string;
  he: Pick<Dish, 'title' | 'subtitle' | 'label' | 'chef' | 'kitchen' | 'description' | 'ingredients'>;
  en: Pick<Dish, 'title' | 'subtitle' | 'label' | 'chef' | 'kitchen' | 'description' | 'ingredients'>;
}

const DISHES: DemoDish[] = [
  {
    image: `${IMG}/dish-steak.webp`, rating: 4.9, likes: 96, accent: '#f6a37c',
    he: {
      title: 'על הגחלים', subtitle: 'אנטריקוט', label: 'אנטריקוט וצ׳יפס', chef: 'מנת הדגל', kitchen: 'מהגריל, כל ערב',
      description: 'אנטריקוט מיושן 28 יום, צרוב על גחלים, עם צ׳יפס דק וירוקים חרוכים.',
      ingredients: ['אנטריקוט', 'צ׳יפס', 'ברוקולי', 'שעועית ירוקה'],
    },
    en: {
      title: 'Char grill', subtitle: 'Ribeye', label: 'Ribeye frites', chef: 'House special', kitchen: 'From the grill, every night',
      description: 'Dry-aged for 28 days, seared over charcoal. Thin fries, charred greens.',
      ingredients: ['Ribeye', 'Fries', 'Broccoli', 'Green beans'],
    },
  },
  {
    image: `${IMG}/dish-salad.webp`, rating: 4.3, likes: 71, accent: '#f2a6c6',
    he: {
      title: 'מהים', subtitle: 'סלמון', label: 'סלט סלמון', chef: 'קל ורענן', kitchen: 'מנה ראשונה',
      description: 'סלמון כבוש בהדרים על רוקט ואבוקדו, עם מלפפון ורוטב שמיר.',
      ingredients: ['סלמון כבוש', 'אבוקדו', 'רוקט', 'מלפפון', 'שמיר'],
    },
    en: {
      title: 'Ocean', subtitle: 'Salmon', label: 'Salmon salad', chef: 'Light and fresh', kitchen: 'Starter',
      description: 'Citrus-cured salmon over rocket and avocado, with cucumber and a dill dressing.',
      ingredients: ['Cured salmon', 'Avocado', 'Rocket', 'Cucumber', 'Dill'],
    },
  },
  {
    image: `${IMG}/dish-fish.webp`, rating: 4.6, likes: 88, accent: '#bcd98e',
    he: {
      title: 'על עדשים', subtitle: 'לברק', label: 'לברק על עדשים', chef: 'דג היום', kitchen: 'מנה עיקרית',
      description: 'לברק בעור פריך על עדשים שחורות, ביצה רכה וגזר מזוגג.',
      ingredients: ['לברק', 'עדשים שחורות', 'ביצה רכה', 'גזר', 'שומשום'],
    },
    en: {
      title: 'Black lentil', subtitle: 'Sea bass', label: 'Lentil sea bass', chef: 'Catch of the day', kitchen: 'Main course',
      description: 'Crisp-skin sea bass on beluga lentils with a soft egg and glazed carrots.',
      ingredients: ['Sea bass', 'Beluga lentils', 'Soft egg', 'Carrot', 'Sesame'],
    },
  },
  {
    image: `${IMG}/dish-melon.webp`, rating: 4.5, likes: 64, accent: '#f5d26a',
    he: {
      title: 'מהגינה', subtitle: 'מלון', label: 'סלט מלון קיצי', chef: 'עונתי', kitchen: 'רק בקיץ',
      description: 'מלון, עגבניות שרי צלויות ורוקט, עם סחיטה של ליים.',
      ingredients: ['מלון', 'עגבניות שרי', 'רוקט', 'ליים'],
    },
    en: {
      title: 'Garden', subtitle: 'Melon', label: 'Garden melon salad', chef: 'Seasonal', kitchen: 'Summer only',
      description: 'Cantaloupe, blistered tomatoes and rocket, with a squeeze of lime.',
      ingredients: ['Cantaloupe', 'Cherry tomato', 'Rocket', 'Lime'],
    },
  },
  {
    image: `${IMG}/dish-egg.webp`, rating: 4.7, likes: 120, accent: '#9fcbe8',
    he: {
      title: 'ביצת', subtitle: 'עין', label: 'ביצת עין', chef: 'ארוחת בוקר', kitchen: 'כל היום',
      description: 'ביצת משק בחמאה חומה, עם שוליים פריכים וחלמון רך.',
      ingredients: ['ביצת משק', 'חמאה חומה', 'מלח ים', 'פלפל שחור'],
    },
    en: {
      title: 'Sunny', subtitle: 'Side up', label: 'Sunny side up', chef: 'Breakfast', kitchen: 'All day',
      description: 'One farm egg, basted in brown butter until the edges lace and the yolk just sets.',
      ingredients: ['Farm egg', 'Brown butter', 'Sea salt', 'Black pepper'],
    },
  },
];

export const DEMO_BACKDROP = `${IMG}/dish-room.webp`;

export function demoDishes(lang: 'he' | 'en'): Dish[] {
  return DISHES.map(d => ({ image: d.image, alt: '', rating: d.rating, likes: d.likes, accent: d.accent, ...d[lang] }));
}

export const DEMO_LABELS: Record<'he' | 'en', Partial<DishLabels>> = {
  he: {
    play: 'צפו בסרטון', order: 'הזמינו עכשיו', overview: 'על המנה', ingredients: 'מרכיבים', likes: 'אהבו',
    eyebrow: n => `מספר ${n} בתפריט`,
  },
  en: {},
};
