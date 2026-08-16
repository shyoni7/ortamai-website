/**
 * Content for the lobby's floating signs: partners shelf, team & vision.
 * Shared with the About page so there is a single source of truth.
 */

export interface Partner {
  name: string;
  url: string;
  /** Logo artwork needs a dark backing to stay readable. */
  darkBg?: boolean;
}

export const PARTNERS: Partner[] = [
  { name: 'ועד עובדים כלל ביטוח', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/6d9c58ace__abb167b6.png' },
  { name: 'צה"ל', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/97cb921a8_2_c2d719a3.jpeg' },
  { name: 'Tokomni', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/40f5d2b0c_2_085f5bf7.png' },
  { name: 'Omnitelecom', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/eb9cdb162_3_78962139.png' },
  { name: 'אוניברסיטת אריאל', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/4a76ee3ff_566_511a27c5.jpg' },
  { name: 'לומדים ומתקדמים', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/OmLeAhuLRydXUaQC.png' },
  { name: 'MAMRAM Alumni Association', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/IyhRDVcCPTdwTkiK.png', darkBg: true },
  { name: 'ההסתדרות', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/scvBkVKTwknETAgQ.jpg' },
  { name: 'בנק לאומי', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/COWyaNxVzekIQanP.png' },
  { name: 'CyberGo', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/ZMeUfaAopZDjYSah.webp' },
];

export interface TeamMember {
  name: { he: string; en: string };
  role: { he: string; en: string };
  img: string;
  imgPosition?: string;
}

export const TEAM: TeamMember[] = [
  {
    name: { he: 'יהונתן השלי', en: 'Yehonatan HaSheli' },
    role: { he: 'מנכ"ל ומייסד', en: 'CEO & Founder' },
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/5ef60b582___________________ortam_ai_____________________4k_pcqitx1aqs9138twyuwm_0_632aaebc.png',
  },
  {
    name: { he: 'אריאל אלבוים', en: 'Ariel Alboim' },
    role: { he: 'ראש מחלקת הכשרות', en: 'Head of Training' },
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/d27b06cde_105_2760d0fa.jpg',
    imgPosition: 'object-top',
  },
  {
    name: { he: 'יונתן גרבינסקי', en: 'Yonatan Grabinski' },
    role: { he: 'ראש מחלקת שיווק', en: 'Head of Marketing' },
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/d80b2174c_unnamed1_80eb8d9d.png',
  },
  {
    name: { he: 'שי נחום', en: 'Shai Nachum' },
    role: { he: 'CTO', en: 'CTO' },
    img: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/rXJVQOjCqHBhECGn.jpeg',
  },
];

export const CONTACT = {
  email: 'info@ortamai.com',
  phoneDisplay: '052-338-1822',
  phoneHref: 'tel:+972523381822',
  whatsappHref: 'https://wa.me/972523381822',
};
