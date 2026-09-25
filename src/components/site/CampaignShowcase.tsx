import { Reveal } from "./Reveal";
import photography from "@/assets/campaign-photography.webp";
import realEstate from "@/assets/campaign-real-estate.webp";
import construction from "@/assets/campaign-construction.webp";
import graphics from "@/assets/campaign-graphics.webp";
import corporate from "@/assets/campaign-corporate.webp";
import socialMedia from "@/assets/campaign-social-media.webp";
import websiteDesign from "@/assets/campaign-website-design.webp";
import ecommerce from "@/assets/campaign-ecommerce.webp";
import ecommerceSetup from "@/assets/campaign-ecommerce-setup.webp";
import getStarted from "@/assets/campaign-get-started.webp";

const campaigns = [
  { title: "Website design", category: "Core service", image: websiteDesign, wide: true },
  { title: "Corporate websites", category: "Business", image: corporate },
  { title: "E-commerce development", category: "Online retail", image: ecommerce },
  { title: "Store setup & payments", category: "E-commerce", image: ecommerceSetup, wide: true },
  { title: "Real estate websites", category: "Property", image: realEstate, wide: true },
  { title: "Construction websites", category: "Industry", image: construction, wide: true },
  { title: "Photography studio websites", category: "Creative", image: photography },
  { title: "Graphic design", category: "Brand support", image: graphics },
  { title: "Social media management", category: "Digital growth", image: socialMedia },
  { title: "Launch your digital presence", category: "Consultation", image: getStarted },
];

export function CampaignShowcase() {
  return (
    <section className="border-y border-border bg-background py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="grid gap-5 border-l-8 border-gold pl-5 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <p className="eyebrow">Solutions by industry</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold uppercase sm:text-4xl">
              Built for the way your customers choose and buy
            </h2>
          </div>
          <p className="text-muted-foreground md:pb-1">
            From specialist service businesses to online stores, each solution is shaped around a
            clear market, customer journey and business objective.
          </p>
        </Reveal>

        <div className="mt-10 grid auto-rows-[22rem] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign, index) => (
            <Reveal
              key={campaign.title}
              delay={(index % 3) * 70}
              className={campaign.wide ? "lg:col-span-2" : ""}
            >
              <article className="group relative h-full overflow-hidden border border-border bg-navy-deep">
                <img
                  src={campaign.image}
                  alt={`${campaign.title} service by Royal Robert Digital Solutions`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-navy-deep/95 px-5 py-4 text-primary-foreground">
                  <h3 className="font-display text-base font-bold uppercase">{campaign.title}</h3>
                  <span className="shrink-0 text-xs font-semibold uppercase text-gold">{campaign.category}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}