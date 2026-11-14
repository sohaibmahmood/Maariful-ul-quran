import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { PageId, SiteContent, TestimonialItem } from "./types";
import { DEFAULT_SITE_CONTENT } from "./data";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import CoursesPage from "./components/CoursesPage";
import AboutPage from "./components/AboutPage";
import TrialBookingPage from "./components/TrialBookingPage";
import ContactPage from "./components/ContactPage";
import LegalPages from "./components/LegalPages";
import AdminPage from "./components/AdminPage";

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [preselectedCourse, setPreselectedCourse] = useState<string | undefined>(
    undefined
  );
  const [siteContent, setSiteContent] = useState<SiteContent>(
    DEFAULT_SITE_CONTENT
  );
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  const loadSiteData = useCallback(async () => {
    try {
      const res = await fetch("/api/site");
      if (!res.ok) return;
      const data = await res.json();
      if (data.content) setSiteContent(data.content);
      if (Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
    } catch {
      // Fallback safely to DEFAULT_SITE_CONTENT
    }
  }, []);

  useEffect(() => {
    loadSiteData();
  }, [loadSiteData]);

  const handleNavigate = (page: PageId, courseTitle?: string) => {
    setPreselectedCourse(courseTitle);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-brand-white text-brand-charcoal font-sans selection:bg-brand-green selection:text-white">
        <Navbar
          activePage={activePage}
          onNavigate={(page) => handleNavigate(page)}
          content={siteContent}
        />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {activePage === "home" && (
                <HomePage
                  content={siteContent}
                  testimonials={testimonials}
                  onNavigate={handleNavigate}
                />
              )}

              {activePage === "courses" && (
                <CoursesPage
                  content={siteContent}
                  onNavigate={handleNavigate}
                />
              )}

              {activePage === "about" && (
                <AboutPage
                  content={siteContent}
                  onNavigate={(page) => handleNavigate(page)}
                />
              )}

              {activePage === "trial" && (
                <TrialBookingPage
                  content={siteContent}
                  preselectedCourse={preselectedCourse}
                />
              )}

              {activePage === "contact" && (
                <ContactPage content={siteContent} />
              )}

              {activePage === "privacy" && (
                <LegalPages
                  mode="privacy"
                  content={siteContent}
                  onNavigate={(page) => handleNavigate(page)}
                />
              )}

              {activePage === "terms" && (
                <LegalPages
                  mode="terms"
                  content={siteContent}
                  onNavigate={(page) => handleNavigate(page)}
                />
              )}

              {activePage === "admin" && (
                <AdminPage onSiteUpdated={loadSiteData} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer
          onNavigate={(page) => handleNavigate(page)}
          content={siteContent}
        />
      </div>
    </MotionConfig>
  );
}
