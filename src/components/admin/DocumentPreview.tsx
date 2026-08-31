import markSrc from "@/assets/royal-robert-mark.png";
import { AUTHORIZED_BY, ISSUER, buildDocumentModel, type DocData } from "@/lib/documents";

export function DocumentPreview({ data }: { data: DocData }) {
  const model = buildDocumentModel(data);

  return (
    <div className="mx-auto w-full max-w-[794px] overflow-hidden rounded-xl border border-border bg-white shadow-lg">
      {/* Letterhead */}
      <div className="relative h-[150px] overflow-hidden">
        <svg viewBox="0 0 595 190" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M0,118 C178,188 297,106 595,186 L595,0 L0,0 Z" fill="#3f4650" />
          <path d="M0,96 C178,166 297,82 595,162 L595,0 L0,0 Z" fill="#122a47" />
          <path d="M0,78 C178,148 297,60 595,140 L595,0 L0,0 Z" fill="#176996" />
          <path d="M0,0 L150,0 C238,52 240,132 152,190 L0,190 Z" fill="#ffffff" />
        </svg>
        <div className="absolute left-[62px] top-[14px] w-[76px] text-center">
          <img src={markSrc} alt="" className="mx-auto h-[62px] w-[62px]" />
          <div className="mt-0.5 text-[9px] font-bold leading-tight text-[#122a47]">ROYAL ROBERT</div>
          <div className="text-[6px] tracking-[0.14em] text-[#5f6a7a]">DIGITAL SOLUTIONS</div>
        </div>
        <div className="absolute right-8 top-6 text-right text-white">
          <p className="text-[11px] font-bold">www.royalrobert.co.ke</p>
          <p className="text-[11px] font-bold">info@royalrobert.co.ke</p>
          <p className="mt-1 text-[10px]">+254 710 837 083</p>
          <p className="text-[10px]">+254 792 645 485</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-12 pb-10 pt-2 text-[#122a47]">
        <h2 className="text-[18px] font-bold tracking-tight">{model.title}</h2>
        <div className="mt-1 h-[3px] w-16 bg-[#176996]" />

        <div className="mt-5 flex justify-between text-[11px] text-[#5f6a7a]">
          <span>Document No: {model.docNumber}</span>
          <span>Date: {model.date}</span>
        </div>
        <p className="mt-3 text-[12px]">To: {model.to}</p>
        <p className="mt-3 text-[13px] font-bold">{model.re}</p>

        <div className="mt-5 space-y-4 text-[12px] leading-relaxed">
          {model.sections.map((section, i) => (
            <div key={i} className="space-y-2">
              {section.heading ? (
                <h3 className="text-[11px] font-bold uppercase tracking-wide text-[#176996]">
                  {section.heading}
                </h3>
              ) : null}
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="list-disc space-y-1 pl-5 marker:text-[#176996]">
                  {section.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {section.rows?.length ? (
                <div className="overflow-hidden rounded-md border border-[#e3e9f0]">
                  {section.rows.map(([label, value], j) => (
                    <div
                      key={j}
                      className={`flex items-center justify-between px-3 py-2 ${j % 2 === 0 ? "bg-[#eff3f8]" : "bg-white"}`}
                    >
                      <span className="text-[#5f6a7a]">{label}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-[#dfe6ee] pt-5 text-[11px]">
          <p className="text-[#5f6a7a]">Issued by:</p>
          <p className="font-bold">{ISSUER}</p>
          <p className="mt-2 text-[#5f6a7a]">Authorized by:</p>
          <p className="font-bold">{AUTHORIZED_BY}</p>

          <div className={`mt-10 grid gap-8 ${model.signatures === "both" ? "grid-cols-2" : "grid-cols-1"}`}>
            <div>
              <div className="h-px bg-[#122a47]" />
              <p className="mt-1 text-[#5f6a7a]">Signature — Royal Robert Digital Solutions</p>
              <p className="text-[#5f6a7a]">Date: ______________</p>
            </div>
            {model.signatures === "both" ? (
              <div>
                <div className="h-px bg-[#122a47]" />
                <p className="mt-1 text-[#5f6a7a]">Signature — {data.client_name || "Client"}</p>
                <p className="text-[#5f6a7a]">Date: ______________</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="relative h-[70px] overflow-hidden">
        <svg viewBox="0 0 595 86" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M0,52 C190,-8 309,78 595,0 L595,86 L0,86 Z" fill="#3f4650" />
          <path d="M0,64 C190,4 309,90 595,18 L595,86 L0,86 Z" fill="#122a47" />
          <path d="M0,76 C190,16 309,102 595,38 L595,86 L0,86 Z" fill="#176996" />
        </svg>
      </div>
    </div>
  );
}
