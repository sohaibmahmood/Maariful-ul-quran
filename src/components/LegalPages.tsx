import React from "react";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { PageId, SiteContent } from "../types";
import { buildWhatsAppLink } from "../data";
import { Reveal } from "./MotionPrimitives";

interface LegalPageProps {
  mode: "privacy" | "terms";
  content: SiteContent;
  onNavigate: (page: PageId) => void;
}

export default function LegalPages({ mode, content, onNavigate }: LegalPageProps) {
  const isPrivacy = mode === "privacy";

  return (
    <div className="bg-brand-white py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Reveal className="space-y-4">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:text-brand-green-dark cursor-pointer min-h-[40px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-charcoal">
            {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
          </h1>
          <p className="text-sm text-brand-muted">
            {content.academyName} · {content.email} · WhatsApp{" "}
            {content.whatsappDisplay}
          </p>
        </Reveal>

        {isPrivacy ? (
          <div className="space-y-8 text-sm sm:text-base text-brand-muted leading-relaxed">
            <section className="space-y-2.5 bg-brand-beige-soft border border-brand-border rounded-2xl p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-brand-charcoal">
                1. Information We Collect
              </h2>
              <p>
                When you book a free trial class or submit an enquiry at{" "}
                {content.academyName}, we collect only the details necessary to
                arrange classes and communicate with you: parent/guardian name,
                student name and age, country, WhatsApp number, email address
                (when provided), preferred class timings, and learning level.
              </p>
            </section>

            <section className="space-y-2.5 bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-brand-charcoal">
                2. How We Use Your Information
              </h2>
              <p>
                We use your contact details solely to schedule your one-to-one
                online Quran trial, assign a suitable teacher, provide regular
                parent progress updates, and answer your enquiries. We never
                sell, rent, or share student or family contact details with
                third-party marketers.
              </p>
            </section>

            <section className="space-y-2.5 bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-brand-charcoal">
                3. Child Safety &amp; Parent Reviews
              </h2>
              <p>
                Parent reviews are published only with explicit consent and
                display only the parent&apos;s first name and optional course
                name. For questions or to request removal of any submitted data,
                contact us at {content.email} or WhatsApp{" "}
                {content.whatsappDisplay}.
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-8 text-sm sm:text-base text-brand-muted leading-relaxed">
            <section className="space-y-2.5 bg-brand-beige-soft border border-brand-border rounded-2xl p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-brand-charcoal">
                1. Educational Purpose &amp; Mutual Respect
              </h2>
              <p>
                {content.academyName} provides personalised one-to-one online
                Quran and Islamic learning classes for children and adults. Both
                teachers and students/parents uphold respectful, patient, and
                courteous communication at all times.
              </p>
            </section>

            <section className="space-y-2.5 bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-brand-charcoal">
                2. Class Scheduling &amp; Attendance
              </h2>
              <p>
                Class timings are arranged flexibly according to each
                family&apos;s availability. If a student needs to reschedule or
                cancel a session, parents are requested to inform the academy in
                advance via WhatsApp ({content.whatsappDisplay}) so teachers can
                adjust accordingly.
              </p>
            </section>

            <section className="space-y-2.5 bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-brand-charcoal">
                3. Fee Arrangements
              </h2>
              <p>
                We strive to keep Quran education affordable and accessible for
                every family. Any fee arrangement discussed with parents via
                WhatsApp supports teachers&apos; dedicated time and class
                resources.
              </p>
            </section>
          </div>
        )}

        <div className="bg-brand-beige border border-brand-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-brand-charcoal font-medium">
            Have a question about our policies?
          </p>
          <a
            href={buildWhatsAppLink(content.whatsappIntl)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Message on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
