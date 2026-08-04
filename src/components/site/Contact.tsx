import { useState } from "react";
import { z } from "zod";
import { MessageCircle, Phone, Mail, Send, CheckCircle2, Info } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "./Reveal";
import {
  WHATSAPP_LINK,
  WHATSAPP_NUMBER,
  SECONDARY_NUMBER,
  SECONDARY_TEL,
  EMAIL,
  waLink,
} from "@/lib/site";

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  business: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a reachable phone number")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\s()-]+$/, "Use digits, spaces, +, - or ()"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  contactMethod: z.string().min(1, "Choose a preferred contact method"),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select an estimated budget"),
  timeline: z.string().min(1, "Select a preferred timeline"),
  description: z
    .string()
    .trim()
    .min(30, "Please describe your requirements in at least 30 characters")
    .max(2000, "Please keep the description under 2000 characters"),
});

type FormValues = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormValues, string>>;

const initial: FormValues = {
  fullName: "",
  business: "",
  phone: "",
  email: "",
  contactMethod: "WhatsApp",
  projectType: "",
  budget: "",
  timeline: "",
  description: "",
};

const projectTypes = [
  "Corporate website",
  "Portfolio website",
  "E-commerce platform",
  "Custom web application",
  "Business software",
  "Car dealership website",
  "Vehicle inventory / hire-purchase system",
  "Google Business Profile / digital visibility",
  "Not sure yet — need advice",
];

const budgets = [
  "KSh 19,999 – 45,000",
  "KSh 45,000 – 100,000",
  "KSh 100,000 – 150,000",
  "Above KSh 150,000",
  "To be advised after consultation",
];

const timelines = ["As soon as possible", "Within 2–4 weeks", "1–3 months", "Flexible / planning ahead"];

const selectClass =
  "flex h-10 w-full cursor-pointer rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function Contact() {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (key: keyof FormValues, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: Errors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormValues;
        if (!next[key]) next[key] = issue.message;
      });
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.scrollIntoView({ block: "center", behavior: "smooth" });
      first?.focus();
      return;
    }

    setSubmitting(true);
    const d = result.data;
    const message = [
      "New project inquiry — Royal Robert Digital Solutions",
      `Name: ${d.fullName}`,
      d.business ? `Business: ${d.business}` : null,
      `Phone: ${d.phone}`,
      `Email: ${d.email}`,
      `Preferred contact: ${d.contactMethod}`,
      `Project type: ${d.projectType}`,
      `Estimated budget: ${d.budget}`,
      `Preferred timeline: ${d.timeline}`,
      "",
      "Requirements:",
      d.description,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(waLink(message), "_blank", "noopener,noreferrer");
    setSubmitting(false);
    setSent(true);
    toast.success("Inquiry ready — WhatsApp opened with your details.");
  };

  return (
    <section className="py-20 lg:py-28" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Let's talk</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Book a one-on-one consultation
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell me what you need and we'll discuss it directly. No obligation, no deposit until
            scope and quotation are agreed.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <Reveal>
              <a
                href={waLink("Hello Royal Robert, I'd like to discuss a project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-whatsapp/40 bg-surface/70 p-6 lift"
              >
                <MessageCircle className="size-5 text-whatsapp" />
                <h3 className="mt-3 font-display text-base font-semibold">Chat on WhatsApp</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Primary channel — fastest replies, share files, screenshots and project details.
                </p>
                <p className="mt-3 font-display text-sm font-semibold text-gold">{WHATSAPP_NUMBER}</p>
              </a>
            </Reveal>
            <Reveal delay={90}>
              <a href={SECONDARY_TEL} className="block rounded-2xl border border-border bg-surface/70 p-6 lift">
                <Phone className="size-5 text-gold" />
                <h3 className="mt-3 font-display text-base font-semibold">Call directly</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Secondary number — voice calls, follow-ups and alternative inquiries.
                </p>
                <p className="mt-3 font-display text-sm font-semibold text-gold">{SECONDARY_NUMBER}</p>
              </a>
            </Reveal>
            <Reveal delay={180}>
              <a href={`mailto:${EMAIL}`} className="block rounded-2xl border border-border bg-surface/70 p-6 lift">
                <Mail className="size-5 text-gold" />
                <h3 className="mt-3 font-display text-base font-semibold">Email</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  For documents, formal briefs and proposals.
                </p>
                <p className="mt-3 break-all font-display text-sm font-semibold text-gold">{EMAIL}</p>
              </a>
            </Reveal>
            <Reveal delay={240}>
              <div className="rounded-2xl border border-dashed border-gold/30 bg-surface/50 p-6">
                <Info className="size-5 text-gold" />
                <h3 className="mt-3 font-display text-base font-semibold">Before you submit</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {[
                    "The type of website or software you need",
                    "Features you expect (booking, payments, accounts, inventory…)",
                    "Your business goals and target customers",
                    "Preferred timeline and launch date",
                    "An approximate budget range",
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-border bg-surface/70 p-6 sm:p-8"
            >
              <h3 className="font-display text-xl font-semibold">Send a project inquiry</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your details are formatted into a WhatsApp message so we can start the conversation
                immediately.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" required error={errors.fullName} htmlFor="fullName">
                  <Input
                    id="fullName"
                    value={values.fullName}
                    data-invalid={Boolean(errors.fullName)}
                    onChange={(e) => set("fullName", e.target.value)}
                    placeholder="Jane Wanjiru"
                    className="bg-secondary"
                  />
                </Field>
                <Field label="Business or organisation" error={errors.business} htmlFor="business">
                  <Input
                    id="business"
                    value={values.business}
                    onChange={(e) => set("business", e.target.value)}
                    placeholder="Optional"
                    className="bg-secondary"
                  />
                </Field>
                <Field label="Phone number" required error={errors.phone} htmlFor="phone">
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    value={values.phone}
                    data-invalid={Boolean(errors.phone)}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+254 7xx xxx xxx"
                    className="bg-secondary"
                  />
                </Field>
                <Field label="Email address" required error={errors.email} htmlFor="email">
                  <Input
                    id="email"
                    type="email"
                    value={values.email}
                    data-invalid={Boolean(errors.email)}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@company.co.ke"
                    className="bg-secondary"
                  />
                </Field>
                <Field
                  label="Preferred contact method"
                  required
                  error={errors.contactMethod}
                  htmlFor="contactMethod"
                >
                  <select
                    id="contactMethod"
                    className={selectClass}
                    value={values.contactMethod}
                    onChange={(e) => set("contactMethod", e.target.value)}
                  >
                    {["WhatsApp", "Phone call", "Email"].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Project type" required error={errors.projectType} htmlFor="projectType">
                  <select
                    id="projectType"
                    className={selectClass}
                    data-invalid={Boolean(errors.projectType)}
                    value={values.projectType}
                    onChange={(e) => set("projectType", e.target.value)}
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Estimated budget" required error={errors.budget} htmlFor="budget">
                  <select
                    id="budget"
                    className={selectClass}
                    data-invalid={Boolean(errors.budget)}
                    value={values.budget}
                    onChange={(e) => set("budget", e.target.value)}
                  >
                    <option value="">Select a range</option>
                    {budgets.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Preferred timeline" required error={errors.timeline} htmlFor="timeline">
                  <select
                    id="timeline"
                    className={selectClass}
                    data-invalid={Boolean(errors.timeline)}
                    value={values.timeline}
                    onChange={(e) => set("timeline", e.target.value)}
                  >
                    <option value="">Select a timeline</option>
                    {timelines.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-5">
                <Field
                  label="Describe your requirements"
                  required
                  error={errors.description}
                  htmlFor="description"
                  hint="Pages or features you need, business goals, examples you like, and anything already in place."
                >
                  <Textarea
                    id="description"
                    rows={6}
                    maxLength={2000}
                    value={values.description}
                    data-invalid={Boolean(errors.description)}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="e.g. I run a dealership in Nairobi and need a website with vehicle listings, search filters and WhatsApp enquiries. I'd also like Google Business Profile setup."
                    className="bg-secondary"
                  />
                </Field>
                <p className="mt-1 text-right text-xs text-muted-foreground">
                  {values.description.length}/2000
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button type="submit" size="lg" disabled={submitting} className="sm:flex-1">
                  {submitting ? "Preparing…" : (<><Send /> Send project inquiry</>)}
                </Button>
                <Button asChild size="lg" variant="outline" className="border-gold/40 bg-transparent">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    <MessageCircle /> Chat instead
                  </a>
                </Button>
              </div>

              {sent && (
                <p
                  role="status"
                  className="mt-4 flex items-start gap-2 rounded-xl border border-whatsapp/40 bg-whatsapp/10 p-4 text-sm text-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-whatsapp" />
                  Your inquiry is ready in WhatsApp. If the chat didn't open, tap “Chat instead” or
                  call {SECONDARY_NUMBER}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string | undefined;
  hint?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="text-sm">
        {label} {required && <span className="text-gold">*</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p className="mt-1.5 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
