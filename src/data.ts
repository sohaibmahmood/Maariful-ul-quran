import { CourseItem, SiteContent } from "./types";

import heroQuranImg from "./assets/images/hero_quran_academy_1794672796405.jpg";
import aboutStudyImg from "./assets/images/about_sacred_learning_1794672797081.jpg";
import courseQaidaImg from "./assets/images/course_noorani_qaida_1794672796567.jpg";
import courseNazraImg from "./assets/images/course_quran_nazra_1794672797138.jpg";
import courseTajweedImg from "./assets/images/course_quran_tajweed_1794672796739.jpg";
import courseHifzImg from "./assets/images/course_quran_hifz_1794672798539.jpg";
import courseDuasImg from "./assets/images/course_islamic_duas_1794672798241.jpg";
import courseKnowledgeImg from "./assets/images/course_islamic_knowledge_1794672798776.jpg";

export const ACADEMY_LOGO_PATH = "./assets/aistudio/image_be721b80.png";
export const HERO_IMAGE = heroQuranImg;
export const ABOUT_IMAGE = aboutStudyImg;

export const DEFAULT_SITE_CONTENT: SiteContent = {
  academyName: "Maarif ul Quran",
  tagline: "Learn, Understand, Live the Quran.",
  whatsappDisplay: "03291982198",
  whatsappIntl: "923291982198",
  email: "maarifulquran.academy@gmail.com",
  heroHeading: "Learn the Quran with Care, Patience and Purpose.",
  heroSubheading: "Personalised One-to-One Online Quran Classes for Children and Adults.",
  heroDescription:
    "Begin your Quran learning journey with Maarif ul Quran. We provide personalised online Quran education with qualified teachers, individual attention and a friendly, supportive learning environment.",
  aboutHeading: "About Maarif ul Quran.",
  aboutSubheading: "Making Quran Learning Accessible, Personal and Meaningful.",
  aboutMission:
    "To make quality Quran education accessible through patient teaching, individual attention and consistent guidance.",
  aboutVision:
    "To help children and adults build a lasting connection with the Holy Quran and develop essential Islamic knowledge.",
  feesApproachTitle: "Accessible Quran Education for Every Family",
  feesApproachQuote:
    "At Maarif ul Quran, our priority is to make Quran education accessible, not expensive. We do not put a price on the Holy Quran or its teachings. Our fees simply support the time, effort and dedication of our teachers. We strive to keep our learning options very affordable so that more families can benefit. Please feel free to contact us without worrying about the fees.",
};

export const COURSES_DATA: CourseItem[] = [
  {
    id: "noorani-qaida",
    number: "01",
    title: "Noorani Qaida",
    shortDesc:
      "Learn Arabic letters, pronunciation, joining letters and basic reading rules step by step.",
    suitableLevel: "Beginners · Children & Adults starting from scratch",
    audienceTag: "children",
    highlights: [
      "Recognition of Arabic letters and their forms",
      "Correct pronunciation from the articulation points",
      "Step-by-step practice joining letters into words",
    ],
    image: courseQaidaImg,
  },
  {
    id: "quran-reading-nazra",
    number: "02",
    title: "Quran Reading (Nazra)",
    shortDesc:
      "Improve Quran reading, fluency and pronunciation through guided lessons and regular practice.",
    suitableLevel: "Elementary to Intermediate · Children & Adults",
    audienceTag: "all",
    highlights: [
      "Guided reading directly from the Mushaf",
      "Steady fluency building without rushing",
      "Gentle correction of common reading mistakes",
    ],
    image: courseNazraImg,
  },
  {
    id: "quran-with-tajweed",
    number: "03",
    title: "Quran with Tajweed",
    shortDesc:
      "Learn essential Tajweed rules and develop correct Quran recitation and pronunciation.",
    suitableLevel: "Intermediate to Advanced · Fluent Readers",
    audienceTag: "adults",
    highlights: [
      "Essential rules of Noon Sakinah, Meem Sakinah & Madd",
      "Practical application during live one-to-one recitation",
      "Measured, respectful and confident recitation",
    ],
    image: courseTajweedImg,
  },
  {
    id: "quran-memorisation-hifz",
    number: "04",
    title: "Quran Memorisation (Hifz)",
    shortDesc:
      "Follow a structured memorisation journey with new lessons, regular revision and individual guidance.",
    suitableLevel: "Dedicated Learners · Selected Surahs or Full Hifz",
    audienceTag: "all",
    highlights: [
      "Structured daily Sabaq (new memorisation) targets",
      "Consistent Sabaqi and Manzil revision system",
      "Paced to each student's memory and school schedule",
    ],
    image: courseHifzImg,
  },
  {
    id: "basic-islamic-duas",
    number: "05",
    title: "Basic Islamic Duas",
    shortDesc:
      "Learn essential daily duas with their meanings and understand when and how to recite them in everyday life.",
    suitableLevel: "All Ages · Especially Recommended for Children",
    audienceTag: "children",
    highlights: [
      "Daily morning, evening, eating, and travel duas",
      "Clear Arabic pronunciation with simple English meanings",
      "Encouraging practical habits in daily family life",
    ],
    image: courseDuasImg,
  },
  {
    id: "basic-islamic-knowledge",
    number: "06",
    title: "Basic Islamic Knowledge",
    shortDesc:
      "Learn essential Islamic teachings, good manners, daily Islamic practices and foundational Islamic knowledge.",
    suitableLevel: "Children & Beginners · Foundational Studies",
    audienceTag: "all",
    highlights: [
      "Core beliefs, pillars of Islam, and Wudu & Salah guidance",
      "Islamic manners (Adab), honesty, and kindness to parents",
      "Age-appropriate lessons taught with warmth and clarity",
    ],
    image: courseKnowledgeImg,
  },
];

export const TEACHER_CARE_POINTS = [
  "Friendly and kind behaviour with children.",
  "Patient and understanding teaching approach.",
  "Encouragement instead of unnecessary pressure.",
  "Lessons according to each child's age and learning pace.",
  "A comfortable and positive learning experience.",
  "Respectful communication with students and parents.",
];

export const WHY_CHOOSE_FEATURES = [
  {
    number: "01",
    title: "One-to-One Classes",
    description:
      "Individual attention for every student instead of group-based learning.",
  },
  {
    number: "02",
    title: "Certified Quran Teachers",
    description:
      "Learn with qualified and certified Quran teachers who provide proper guidance and support.",
  },
  {
    number: "03",
    title: "Flexible Timings",
    description:
      "Convenient class scheduling according to students' and families' availability.",
  },
  {
    number: "04",
    title: "Affordable Learning",
    description:
      "We aim to make quality Quran education accessible through affordable learning options.",
  },
  {
    number: "05",
    title: "Regular Progress Updates",
    description:
      "Parents receive regular updates about their children's attendance, lessons and learning progress.",
  },
  {
    number: "06",
    title: "Personalised Learning",
    description:
      "Every student receives guidance according to their individual level, needs and learning pace.",
  },
];

export const TEACHING_VALUES = [
  "Patience and kindness.",
  "Individual attention.",
  "Friendly teaching.",
  "Respect and understanding.",
  "Consistent learning.",
  "Quality Quran education.",
];

export const TRUST_ASSURANCES = [
  {
    label: "Format",
    value: "1-on-1 Live Classes",
    detail: "Dedicated personal attention in every session",
  },
  {
    label: "Curriculum",
    value: "6 Structured Programmes",
    detail: "From Noorani Qaida to Tajweed, Hifz & Duas",
  },
  {
    label: "Scheduling",
    value: "Flexible Family Timings",
    detail: "Arranged around school, work & local timezones",
  },
  {
    label: "Parent Updates",
    value: "Regular Progress Reports",
    detail: "Attendance, completed lessons & revision notes",
  },
];

export function buildWhatsAppLink(whatsappIntl: string, customMessage?: string): string {
  const cleanNumber = whatsappIntl.replace(/[^\d]/g, "") || "923291982198";
  const text = encodeURIComponent(
    customMessage ||
      "Assalamu Alaikum, I would like to enquire about online Quran classes at Maarif ul Quran."
  );
  return `https://wa.me/${cleanNumber}?text=${text}`;
}
