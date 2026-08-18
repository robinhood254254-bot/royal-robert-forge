import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, EMAIL, WHATSAPP_NUMBER, SECONDARY_NUMBER } from "@/lib/site";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";

const title = "Privacy Policy | Royal Robert Digital Solutions";
const description =
  "Learn how Royal Robert Digital Solutions collects, uses and protects your personal information when you use our website or request our services.";
const url = `${SITE_URL}/privacy`;

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Privacy Policy"
        body="This policy explains what information we collect, how we use it, and the choices you have when you interact with Royal Robert Digital Solutions."
      />

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <p className="text-sm text-muted-foreground">
            Last updated: 17 August 2026
          </p>
        </Reveal>

        <div className="mt-10 space-y-10">
          <PolicySection title="1. Introduction">
            <p>
              Royal Robert Digital Solutions (“we”, “us”, or “our”) respects your
              privacy. This Privacy Policy describes how we collect, use, store,
              and protect personal information when you visit our website,
              request a quotation, contact us, or use any of our digital
              services.
            </p>
            <p>
              By using our website or submitting your details, you acknowledge
              that you have read and understood this policy. If you do not agree
              with it, please do not use our website or submit personal
              information to us.
            </p>
          </PolicySection>

          <PolicySection title="2. Information we collect">
            <p>We may collect the following types of information:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Contact details</strong> — your name, email address,
                phone number, business name and location, which you provide when
                you fill out a contact form, send a WhatsApp message, email us,
                or call us.
              </li>
              <li>
                <strong>Project information</strong> — details about your
                business, goals, budget, preferred features, and any documents
                or references you share so we can prepare a relevant quotation
                or proposal.
              </li>
              <li>
                <strong>Usage data</strong> — information about how you browse
                our website, such as pages visited, time spent, device type,
                browser version, and approximate location, collected through
                cookies and analytics tools.
              </li>
              <li>
                <strong>Communication records</strong> — emails, chat messages,
                call notes, and feedback that help us deliver and improve our
                services.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="3. How we use your information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Listen carefully to your business goals, challenges, and the outcomes you are willing to invest in to scale.</li>
              <li>Analyse your requirements and craft a clear, end-to-end blueprint for scaling your business from A to Z.</li>
              <li>Respond to your inquiries and provide project quotations.</li>
              <li>Deliver the websites, e-commerce platforms, web applications, and business software you request.</li>
              <li>Communicate with you one-on-one throughout the project lifecycle.</li>
              <li>Process payments and maintain business records.</li>
              <li>Improve our website, services, and customer experience.</li>
              <li>Comply with legal, tax, and regulatory obligations in Kenya.</li>
              <li>Protect our rights, property, and safety, and that of our clients.</li>
            </ul>
            <p>
              We will not sell, rent, or trade your personal information to
              third parties for marketing purposes.
            </p>
          </PolicySection>

          <PolicySection title="4. Consultation deposits & refunds">
            <p>
              Strategic business scaling information — including detailed
              blueprints, growth roadmaps, and tailored implementation plans —
              is shared only after we have agreed the scope and quotation with
              you and a deposit has been paid. This deposit is our mutual
              assurance that we are locking arms and committing to move your
              business forward together.
            </p>
            <p>
              The deposit amount and payment terms are agreed in writing before
              any strategic information is released. All deposits are processed
              through proper, traceable channels for legal and record-keeping
              purposes.
            </p>
            <p>
              If, after reviewing the blueprint or strategic information
              provided, you feel it does not make sense for your business, you
              may request a full refund of the deposit. We will honour that
              request promptly and refund one hundred percent (100%) of the
              deposit paid, no questions asked.
            </p>
          </PolicySection>

          <PolicySection title="5. Legal basis for processing">
            <p>
              We process personal information on the basis of your consent,
              the performance of a contract, our legitimate business
              interests, and compliance with applicable Kenyan laws. You may
              withdraw your consent at any time by contacting us, although
              this may affect our ability to continue providing services to
              you.
            </p>
          </PolicySection>

          <PolicySection title="5. How we share your information">
            <p>
              We keep your information confidential. We only share it when
              necessary and with trusted parties, including:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Service providers</strong> — hosting platforms, payment
                processors, analytics providers, and communication tools that
                help us operate our business. They are contractually required
                to protect your data and use it only for the agreed purpose.
              </li>
              <li>
                <strong>Legal authorities</strong> — when required by law,
                court order, or to protect our legal rights.
              </li>
              <li>
                <strong>Business successors</strong> — in the event of a merger,
                acquisition, or sale of assets, your information may be
                transferred as part of that transaction.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="6. Data security">
            <p>
              We take reasonable technical and organisational measures to protect
              your information from unauthorised access, loss, misuse, or
              alteration. This includes secure hosting, access controls, and
              encrypted communication channels where available. However, no
              internet-based service is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </PolicySection>

          <PolicySection title="7. Data retention">
            <p>
              We retain your personal information only for as long as
              necessary to fulfil the purposes described in this policy,
              maintain business records, resolve disputes, and comply with
              legal obligations. When no longer needed, we securely delete or
              anonymise the data.
            </p>
          </PolicySection>

          <PolicySection title="8. Your rights">
            <p>You have the right to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate or incomplete information.</li>
              <li>Request deletion of your personal information, where applicable.</li>
              <li>Object to or restrict certain processing activities.</li>
              <li>Withdraw consent for marketing communications.</li>
              <li>Lodge a complaint with the relevant data-protection authority in Kenya.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the
              details below.
            </p>
          </PolicySection>

          <PolicySection title="9. Cookies and analytics">
            <p>
              Our website may use cookies and similar technologies to improve
              performance, analyse traffic, and understand user behaviour. You
              can control cookies through your browser settings. Disabling
              cookies may affect some features of the website.
            </p>
          </PolicySection>

          <PolicySection title="10. Links to third-party websites">
            <p>
              Our website may contain links to external sites. We are not
              responsible for the privacy practices or content of those sites.
              We encourage you to read their privacy policies before submitting
              any personal information.
            </p>
          </PolicySection>

          <PolicySection title="11. Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time. The updated
              version will be posted on this page with a revised “Last updated”
              date. Continued use of our website or services after changes
              constitutes acceptance of the updated policy.
            </p>
          </PolicySection>

          <PolicySection title="12. Contact us">
            <p>
              If you have any questions, concerns, or requests about this
              Privacy Policy or how we handle your information, please contact
              us directly:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Email:{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {EMAIL}
                </a>
              </li>
              <li>WhatsApp: {WHATSAPP_NUMBER}</li>
              <li>Phone: {SECONDARY_NUMBER}</li>
              <li>Business location: Nairobi, Kenya</li>
            </ul>
          </PolicySection>
        </div>
      </section>
    </>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="space-y-4 text-foreground/90">
        <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        <div className="space-y-3 leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </Reveal>
  );
}
