import React from "react";
import { MessageCircle, Mail } from "lucide-react";
import { PageId, SiteContent } from "../types";
import { ACADEMY_LOGO_PATH, buildWhatsAppLink } from "../data";

interface FooterProps {
  onNavigate: (page: PageId) => void;
  content: SiteContent;
}

export default function Footer({ onNavigate, content }: FooterProps) {
  return (
    <footer className="bg-brand-beige border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-xl p-2 border border-brand-border/80 shadow-sm shrink-0">
                <img
                  src={ACADEMY_LOGO_PATH}
                  alt={`${content.academyName} Official Logo`}
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold text-brand-charcoal">
                  {content.academyName}
                </h2>
                <p className="text-sm font-medium text-brand-green mt-0.5">
                  {content.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-brand-muted leading-relaxed max-w-md">
              Personalised online Quran education for children and adults, with
              qualified teachers, friendly teaching, individual attention and
              flexible class timings.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-brand-charcoal">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: "home" as PageId, label: "Home" },
                { id: "courses" as PageId, label: "Courses" },
                { id: "about" as PageId, label: "About Us" },
                { id: "trial" as PageId, label: "Book a Free Trial" },
                { id: "contact" as PageId, label: "Contact Us" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="text-brand-muted hover:text-brand-green transition-colors cursor-pointer py-0.5 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold text-brand-charcoal">
              Contact & Support
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href={buildWhatsAppLink(content.whatsappIntl)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-brand-charcoal hover:text-brand-green transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4 text-brand-green shrink-0" />
                <span>WhatsApp: {content.whatsappDisplay}</span>
              </a>

              <a
                href={`mailto:${content.email}`}
                className="flex items-center gap-2.5 text-brand-muted hover:text-brand-green transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-brand-green shrink-0" />
                <span>{content.email}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-brand-border/70 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-brand-muted">
              <button
                type="button"
                onClick={() => onNavigate("privacy")}
                className="hover:text-brand-green transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onNavigate("terms")}
                className="hover:text-brand-green transition-colors cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onNavigate("admin")}
                className="hover:text-brand-green transition-colors cursor-pointer"
              >
                Admin Portal
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-brand-border/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
          <p>Copyright &copy; {new Date().getFullYear()} {content.academyName}. All Rights Reserved.</p>
          <p>{content.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
