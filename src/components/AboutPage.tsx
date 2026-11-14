import React from "react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { PageId, SiteContent } from "../types";
import {
  ABOUT_IMAGE,
  ACADEMY_LOGO_PATH,
  TEACHING_VALUES,
  buildWhatsAppLink,
} from "../data";
import {
  ParallaxFrame,
  ResilientImage,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "./MotionPrimitives";

interface AboutPageProps {
  content: SiteContent;
  onNavigate: (page: PageId) => void;
}

export default function AboutPage({ content, onNavigate }: AboutPageProps) {
  return (
    <div className="bg-brand-white">
      {/* Page Hero */}
      <section className="bg-brand-beige-soft border-b border-brand-border/70 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <Reveal className="lg:col-span-6 space-y-5">
              <span className="text-xs font-semibold tracking-wide text-brand-green block">
                Our Story &amp; Purpose
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-charcoal leading-tight">
                {content.aboutHeading}
              </h1>
              <p className="text-lg font-medium text-brand-green-dark">
                {content.aboutSubheading}
              </p>

              <div className="space-y-4 text-sm sm:text-base text-brand-muted leading-relaxed">
                <p>
                  Maarif ul Quran is an online Quran academy dedicated to
                  helping children and adults learn the Holy Quran from the
                  comfort of their homes.
                </p>
                <p>
                  We believe that every student deserves patience, attention and
                  guidance according to their individual learning needs.
                </p>
                <p>
                  Our aim is to provide a comfortable and supportive learning
                  environment through personalised one-to-one classes, qualified
                  teachers and affordable learning opportunities.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6">
              <ParallaxFrame
                offset={24}
                className="rounded-2xl border border-brand-border aspect-[4/3] bg-brand-beige"
              >
                <ResilientImage
                  src={ABOUT_IMAGE}
                  alt="Maarif ul Quran classical study environment"
                  title="About Maarif ul Quran"
                  className="w-full h-[115%] -mt-[7%] object-cover"
                />
              </ParallaxFrame>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal className="bg-brand-beige-soft border border-brand-border rounded-2xl p-7 sm:p-9 space-y-3">
              <span className="text-xs font-semibold tracking-wide text-brand-green block">
                01. Purpose
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-charcoal">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {content.aboutMission}
              </p>
            </Reveal>

            <Reveal
              delay={0.08}
              className="bg-brand-green-tint border border-brand-green/20 rounded-2xl p-7 sm:p-9 space-y-3"
            >
              <span className="text-xs font-semibold tracking-wide text-brand-green block">
                02. Direction
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-charcoal">
                Our Vision
              </h2>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {content.aboutVision}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Teaching Values */}
      <section className="py-16 md:py-24 bg-brand-beige-soft border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl space-y-3 mb-10">
            <span className="text-xs font-semibold tracking-wide text-brand-green block">
              How We Teach
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-charcoal">
              Our Teaching Values
            </h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEACHING_VALUES.map((val, idx) => (
              <StaggerItem
                key={val}
                className="bg-white border border-brand-border rounded-xl p-5 flex items-center gap-3.5"
              >
                <span className="w-8 h-8 rounded-lg bg-brand-green-tint text-brand-green flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs text-brand-muted tabular-nums block">
                    0{idx + 1}
                  </span>
                  <span className="font-serif text-base font-semibold text-brand-charcoal">
                    {val}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Fees & Our Approach */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="bg-white border border-brand-border rounded-2xl p-7 sm:p-10 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={ACADEMY_LOGO_PATH}
                alt={content.academyName}
                referrerPolicy="no-referrer"
                className="h-14 w-14 object-contain"
              />
              <div>
                <span className="text-xs font-semibold tracking-wide text-brand-green block">
                  Fees &amp; Our Approach
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-charcoal">
                  {content.feesApproachTitle}
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-brand-muted leading-relaxed">
              <p>
                We do not consider Quran education simply a business or a way to
                make profit. The Holy Quran is Allah&apos;s Book, and our
                intention is to make its learning and teaching accessible to as
                many people as possible.
              </p>
              <p>
                We do not charge for Allah&apos;s Book itself. Any fees we
                collect are only to support our teachers&apos; valuable time,
                effort, preparation and dedication, along with the resources
                needed to provide quality individual classes.
              </p>
              <p className="font-medium text-brand-charcoal bg-brand-beige-soft border border-brand-border rounded-xl p-5">
                &ldquo;{content.feesApproachQuote}&rdquo;
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate("trial")}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Book a Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={buildWhatsAppLink(
                  content.whatsappIntl,
                  "Assalamu Alaikum, I would like to discuss suitable class and fee arrangements at Maarif ul Quran."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 bg-brand-beige hover:bg-brand-beige-dark border border-brand-border text-brand-charcoal text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-brand-green" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
