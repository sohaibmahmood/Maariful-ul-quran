import React, { useState } from "react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { PageId, SiteContent } from "../types";
import { COURSES_DATA, buildWhatsAppLink } from "../data";
import {
  ResilientImage,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "./MotionPrimitives";

interface CoursesPageProps {
  content: SiteContent;
  onNavigate: (page: PageId, preselectedCourse?: string) => void;
}

export default function CoursesPage({ content, onNavigate }: CoursesPageProps) {
  const [audienceFilter, setAudienceFilter] = useState<
    "all" | "children" | "adults"
  >("all");

  const filteredCourses = COURSES_DATA.filter((course) => {
    if (audienceFilter === "all") return true;
    return course.audienceTag === audienceFilter || course.audienceTag === "all";
  });

  return (
    <div className="bg-brand-white">
      {/* Page Header */}
      <section className="bg-brand-beige-soft border-b border-brand-border/70 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold tracking-wide text-brand-green block">
              Quran &amp; Islamic Studies
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-charcoal leading-tight">
              Our Quran &amp; Islamic Learning Programmes.
            </h1>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-2xl">
              Explore our personalised online learning programmes designed for
              children and adults at different learning levels.
            </p>
          </Reveal>

          {/* Interactive Filter Tabs */}
          <div className="mt-8 inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-brand-border rounded-xl">
            {[
              { id: "all", label: "All Programmes (6)" },
              { id: "children", label: "For Children & Beginners" },
              { id: "adults", label: "For Adults & Youth" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAudienceFilter(tab.id as any)}
                className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  audienceFilter === tab.id
                    ? "bg-brand-green text-white font-semibold"
                    : "text-brand-charcoal/75 hover:text-brand-charcoal hover:bg-brand-beige-soft"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses List */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCourses.map((course) => (
              <StaggerItem
                key={course.id}
                className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-brand-beige">
                    <ResilientImage
                      src={course.image}
                      alt={course.title}
                      title={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-brand-muted">
                      <span className="font-semibold text-brand-green tabular-nums">
                        Programme {course.number}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{course.suitableLevel}</span>
                    </div>

                    <h2 className="font-serif text-2xl font-semibold text-brand-charcoal">
                      {course.title}
                    </h2>

                    <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                      {course.shortDesc}
                    </p>

                    <ul className="space-y-2 pt-2">
                      {course.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-charcoal/85"
                        >
                          <Check className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-brand-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <a
                    href={buildWhatsAppLink(
                      content.whatsappIntl,
                      `Assalamu Alaikum, I would like to enquire about ${course.title} at Maarif ul Quran.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Enquire Now</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onNavigate("trial", course.title)}
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 border border-brand-border hover:bg-brand-beige text-brand-charcoal text-sm font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Book Free Trial</span>
                    <ArrowRight className="w-4 h-4 text-brand-green" />
                  </button>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Closing Section */}
          <Reveal className="mt-16 bg-brand-beige border border-brand-border rounded-2xl p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-charcoal">
                Not Sure Which Course Is Right for You?
              </h2>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                Contact us on WhatsApp and we will help you find a suitable
                learning programme.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href={buildWhatsAppLink(
                  content.whatsappIntl,
                  "Assalamu Alaikum, could you please guide me on which Quran course is right for us?"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Us on WhatsApp</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
