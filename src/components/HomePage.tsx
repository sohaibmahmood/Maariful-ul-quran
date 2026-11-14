import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Check,
  Clock,
  FileText,
  Send,
  ShieldCheck,
  UserCheck,
  HeartHandshake,
  CalendarClock,
} from "lucide-react";
import { PageId, SiteContent, TestimonialItem } from "../types";
import {
  ACADEMY_LOGO_PATH,
  COURSES_DATA,
  HERO_IMAGE,
  ABOUT_IMAGE,
  TEACHER_CARE_POINTS,
  TRUST_ASSURANCES,
  WHY_CHOOSE_FEATURES,
  buildWhatsAppLink,
} from "../data";
import {
  ParallaxFrame,
  ResilientImage,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "./MotionPrimitives";

interface HomePageProps {
  content: SiteContent;
  testimonials: TestimonialItem[];
  onNavigate: (page: PageId, preselectedCourse?: string) => void;
}

export default function HomePage({
  content,
  testimonials,
  onNavigate,
}: HomePageProps) {
  // Parallax tracking for Hero visual and Hadith geometric backdrop
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], [0, 56]);
  const heroImgScale = useTransform(heroScroll, [0, 1], [1.04, 1.12]);

  const hadithRef = useRef<HTMLElement>(null);
  const { scrollYProgress: hadithScroll } = useScroll({
    target: hadithRef,
    offset: ["start end", "end start"],
  });
  const latticeY = useTransform(hadithScroll, [0, 1], [-30, 30]);

  // Parent review submission modal/inline state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewCourse, setReviewCourse] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [reviewError, setReviewError] = useState("");

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError("");
    setReviewSuccess("");
    if (!reviewName.trim() || !reviewText.trim()) {
      setReviewError("Please enter your first name and your feedback.");
      return;
    }
    setReviewSubmitting(true);
    try {
      const res = await fetch("/api/testimonials/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentFirstName: reviewName,
          studentCourse: reviewCourse,
          review: reviewText,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to submit feedback.");
      setReviewSuccess(data.message);
      setReviewName("");
      setReviewCourse("");
      setReviewText("");
    } catch (err: any) {
      setReviewError(err.message || "Submission failed. Please try again.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div>
      {/* ================================================================
          SECTION 1: HERO SECTION (Asymmetric Split + Smooth Parallax)
          ================================================================ */}
      <section
        ref={heroRef}
        className="relative bg-brand-white border-b border-brand-border/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 md:pt-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3"
              >
                <img
                  src={ACADEMY_LOGO_PATH}
                  alt={content.academyName}
                  referrerPolicy="no-referrer"
                  className="h-12 w-12 object-contain mix-blend-multiply sm:hidden"
                />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-brand-green">
                  {content.tagline}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-semibold tracking-tight text-brand-charcoal leading-[1.12] text-[clamp(2.15rem,4.1vw,3.65rem)]"
              >
                {content.heroHeading}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg font-medium text-brand-green-dark leading-snug max-w-xl"
              >
                {content.heroSubheading}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-xl"
              >
                {content.heroDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
              >
                <button
                  type="button"
                  onClick={() => onNavigate("trial")}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap"
                >
                  <span>Book a Free Trial</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <a
                  href={buildWhatsAppLink(content.whatsappIntl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-brand-beige hover:bg-brand-beige-dark text-brand-charcoal border border-brand-border text-sm font-semibold rounded-xl transition-all duration-150 active:scale-[0.98] whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Contact Us on WhatsApp</span>
                </a>
              </motion.div>
            </div>

            {/* Right Parallax Image Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative min-h-[280px] sm:min-h-[380px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-brand-border bg-brand-beige"
            >
              <motion.div
                style={{ y: heroImgY, scale: heroImgScale }}
                className="w-full h-full will-change-transform"
              >
                <ResilientImage
                  src={HERO_IMAGE}
                  alt="Open Holy Quran resting on a carved wooden rehal in warm morning light"
                  title="Maarif ul Quran"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-sm border border-brand-border/80 rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-brand-green">
                    One-to-One Online Academy
                  </p>
                  <p className="text-sm font-medium text-brand-charcoal mt-0.5">
                    Structured live sessions for children &amp; adults worldwide
                  </p>
                </div>
                <div className="hidden sm:block shrink-0 bg-white rounded-lg p-1.5 border border-brand-border/60">
                  <img
                    src={ACADEMY_LOGO_PATH}
                    alt={content.academyName}
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full-width Social Proof / Verified Commitments Strip (below hero split) */}
          <StaggerGroup
            className="mt-10 md:mt-14 pt-8 border-t border-brand-border/70 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.07}
          >
            {TRUST_ASSURANCES.map((item) => (
              <StaggerItem
                key={item.label}
                className="bg-brand-beige-soft border border-brand-border/80 rounded-xl p-4 sm:p-5 space-y-1.5"
              >
                <span className="text-xs font-medium text-brand-green block">
                  {item.label}
                </span>
                <h3 className="font-serif text-base font-semibold text-brand-charcoal">
                  {item.value}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {item.detail}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ================================================================
          SECTION 2: OUR COURSES (All 6 Programmes)
          ================================================================ */}
      <section className="py-16 md:py-24 bg-brand-beige-soft border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-semibold tracking-wide text-brand-green block">
                Our Courses
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-charcoal leading-tight">
                Explore Our Quran &amp; Islamic Learning Programmes.
              </h2>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                From learning the basics of Quran reading to memorisation and
                essential Islamic knowledge, we offer learning programmes for
                children and adults at different levels.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("courses")}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-white hover:bg-brand-beige border border-brand-border text-brand-charcoal text-sm font-semibold rounded-xl transition-colors cursor-pointer self-start md:self-auto whitespace-nowrap shrink-0"
            >
              <span>Explore All 6 Courses</span>
              <ArrowRight className="w-4 h-4 text-brand-green" />
            </button>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {COURSES_DATA.map((course) => (
              <StaggerItem
                key={course.id}
                className="bg-white border border-brand-border rounded-2xl overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-brand-beige">
                    <ResilientImage
                      src={course.image}
                      alt={course.title}
                      title={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-brand-muted">
                      <span className="font-semibold text-brand-green tabular-nums">
                        {course.number}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{course.suitableLevel}</span>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-brand-charcoal">
                      {course.title}
                    </h3>

                    <p className="text-sm text-brand-muted leading-relaxed">
                      {course.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-brand-border/50 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate("trial", course.title)}
                    className="text-sm font-semibold text-brand-green hover:text-brand-green-dark inline-flex items-center gap-1.5 min-h-[40px] cursor-pointer"
                  >
                    <span>Book Free Trial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={buildWhatsAppLink(
                      content.whatsappIntl,
                      `Assalamu Alaikum, I would like to enquire about the ${course.title} course at Maarif ul Quran.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-brand-charcoal/80 hover:text-brand-green min-h-[40px] inline-flex items-center"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ================================================================
          SECTION 3: FRIENDLY & UNDERSTANDING TEACHERS
          ================================================================ */}
      <section className="py-16 md:py-24 bg-brand-white border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <Reveal className="lg:col-span-6">
              <ParallaxFrame
                offset={24}
                className="rounded-2xl border border-brand-border aspect-[4/3] bg-brand-beige"
              >
                <ResilientImage
                  src={ABOUT_IMAGE}
                  alt="Serene classical Quran study space with wooden book stand"
                  title="Patient & Caring Teaching"
                  className="w-full h-[115%] -mt-[7%] object-cover"
                />
              </ParallaxFrame>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-semibold tracking-wide text-brand-green block">
                  Friendly &amp; Understanding Teachers
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-charcoal leading-tight">
                  Teachers Who Understand and Care for Every Child.
                </h2>
                <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                  We understand that every child has a different personality and
                  learning pace. Our aim is to provide a friendly, caring and
                  encouraging learning environment where children feel
                  comfortable, respected and confident.
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {TEACHER_CARE_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-beige-soft border border-brand-border/70"
                  >
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-green-tint text-brand-green flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm text-brand-charcoal leading-snug">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-sm font-medium text-brand-green-dark bg-brand-green-tint border border-brand-green/15 rounded-xl p-4">
                Parents can feel confident that their children are guided with
                kindness, patience and genuine understanding in every lesson.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4: WHY CHOOSE MAARIF UL QURAN?
          ================================================================ */}
      <section className="py-16 md:py-24 bg-brand-beige border-b border-brand-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl space-y-3 mb-12">
            <span className="text-xs font-semibold tracking-wide text-brand-green block">
              Why Choose Maarif ul Quran
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-charcoal leading-tight">
              A Learning Experience Designed Around Every Student.
            </h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_FEATURES.map((item) => (
              <StaggerItem
                key={item.number}
                className="bg-white border border-brand-border rounded-2xl p-6 sm:p-7 space-y-3"
              >
                <span className="font-serif text-sm font-semibold text-brand-green tabular-nums block">
                  {item.number}.
                </span>
                <h3 className="font-serif text-xl font-semibold text-brand-charcoal">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {item.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ================================================================
          SECTIONS 5 & 6: FLEXIBLE TIMINGS & PARENTS' PROGRESS UPDATES
          ================================================================ */}
      <section className="py-16 md:py-24 bg-brand-white border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Section 5: Flexible Class Timings */}
            <Reveal className="bg-brand-beige-soft border border-brand-border rounded-2xl p-7 sm:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-brand-green text-white flex items-center justify-center">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold tracking-wide text-brand-green block">
                  Flexible Class Timings
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-charcoal leading-snug">
                  Your Schedule, Your Learning Time.
                </h2>
                <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                  We understand that every family has different routines and
                  responsibilities. Our flexible scheduling makes it easier for
                  children and adults to continue Quran learning alongside
                  school, work and daily activities.
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border/70 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-brand-charcoal font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-green" /> Morning,
                  Afternoon &amp; Evening Slots
                </span>
                <span aria-hidden="true">·</span>
                <span>Weekday &amp; Weekend Options</span>
              </div>
            </Reveal>

            {/* Section 6: Parents' Progress Updates */}
            <Reveal
              delay={0.08}
              className="bg-brand-green-tint border border-brand-green/20 rounded-2xl p-7 sm:p-9 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-brand-green text-white flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold tracking-wide text-brand-green block">
                  Parents&apos; Progress Updates
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-charcoal leading-snug">
                  Stay Connected with Your Child&apos;s Learning Journey.
                </h2>
                <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                  We believe parents should always be informed about their
                  children&apos;s progress. We aim to keep parents updated about
                  attendance, lesson completion, learning improvements and areas
                  that need more practice.
                </p>
              </div>

              <div className="pt-4 border-t border-brand-green/15 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-brand-charcoal font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-brand-green" /> Attendance
                  &amp; Lesson Tracking
                </span>
                <span aria-hidden="true">·</span>
                <span>Regular Revision Feedback</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 7: HADITH ABOUT QURAN LEARNING (Parallax Lattice)
          ================================================================ */}
      <section
        ref={hadithRef}
        className="relative py-20 md:py-28 bg-brand-green-dark text-white overflow-hidden"
      >
        {/* Subtle Parallax Sacred Geometric Pattern */}
        <motion.div
          style={{ y: latticeY }}
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] pointer-events-none flex items-center justify-center"
        >
          <svg
            className="w-[640px] h-[640px] text-white"
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          >
            <polygon points="100,10 124,76 190,100 124,124 100,190 76,124 10,100 76,76" />
            <rect
              x="40"
              y="40"
              width="120"
              height="120"
              transform="rotate(45 100 100)"
            />
            <circle cx="100" cy="100" r="65" />
            <circle cx="100" cy="100" r="32" />
          </svg>
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <Reveal>
            <span className="text-xs sm:text-sm font-medium tracking-wide text-brand-beige/90 block">
              The Beauty of Learning and Teaching the Quran
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-3xl sm:text-5xl md:text-6xl leading-[1.6] text-white font-bold"
            >
              خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
            </p>
          </Reveal>

          <Reveal delay={0.14} className="space-y-3">
            <blockquote className="font-serif italic text-xl sm:text-2xl text-brand-beige leading-relaxed">
              &ldquo;The best among you are those who learn the Quran and teach
              it.&rdquo;
            </blockquote>
            <p className="text-xs sm:text-sm font-medium tracking-wide text-brand-beige/80">
              Sahih al-Bukhari 5027
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          SECTION 8: TESTIMONIALS + FEES & OUR APPROACH
          ================================================================ */}
      <section className="py-16 md:py-24 bg-brand-white border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Authentic Parent Testimonials (placeholders hidden until genuine reviews exist) */}
          <div className="space-y-8">
            <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl space-y-2">
                <span className="text-xs font-semibold tracking-wide text-brand-green block">
                  Parent &amp; Family Feedback
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-charcoal">
                  What Parents Say About Maarif ul Quran.
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewForm((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 border border-brand-border hover:bg-brand-beige-soft text-brand-charcoal text-sm font-semibold rounded-xl transition-colors cursor-pointer self-start md:self-auto whitespace-nowrap shrink-0"
              >
                <HeartHandshake className="w-4 h-4 text-brand-green" />
                <span>
                  {showReviewForm ? "Close Feedback Form" : "Share Parent Review"}
                </span>
              </button>
            </Reveal>

            {/* Optional Parent Review Submission Drawer */}
            {showReviewForm && (
              <form
                onSubmit={handleSubmitReview}
                className="bg-brand-beige-soft border border-brand-border rounded-2xl p-6 sm:p-8 max-w-2xl space-y-4"
              >
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-brand-charcoal">
                    Submit a Genuine Parent Review
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted">
                    Only authentic reviews from Maarif ul Quran families are
                    published after verification.
                  </p>
                </div>

                {reviewError && (
                  <p className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                    {reviewError}
                  </p>
                )}
                {reviewSuccess && (
                  <p className="text-sm font-medium text-brand-green-dark bg-brand-green-tint border border-brand-green/20 rounded-lg px-4 py-2.5">
                    {reviewSuccess}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-brand-charcoal">
                      Parent&apos;s First Name *
                    </label>
                    <input
                      type="text"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Fatima"
                      className="w-full min-h-[44px] bg-white border border-brand-border rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-brand-charcoal">
                      Student&apos;s Course (Optional)
                    </label>
                    <select
                      value={reviewCourse}
                      onChange={(e) => setReviewCourse(e.target.value)}
                      className="w-full min-h-[44px] bg-white border border-brand-border rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    >
                      <option value="">Select course (optional)</option>
                      {COURSES_DATA.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-brand-charcoal">
                    Parent&apos;s Review *
                  </label>
                  <textarea
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your honest experience with your child's teacher and classes..."
                    className="w-full bg-white border border-brand-border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {reviewSubmitting ? "Submitting..." : "Submit for Review"}
                  </span>
                </button>
              </form>
            )}

            {/* Dynamic Genuine Reviews Grid — Hidden placeholder cards when empty */}
            {testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.slice(0, 4).map((t) => (
                  <div
                    key={t.id}
                    className="bg-brand-beige-soft border border-brand-border rounded-2xl p-6 flex flex-col justify-between space-y-5"
                  >
                    <p className="text-sm sm:text-base text-brand-charcoal leading-relaxed">
                      &ldquo;{t.review}&rdquo;
                    </p>
                    <div className="pt-4 border-t border-brand-border/70 flex items-center justify-between text-xs text-brand-muted">
                      <span className="font-semibold text-brand-charcoal">
                        {t.parentFirstName}
                      </span>
                      {t.studentCourse && <span>{t.studentCourse}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Reveal className="bg-brand-beige-soft border border-brand-border rounded-2xl p-7 sm:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-green">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Genuine Reviews Only</span>
                  </div>
                  <p className="text-sm sm:text-base text-brand-charcoal leading-relaxed">
                    We never publish fabricated testimonials. Verified reviews from
                    parents are shared here as families complete their feedback.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate("trial")}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Experience a Free Trial Class</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Reveal>
            )}
          </div>

          {/* Fees & Our Approach (Zero pricing tables, transparent intention) */}
          <Reveal className="bg-brand-beige border border-brand-border rounded-2xl p-7 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-semibold tracking-wide text-brand-green block">
                  Our Approach to Fees
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-charcoal">
                  {content.feesApproachTitle}
                </h3>
                <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed">
                  &ldquo;{content.feesApproachQuote}&rdquo;
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <a
                  href={buildWhatsAppLink(
                    content.whatsappIntl,
                    "Assalamu Alaikum, I would like to enquire about class arrangements and affordable fee options at Maarif ul Quran."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] w-full sm:w-auto px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Discuss on WhatsApp</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          SECTION 9: FINAL CALL TO ACTION
          ================================================================ */}
      <section className="py-16 md:py-24 bg-brand-beige-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Reveal className="space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-charcoal leading-tight">
              Give Your Child the Opportunity to Learn the Quran.
            </h2>
            <p className="text-sm sm:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
              Whether you are looking for Quran classes for your child or want
              to begin your own learning journey, Maarif ul Quran is here to
              guide you.
            </p>
          </Reveal>

          <Reveal
            delay={0.08}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-2"
          >
            <button
              type="button"
              onClick={() => onNavigate("trial")}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl shadow-sm transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <span>Book a Free Trial</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <a
              href={buildWhatsAppLink(content.whatsappIntl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 bg-white hover:bg-brand-beige border border-brand-border text-brand-charcoal text-sm font-semibold rounded-xl transition-all active:scale-[0.98] whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-brand-green shrink-0" />
              <span>Chat With Us on WhatsApp</span>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
