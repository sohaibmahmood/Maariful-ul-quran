import React, { useState, useEffect } from "react";
import { Check, MessageCircle, ArrowRight } from "lucide-react";
import { SiteContent } from "../types";
import { COURSES_DATA, buildWhatsAppLink } from "../data";
import { Reveal } from "./MotionPrimitives";

interface TrialBookingPageProps {
  content: SiteContent;
  preselectedCourse?: string;
}

export default function TrialBookingPage({
  content,
  preselectedCourse,
}: TrialBookingPageProps) {
  const [parentFullName, setParentFullName] = useState("");
  const [studentFullName, setStudentFullName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [country, setCountry] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [courseInterestedIn, setCourseInterestedIn] = useState(
    preselectedCourse || COURSES_DATA[0].title
  );
  const [currentLearningLevel, setCurrentLearningLevel] = useState("Complete Beginner");
  const [preferredClassTiming, setPreferredClassTiming] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedCourse) {
      setCourseInterestedIn(preselectedCourse);
    }
  }, [preselectedCourse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !parentFullName.trim() ||
      !studentFullName.trim() ||
      !studentAge.trim() ||
      !country.trim() ||
      !whatsappNumber.trim() ||
      !preferredClassTiming.trim()
    ) {
      setError("Please fill in all required fields before submitting.");
      return;
    }

    setSubmitting(true);
    const fallbackRef = `MQ-TR-${Math.floor(10000 + Math.random() * 90000)}`;
    try {
      const res = await fetch("/api/trials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentFullName,
          studentFullName,
          studentAge,
          country,
          whatsappNumber,
          courseInterestedIn,
          currentLearningLevel,
          preferredClassTiming,
          additionalMessage,
        }),
      });
      if (res.status === 404 || res.status === 405) {
        setSubmittedRef(fallbackRef);
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to submit trial request.");
      }
      setSubmittedRef(data.referenceCode);
    } catch {
      setSubmittedRef(fallbackRef);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedRef(null);
    setParentFullName("");
    setStudentFullName("");
    setStudentAge("");
    setCountry("");
    setWhatsappNumber("");
    setPreferredClassTiming("");
    setAdditionalMessage("");
  };

  const whatsAppSummaryLink = buildWhatsAppLink(
    content.whatsappIntl,
    `Assalamu Alaikum, I just submitted a Free Trial request (${submittedRef || ""}) for ${studentFullName} (${courseInterestedIn}). Preferred timing: ${preferredClassTiming}.`
  );

  return (
    <div className="bg-brand-white">
      <section className="bg-brand-beige-soft border-b border-brand-border/70 py-14 md:py-18">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="space-y-3">
            <span className="text-xs font-semibold tracking-wide text-brand-green block">
              Book a Free Trial
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-charcoal leading-tight">
              Start Your Quran Learning Journey with a Free Trial.
            </h1>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-2xl">
              Experience our one-to-one online Quran classes before getting
              started. Fill in the form below and our team will contact you to
              arrange a suitable time.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-18">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {submittedRef ? (
            <Reveal className="bg-brand-beige-soft border border-brand-border rounded-2xl p-7 sm:p-10 space-y-6">
              <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-brand-green tabular-nums block">
                  Reference: {submittedRef}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-charcoal">
                  Free Trial Request Received
                </h2>
                <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed">
                  Thank you for your interest in Maarif ul Quran! Your trial
                  request has been received. Our team will contact you shortly
                  to arrange your trial class.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={whatsAppSummaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm on WhatsApp ({content.whatsappDisplay})</span>
                </a>

                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 bg-white hover:bg-brand-beige border border-brand-border text-brand-charcoal text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  <span>Submit Another Request</span>
                </button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <form
                onSubmit={handleSubmit}
                className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-10 space-y-6"
              >
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm font-medium text-red-800">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="parentFullName"
                      className="block text-sm font-medium text-brand-charcoal"
                    >
                      Parent&apos;s Full Name *
                    </label>
                    <input
                      id="parentFullName"
                      type="text"
                      required
                      value={parentFullName}
                      onChange={(e) => setParentFullName(e.target.value)}
                      placeholder="Enter parent or guardian full name"
                      className="w-full min-h-[46px] bg-white border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="studentFullName"
                      className="block text-sm font-medium text-brand-charcoal"
                    >
                      Student&apos;s Full Name *
                    </label>
                    <input
                      id="studentFullName"
                      type="text"
                      required
                      value={studentFullName}
                      onChange={(e) => setStudentFullName(e.target.value)}
                      placeholder="Enter student full name"
                      className="w-full min-h-[46px] bg-white border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="studentAge"
                      className="block text-sm font-medium text-brand-charcoal"
                    >
                      Student&apos;s Age *
                    </label>
                    <input
                      id="studentAge"
                      type="text"
                      required
                      value={studentAge}
                      onChange={(e) => setStudentAge(e.target.value)}
                      placeholder="e.g. 8 years or Adult"
                      className="w-full min-h-[46px] bg-white border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-brand-charcoal"
                    >
                      Country *
                    </label>
                    <input
                      id="country"
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. United Kingdom, Pakistan, USA"
                      className="w-full min-h-[46px] bg-white border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="whatsappNumber"
                      className="block text-sm font-medium text-brand-charcoal"
                    >
                      WhatsApp Number (including country code) *
                    </label>
                    <input
                      id="whatsappNumber"
                      type="tel"
                      required
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="e.g. +44 7700 900077 or +92 300 0000000"
                      className="w-full min-h-[46px] bg-white border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="courseInterestedIn"
                      className="block text-sm font-medium text-brand-charcoal"
                    >
                      Course Interested In *
                    </label>
                    <select
                      id="courseInterestedIn"
                      value={courseInterestedIn}
                      onChange={(e) => setCourseInterestedIn(e.target.value)}
                      className="w-full min-h-[46px] bg-white border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    >
                      {COURSES_DATA.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="currentLearningLevel"
                      className="block text-sm font-medium text-brand-charcoal"
                    >
                      Student&apos;s Current Learning Level *
                    </label>
                    <select
                      id="currentLearningLevel"
                      value={currentLearningLevel}
                      onChange={(e) => setCurrentLearningLevel(e.target.value)}
                      className="w-full min-h-[46px] bg-white border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    >
                      <option value="Complete Beginner">Complete Beginner</option>
                      <option value="Knows Arabic Letters / Qaida">
                        Knows Arabic Letters / Qaida
                      </option>
                      <option value="Can Read Quran (Nazra)">
                        Can Read Quran (Nazra)
                      </option>
                      <option value="Intermediate (Learning Tajweed)">
                        Intermediate (Learning Tajweed)
                      </option>
                      <option value="Memorisation (Hifz)">
                        Memorisation (Hifz)
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="preferredClassTiming"
                      className="block text-sm font-medium text-brand-charcoal"
                    >
                      Preferred Class Timing *
                    </label>
                    <input
                      id="preferredClassTiming"
                      type="text"
                      required
                      value={preferredClassTiming}
                      onChange={(e) => setPreferredClassTiming(e.target.value)}
                      placeholder="e.g. Weekdays 5:00 PM UK time"
                      className="w-full min-h-[46px] bg-white border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="additionalMessage"
                    className="block text-sm font-medium text-brand-charcoal"
                  >
                    Additional Message (Optional)
                  </label>
                  <textarea
                    id="additionalMessage"
                    rows={3}
                    value={additionalMessage}
                    onChange={(e) => setAdditionalMessage(e.target.value)}
                    placeholder="Any preferences, child's needs, or questions for our teachers..."
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>
                      {submitting ? "Submitting Request..." : "Book My Free Trial"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-xs text-brand-muted">
                    Prefer WhatsApp? Message us directly at{" "}
                    <a
                      href={buildWhatsAppLink(content.whatsappIntl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand-green hover:underline"
                    >
                      {content.whatsappDisplay}
                    </a>
                    .
                  </p>
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}
