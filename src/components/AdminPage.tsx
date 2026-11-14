import React, { useState, useEffect, useCallback } from "react";
import {
  Check,
  Eye,
  EyeOff,
  Lock,
  Plus,
  Save,
  Trash2,
  LogOut,
} from "lucide-react";
import {
  EnquirySubmission,
  SiteContent,
  TestimonialItem,
  TrialSubmission,
} from "../types";
import { COURSES_DATA } from "../data";

interface AdminPageProps {
  onSiteUpdated: () => void;
}

export default function AdminPage({ onSiteUpdated }: AdminPageProps) {
  const [passcode, setPasscode] = useState("");
  const [token, setToken] = useState<string>(() => {
    try {
      return sessionStorage.getItem("maarif_admin_token") || "";
    } catch {
      return "";
    }
  });
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "trials" | "enquiries" | "testimonials" | "content"
  >("trials");

  const [trials, setTrials] = useState<TrialSubmission[]>([]);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [contentForm, setContentForm] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // New testimonial form
  const [newParentName, setNewParentName] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newReview, setNewReview] = useState("");

  const fetchDashboard = useCallback(async (adminToken: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard", {
        headers: { "x-admin-token": adminToken },
      });
      if (res.status === 401) {
        setToken("");
        try {
          sessionStorage.removeItem("maarif_admin_token");
        } catch {}
        return;
      }
      const data = await res.json();
      setTrials(data.trials || []);
      setEnquiries(data.enquiries || []);
      setTestimonials(data.testimonials || []);
      setContentForm(data.content || null);
    } catch {
      setAuthError("Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchDashboard(token);
    }
  }, [token, fetchDashboard]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (!res.ok) {
        setAuthError("Incorrect admin passcode.");
        return;
      }
      setToken(passcode);
      try {
        sessionStorage.setItem("maarif_admin_token", passcode);
      } catch {}
      setPasscode("");
    } catch {
      setAuthError("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    setToken("");
    try {
      sessionStorage.removeItem("maarif_admin_token");
    } catch {}
  };

  const notify = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 3500);
  };

  const updateTrialStatus = async (
    id: string,
    status: "pending" | "scheduled" | "completed"
  ) => {
    await fetch(`/api/admin/trials/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ status }),
    });
    fetchDashboard(token);
    notify("Trial status updated.");
  };

  const updateEnquiryStatus = async (id: string, status: "new" | "replied") => {
    await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ status }),
    });
    fetchDashboard(token);
    notify("Enquiry status updated.");
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newParentName.trim() || !newReview.trim()) return;
    await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({
        parentFirstName: newParentName,
        studentCourse: newCourse,
        review: newReview,
        published: true,
      }),
    });
    setNewParentName("");
    setNewCourse("");
    setNewReview("");
    fetchDashboard(token);
    onSiteUpdated();
    notify("Parent testimonial published.");
  };

  const toggleTestimonialPublished = async (item: TestimonialItem) => {
    await fetch(`/api/admin/testimonials/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ published: !item.published }),
    });
    fetchDashboard(token);
    onSiteUpdated();
    notify(item.published ? "Review hidden." : "Review published.");
  };

  const deleteTestimonial = async (id: string) => {
    await fetch(`/api/admin/testimonials/${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": token },
    });
    fetchDashboard(token);
    onSiteUpdated();
    notify("Testimonial deleted.");
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentForm) return;
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify(contentForm),
    });
    onSiteUpdated();
    notify("Website content saved and published live.");
  };

  if (!token) {
    return (
      <div className="bg-brand-beige-soft py-16 md:py-24 px-4">
        <div className="max-w-md mx-auto bg-white border border-brand-border rounded-2xl p-7 sm:p-9 space-y-6">
          <div className="w-11 h-11 rounded-xl bg-brand-green-tint text-brand-green flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h1 className="font-serif text-2xl font-semibold text-brand-charcoal">
              Academy Admin Portal
            </h1>
            <p className="text-sm text-brand-muted">
              Sign in to manage trial bookings, enquiries, parent testimonials,
              and website content.
            </p>
          </div>

          {authError && (
            <p className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
              {authError}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-brand-charcoal">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full min-h-[46px] bg-brand-surface border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <button
              type="submit"
              className="w-full min-h-[46px] bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Sign In to Admin Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <span className="text-xs font-semibold text-brand-green block">
              Maarif ul Quran Administration
            </span>
            <h1 className="font-serif text-3xl font-semibold text-brand-charcoal">
              Academy Management Panel
            </h1>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 border border-brand-border hover:bg-brand-beige-soft text-sm font-medium rounded-xl cursor-pointer self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {statusMessage && (
          <div className="p-3.5 rounded-xl bg-brand-green-tint border border-brand-green/20 text-sm font-medium text-brand-green-dark flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-brand-beige-soft border border-brand-border rounded-xl w-fit">
          {[
            { id: "trials", label: `Free Trials (${trials.length})` },
            { id: "enquiries", label: `Enquiries (${enquiries.length})` },
            {
              id: "testimonials",
              label: `Testimonials (${testimonials.length})`,
            },
            { id: "content", label: "Edit Website Content" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-brand-green text-white font-semibold"
                  : "text-brand-charcoal hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading && (
          <p className="text-sm text-brand-muted">Loading academy records...</p>
        )}

        {/* TAB 1: FREE TRIAL REQUESTS */}
        {activeTab === "trials" && (
          <div className="space-y-4">
            {trials.length === 0 ? (
              <div className="bg-brand-beige-soft border border-brand-border rounded-2xl p-8 text-center text-sm text-brand-muted">
                No free trial submissions yet. Submissions from the Book a Free
                Trial page will appear here immediately.
              </div>
            ) : (
              trials.map((t) => (
                <div
                  key={t.id}
                  className="bg-brand-surface border border-brand-border rounded-2xl p-5 sm:p-6 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs text-brand-muted flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-brand-green tabular-nums">
                        {t.referenceCode}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{new Date(t.createdAt).toLocaleString()}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-brand-charcoal capitalize">
                        Status: {t.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {(["pending", "scheduled", "completed"] as const).map(
                        (s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => updateTrialStatus(t.id, s)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer capitalize ${
                              t.status === s
                                ? "bg-brand-green text-white border-brand-green"
                                : "bg-white border-brand-border text-brand-charcoal hover:bg-brand-beige-soft"
                            }`}
                          >
                            {s}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm pt-2 border-t border-brand-border/50">
                    <div>
                      <span className="text-xs text-brand-muted block">
                        Parent / Student
                      </span>
                      <span className="font-medium text-brand-charcoal">
                        {t.parentFullName} / {t.studentFullName} (Age{" "}
                        {t.studentAge})
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-brand-muted block">
                        WhatsApp &amp; Country
                      </span>
                      <span className="font-medium text-brand-charcoal">
                        {t.whatsappNumber} ({t.country})
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-brand-muted block">
                        Course &amp; Level
                      </span>
                      <span className="font-medium text-brand-charcoal">
                        {t.courseInterestedIn} · {t.currentLearningLevel}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-brand-muted block">
                        Preferred Timing
                      </span>
                      <span className="font-medium text-brand-charcoal">
                        {t.preferredClassTiming}
                      </span>
                    </div>
                  </div>

                  {t.additionalMessage && (
                    <p className="text-sm text-brand-muted bg-white border border-brand-border/70 rounded-xl p-3">
                      {t.additionalMessage}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: GENERAL ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="space-y-4">
            {enquiries.length === 0 ? (
              <div className="bg-brand-beige-soft border border-brand-border rounded-2xl p-8 text-center text-sm text-brand-muted">
                No contact enquiries yet.
              </div>
            ) : (
              enquiries.map((eq) => (
                <div
                  key={eq.id}
                  className="bg-brand-surface border border-brand-border rounded-2xl p-5 sm:p-6 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs text-brand-muted flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-brand-green tabular-nums">
                        {eq.referenceCode}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{new Date(eq.createdAt).toLocaleString()}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-brand-charcoal capitalize">
                        Status: {eq.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {(["new", "replied"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => updateEnquiryStatus(eq.id, s)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer capitalize ${
                            eq.status === s
                              ? "bg-brand-green text-white border-brand-green"
                              : "bg-white border-brand-border text-brand-charcoal hover:bg-brand-beige-soft"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm space-y-1">
                    <p className="font-semibold text-brand-charcoal">
                      {eq.subject} — {eq.fullName}
                    </p>
                    <p className="text-xs text-brand-muted">
                      WhatsApp: {eq.whatsappNumber}
                      {eq.emailAddress ? ` · Email: ${eq.emailAddress}` : ""}
                    </p>
                    <p className="text-brand-charcoal/85 pt-2">{eq.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: TESTIMONIALS */}
        {activeTab === "testimonials" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form
              onSubmit={handleAddTestimonial}
              className="lg:col-span-5 bg-brand-beige-soft border border-brand-border rounded-2xl p-6 space-y-4 h-fit"
            >
              <h2 className="font-serif text-xl font-semibold text-brand-charcoal">
                Add Genuine Parent Review
              </h2>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-charcoal">
                  Parent&apos;s First Name (with permission) *
                </label>
                <input
                  type="text"
                  required
                  value={newParentName}
                  onChange={(e) => setNewParentName(e.target.value)}
                  placeholder="e.g. Ayesha"
                  className="w-full min-h-[44px] bg-white border border-brand-border rounded-xl px-3.5 py-2 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-charcoal">
                  Student&apos;s Course (Optional)
                </label>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="w-full min-h-[44px] bg-white border border-brand-border rounded-xl px-3.5 py-2 text-sm"
                >
                  <option value="">None / General</option>
                  {COURSES_DATA.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-charcoal">
                  Parent&apos;s Review *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Enter verified parent feedback..."
                  className="w-full bg-white border border-brand-border rounded-xl px-3.5 py-2.5 text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full px-5 py-2.5 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Review</span>
              </button>
            </form>

            <div className="lg:col-span-7 space-y-4">
              {testimonials.length === 0 ? (
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 text-center text-sm text-brand-muted">
                  No parent reviews stored yet. Add genuine parent reviews on
                  the left or approve parent-submitted reviews here.
                </div>
              ) : (
                testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="bg-brand-surface border border-brand-border rounded-2xl p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs text-brand-muted flex items-center gap-2">
                        <span className="font-semibold text-brand-charcoal">
                          {item.parentFirstName}
                        </span>
                        {item.studentCourse && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{item.studentCourse}</span>
                          </>
                        )}
                        <span aria-hidden="true">·</span>
                        <span
                          className={
                            item.published
                              ? "text-brand-green font-semibold"
                              : "text-amber-700 font-semibold"
                          }
                        >
                          {item.published ? "Published" : "Hidden (Pending)"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleTestimonialPublished(item)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white border border-brand-border rounded-lg hover:bg-brand-beige-soft cursor-pointer"
                        >
                          {item.published ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Hide</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Publish</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTestimonial(item.id)}
                          aria-label="Delete review"
                          className="p-1.5 text-red-700 bg-white border border-brand-border rounded-lg hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-brand-charcoal leading-relaxed">
                      &ldquo;{item.review}&rdquo;
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: EDIT WEBSITE CONTENT */}
        {activeTab === "content" && contentForm && (
          <form
            onSubmit={handleSaveContent}
            className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-5 max-w-4xl"
          >
            <h2 className="font-serif text-2xl font-semibold text-brand-charcoal">
              Edit Live Website Content
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-charcoal">
                  WhatsApp Display Number
                </label>
                <input
                  type="text"
                  value={contentForm.whatsappDisplay}
                  onChange={(e) =>
                    setContentForm({
                      ...contentForm,
                      whatsappDisplay: e.target.value,
                    })
                  }
                  className="w-full min-h-[44px] bg-white border border-brand-border rounded-xl px-3.5 py-2 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-charcoal">
                  Academy Email
                </label>
                <input
                  type="email"
                  value={contentForm.email}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, email: e.target.value })
                  }
                  className="w-full min-h-[44px] bg-white border border-brand-border rounded-xl px-3.5 py-2 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-brand-charcoal">
                Hero Main Heading
              </label>
              <input
                type="text"
                value={contentForm.heroHeading}
                onChange={(e) =>
                  setContentForm({
                    ...contentForm,
                    heroHeading: e.target.value,
                  })
                }
                className="w-full min-h-[44px] bg-white border border-brand-border rounded-xl px-3.5 py-2 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-brand-charcoal">
                Hero Subheading
              </label>
              <input
                type="text"
                value={contentForm.heroSubheading}
                onChange={(e) =>
                  setContentForm({
                    ...contentForm,
                    heroSubheading: e.target.value,
                  })
                }
                className="w-full min-h-[44px] bg-white border border-brand-border rounded-xl px-3.5 py-2 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-brand-charcoal">
                Hero Description
              </label>
              <textarea
                rows={3}
                value={contentForm.heroDescription}
                onChange={(e) =>
                  setContentForm({
                    ...contentForm,
                    heroDescription: e.target.value,
                  })
                }
                className="w-full bg-white border border-brand-border rounded-xl px-3.5 py-2.5 text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-charcoal">
                  Our Mission
                </label>
                <textarea
                  rows={3}
                  value={contentForm.aboutMission}
                  onChange={(e) =>
                    setContentForm({
                      ...contentForm,
                      aboutMission: e.target.value,
                    })
                  }
                  className="w-full bg-white border border-brand-border rounded-xl px-3.5 py-2.5 text-sm resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-charcoal">
                  Our Vision
                </label>
                <textarea
                  rows={3}
                  value={contentForm.aboutVision}
                  onChange={(e) =>
                    setContentForm({
                      ...contentForm,
                      aboutVision: e.target.value,
                    })
                  }
                  className="w-full bg-white border border-brand-border rounded-xl px-3.5 py-2.5 text-sm resize-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-brand-charcoal">
                Fees &amp; Our Approach Statement
              </label>
              <textarea
                rows={4}
                value={contentForm.feesApproachQuote}
                onChange={(e) =>
                  setContentForm({
                    ...contentForm,
                    feesApproachQuote: e.target.value,
                  })
                }
                className="w-full bg-white border border-brand-border rounded-xl px-3.5 py-2.5 text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 min-h-[46px] px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold rounded-xl cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes Live</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
