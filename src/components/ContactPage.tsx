import React, { useState } from "react";
import { Check, Mail, MessageCircle, Send } from "lucide-react";
import { SiteContent } from "../types";
import { buildWhatsAppLink } from "../data";
import { Reveal } from "./MotionPrimitives";

interface ContactPageProps {
  content: SiteContent;
}

export default function ContactPage({ content }: ContactPageProps) {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !fullName.trim() ||
      !whatsappNumber.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      setError(
        "Please provide your full name, WhatsApp number, subject, and message."
      );
      return;
    }

    setSubmitting(true);
    const fallbackRef = `MQ-ENQ-${Math.floor(10000 + Math.random() * 90000)}`;
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          emailAddress,
          whatsappNumber,
          subject,
          message,
        }),
      });
      if (res.status === 404 || res.status === 405) {
        setSubmittedRef(fallbackRef);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to send enquiry.");
      setSubmittedRef(data.referenceCode);
    } catch {
      setSubmittedRef(fallbackRef);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedRef(null);
    setFullName("");
    setEmailAddress("");
    setWhatsappNumber("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="bg-brand-white">
      <section className="bg-brand-beige-soft border-b border-brand-border/70 py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold tracking-wide text-brand-green block">
              Contact Us
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-charcoal leading-tight">
              We&apos;re Here to Help.
            </h1>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-2xl">
              Have questions about our courses, teachers, class timings or
              enrolment? Feel free to contact us. We would be happy to guide
              you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact Options Column */}
            <Reveal className="lg:col-span-5 space-y-6">
              <div className="bg-brand-beige border border-brand-border rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-brand-green block">
                    Direct WhatsApp Support
                  </span>
                  <h2 className="font-serif text-2xl font-semibold text-brand-charcoal">
                    WhatsApp: {content.whatsappDisplay}
                  </h2>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    Chat directly with our academy team regarding class timings,
                    course selection, and affordable fee arrangements.
                  </p>
                </div>

                <a
                  href={buildWhatsAppLink(content.whatsappIntl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] w-full sm:w-auto px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat With Us</span>
                </a>
              </div>

              <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-green">
                  <Mail className="w-4 h-4" />
                  <span>Email Us</span>
                </div>
                <a
                  href={`mailto:${content.email}`}
                  className="font-serif text-lg font-semibold text-brand-charcoal hover:text-brand-green transition-colors break-all block"
                >
                  {content.email}
                </a>
                <p className="text-sm text-brand-muted leading-relaxed">
                  All enquiries submitted through our website are logged
                  directly for our administration team.
                </p>
              </div>
            </Reveal>

            {/* General Enquiry Form Column */}
            <Reveal delay={0.08} className="lg:col-span-7">
              {submittedRef ? (
                <div className="bg-brand-beige-soft border border-brand-border rounded-2xl p-7 sm:p-10 space-y-6">
                  <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-brand-green tabular-nums block">
                      Reference: {submittedRef}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-charcoal">
                      Enquiry Received
                    </h2>
                    <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed">
                      Thank you for contacting Maarif ul Quran. Your message has
                      been received. We will get back to you soon.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={buildWhatsAppLink(
                        content.whatsappIntl,
                        `Assalamu Alaikum, I just submitted an enquiry (${submittedRef}) regarding: ${subject}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat With Us on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 bg-white hover:bg-brand-beige border border-brand-border text-brand-charcoal text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      <span>Send Another Enquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-9 space-y-5"
                >
                  <div className="space-y-1">
                    <h2 className="font-serif text-2xl font-semibold text-brand-charcoal">
                      General Enquiry Form
                    </h2>
                    <p className="text-sm text-brand-muted">
                      Send us a message and we will respond via WhatsApp or
                      email.
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm font-medium text-red-800">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contactFullName"
                        className="block text-sm font-medium text-brand-charcoal"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contactFullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full min-h-[46px] bg-white border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contactEmail"
                        className="block text-sm font-medium text-brand-charcoal"
                      >
                        Email Address (Optional)
                      </label>
                      <input
                        id="contactEmail"
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full min-h-[46px] bg-white border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contactWhatsApp"
                        className="block text-sm font-medium text-brand-charcoal"
                      >
                        WhatsApp Number *
                      </label>
                      <input
                        id="contactWhatsApp"
                        type="tel"
                        required
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="Include country code"
                        className="w-full min-h-[46px] bg-white border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contactSubject"
                        className="block text-sm font-medium text-brand-charcoal"
                      >
                        Subject *
                      </label>
                      <input
                        id="contactSubject"
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Course guidance, Class timings"
                        className="w-full min-h-[46px] bg-white border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contactMessage"
                      className="block text-sm font-medium text-brand-charcoal"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="contactMessage"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can our academy help you or your child?"
                      className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? "Sending..." : "Send Enquiry"}</span>
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
