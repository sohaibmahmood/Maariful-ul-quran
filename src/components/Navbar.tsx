import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, MessageCircle } from "lucide-react";
import { PageId, SiteContent } from "../types";
import { ACADEMY_LOGO_PATH, buildWhatsAppLink } from "../data";

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  content: SiteContent;
}

const NAV_ITEMS: Array<{ id: PageId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "courses", label: "Courses" },
  { id: "about", label: "About Us" },
  { id: "trial", label: "Book a Free Trial" },
  { id: "contact", label: "Contact Us" },
];

export default function Navbar({ activePage, onNavigate, content }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-white/95 backdrop-blur-md border-b border-brand-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-16 md:h-20">
          {/* Zone 1: Brand Title (single line, crisp supplied logo mark) */}
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-md py-1"
            aria-label={`${content.academyName} Home`}
          >
            <img
              src={ACADEMY_LOGO_PATH}
              alt={`${content.academyName} Logo`}
              referrerPolicy="no-referrer"
              className="h-9 w-9 md:h-11 md:w-11 object-contain mix-blend-multiply shrink-0"
            />
            <span className="font-serif text-lg md:text-xl font-semibold tracking-tight text-brand-charcoal whitespace-nowrap">
              {content.academyName}
            </span>
          </button>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded ${
                    isActive
                      ? "text-brand-green font-semibold"
                      : "text-brand-charcoal/75 hover:text-brand-green"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green rounded-full"
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + mobile drawer toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={buildWhatsAppLink(content.whatsappIntl)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp Us</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              className="lg:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-brand-charcoal hover:bg-brand-beige transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-brand-white border-b border-brand-border shadow-lg"
          >
            <div className="px-4 py-4 space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNav(item.id)}
                    className={`w-full flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-colors cursor-pointer ${
                      isActive
                        ? "bg-brand-green-tint text-brand-green font-semibold"
                        : "text-brand-charcoal hover:bg-brand-beige-soft"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="text-xs font-semibold text-brand-green">
                        Current
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 mt-2 border-t border-brand-border/60">
                <a
                  href={buildWhatsAppLink(content.whatsappIntl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 min-h-[46px] px-4 py-3 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact Us on WhatsApp ({content.whatsappDisplay})</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
