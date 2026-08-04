import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/Contact";
import { Process } from "@/components/site/Process";
import { PageIntro } from "@/components/site/PageIntro";

const title = "Contact & Consultation | Royal Robert Digital Solutions";
const description =
  "Book a one-on-one consultation. WhatsApp +254 710 837 083 or call +254 792 645 485 — send a detailed project inquiry and get a custom quote.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Start with a one-on-one conversation"
        body="Use WhatsApp for the fastest reply, call the secondary line, or send a structured inquiry with your requirements."
      />
      <Contact />
      <Process />
    </>
  );
}
