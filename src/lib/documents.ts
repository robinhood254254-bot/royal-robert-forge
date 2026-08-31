export type DocType =
  | "contract"
  | "deposit_request"
  | "deposit_ack"
  | "payment_request"
  | "final_payment_request"
  | "final_ack";

export const DOC_TYPES: {
  value: DocType;
  label: string;
  title: string;
  prefix: string;
  needsSignature: "both" | "issuer";
}[] = [
  {
    value: "contract",
    label: "Contract / Project Agreement",
    title: "PROJECT AGREEMENT",
    prefix: "AGR",
    needsSignature: "both",
  },
  {
    value: "deposit_request",
    label: "Deposit / Payment Request",
    title: "DEPOSIT REQUEST",
    prefix: "DEP",
    needsSignature: "issuer",
  },
  {
    value: "deposit_ack",
    label: "Deposit / Payment Acknowledgement",
    title: "DEPOSIT ACKNOWLEDGEMENT",
    prefix: "DAK",
    needsSignature: "issuer",
  },
  {
    value: "payment_request",
    label: "Payment Request",
    title: "PAYMENT REQUEST",
    prefix: "PRQ",
    needsSignature: "issuer",
  },
  {
    value: "final_payment_request",
    label: "Final Payment Request",
    title: "FINAL PAYMENT REQUEST",
    prefix: "FPR",
    needsSignature: "issuer",
  },
  {
    value: "final_ack",
    label: "Final Payment / Completion Acknowledgement",
    title: "FINAL PAYMENT & COMPLETION ACKNOWLEDGEMENT",
    prefix: "FAK",
    needsSignature: "issuer",
  },
];

export function docTypeMeta(t: DocType) {
  return (DOC_TYPES.find((d) => d.value === t) ?? DOC_TYPES[0])!;
}

export interface Payment {
  date: string;
  amount: number;
  method: string;
  reference: string;
  note: string;
}

export interface DocData {
  id?: string;
  doc_type: DocType;
  doc_number: string;
  client_id?: string | null;
  client_name: string;
  contact_person: string;
  phone: string;
  email: string;
  service_name: string;
  project_description: string;
  total_cost: number;
  amount: number;
  payments: Payment[];
  payment_method: string;
  reference: string;
  doc_date: string;
  due_date: string;
  delivery_date: string;
  payment_schedule: string;
  terms: string;
  expectations: string;
  notes: string;
  status?: string;
  created_at?: string;
}

export const TILL_NUMBER = "3321749";
export const TILL_NAME = "Robert Gichangi Wambui";
export const ISSUER = "ROYAL ROBERT DIGITAL SOLUTIONS";
export const AUTHORIZED_BY = "Robert Wambui";

export function emptyDoc(type: DocType = "contract"): DocData {
  return {
    doc_type: type,
    doc_number: newDocNumber(type),
    client_name: "",
    contact_person: "",
    phone: "",
    email: "",
    service_name: "",
    project_description: "",
    total_cost: 0,
    amount: 0,
    payments: [],
    payment_method: "M-PESA Buy Goods Till",
    reference: "",
    doc_date: new Date().toISOString().slice(0, 10),
    due_date: "",
    delivery_date: "",
    payment_schedule: "",
    terms: "",
    expectations: "",
    notes: "",
    status: "draft",
  };
}

export function newDocNumber(type: DocType) {
  const meta = docTypeMeta(type);
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate(),
  ).padStart(2, "0")}`;
  const rand = String(Math.floor(Math.random() * 900) + 100);
  return `RRDS/${meta.prefix}/${stamp}/${rand}`;
}

export function formatKsh(n: number) {
  const v = Number.isFinite(n) ? n : 0;
  return `KSh ${v.toLocaleString("en-KE", { maximumFractionDigits: 2 })}`;
}

export function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function computeTotals(d: DocData) {
  const recorded = (d.payments ?? []).reduce((s, p) => s + (Number(p.amount) || 0), 0);
  const isAck = d.doc_type === "deposit_ack" || d.doc_type === "final_ack";
  const paid = isAck ? recorded : recorded;
  const balance = Math.max(0, (Number(d.total_cost) || 0) - paid);
  return { paid, balance, total: Number(d.total_cost) || 0 };
}

export interface DocSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  rows?: [string, string][];
}

export interface DocModel {
  title: string;
  docNumber: string;
  date: string;
  to: string;
  re: string;
  sections: DocSection[];
  signatures: "both" | "issuer";
}

function clientLine(d: DocData) {
  const person = d.contact_person?.trim();
  const org = d.client_name?.trim();
  if (person && org) return `${person} — ${org}`;
  return person || org || "—";
}

export function buildDocumentModel(d: DocData): DocModel {
  const meta = docTypeMeta(d.doc_type);
  const { paid, balance, total } = computeTotals(d);
  const service = d.service_name?.trim() || "the agreed project";
  const sections: DocSection[] = [];

  const paymentBullets = (d.payments ?? [])
    .filter((p) => Number(p.amount) > 0)
    .map(
      (p) =>
        `${formatKsh(Number(p.amount))} received on ${formatDate(p.date)}${
          p.method ? ` via ${p.method}` : ""
        }${p.reference ? ` (Transaction Code: ${p.reference})` : ""}${
          p.note ? ` — ${p.note}` : ""
        }.`,
    );

  const financialRows: [string, string][] = [
    ["Total Project Cost", formatKsh(total)],
    ["Total Amount Received", formatKsh(paid)],
    ["Outstanding Balance", formatKsh(balance)],
  ];

  const instructions = [
    "Open the M-PESA menu on your phone and select Lipa na M-PESA.",
    "Select Buy Goods and Services.",
    `Enter Till Number ${TILL_NUMBER} (${TILL_NAME}).`,
    "Enter the amount shown above and complete the payment with your M-PESA PIN.",
    "Share the M-PESA confirmation message so the payment can be verified and receipted.",
  ];

  if (d.doc_type === "contract") {
    sections.push({
      paragraphs: [
        `This Agreement is entered into between ${ISSUER} ("the Service Provider") and ${
          d.client_name || "the Client"
        } ("the Client") for the delivery of ${service}.`,
      ],
    });
    sections.push({
      heading: "1. Client details",
      rows: [
        ["Client / Organization", d.client_name || "—"],
        ["Contact Person", d.contact_person || "—"],
        ["Phone / WhatsApp", d.phone || "—"],
        ["Email", d.email || "—"],
      ],
    });
    sections.push({
      heading: "2. Scope of work",
      paragraphs: [d.project_description?.trim() || `Design and delivery of ${service}.`],
    });
    sections.push({
      heading: "3. Billing terms",
      rows: [
        ["Total Project Cost", formatKsh(total)],
        ["Amount Due Now", formatKsh(Number(d.amount) || 0)],
        ["Payment Method", d.payment_method || "M-PESA Buy Goods Till"],
        ["Payment Due Date", formatDate(d.due_date)],
      ],
    });
    if (d.payment_schedule?.trim()) {
      sections.push({
        heading: "4. Payment schedule",
        paragraphs: [d.payment_schedule.trim()],
      });
    }
    sections.push({
      heading: `${d.payment_schedule?.trim() ? "5" : "4"}. Project timeline & delivery`,
      rows: [
        ["Agreement Date", formatDate(d.doc_date)],
        ["Expected Delivery / Completion", formatDate(d.delivery_date)],
      ],
    });
    if (d.expectations?.trim()) {
      sections.push({
        heading: `${d.payment_schedule?.trim() ? "6" : "5"}. Expectations`,
        paragraphs: [d.expectations.trim()],
      });
    }
    sections.push({
      heading: "Terms and conditions",
      paragraphs: [
        d.terms?.trim() ||
          "Work commences once the agreed deposit is confirmed. Any change to the agreed scope may affect cost and delivery timelines and will be communicated in writing. Deposits are processed through proper legal channels and are 100% refundable if the strategic information provided does not meet the Client's expectations. Ownership of the completed deliverables transfers to the Client on full settlement of the project cost.",
      ],
    });
    if (d.notes?.trim()) {
      sections.push({ heading: "Additional notes", paragraphs: [d.notes.trim()] });
    }
  } else if (d.doc_type === "deposit_ack" || d.doc_type === "final_ack") {
    const isFinal = d.doc_type === "final_ack";
    sections.push({
      paragraphs: [
        `This letter confirms receipt of payment${
          paymentBullets.length > 1 ? "s" : ""
        } toward the design and development of ${service}.`,
      ],
    });
    if (paymentBullets.length) {
      sections.push({ heading: "Payments received", bullets: paymentBullets });
    }
    sections.push({ heading: "Financial summary", rows: financialRows });
    sections.push({
      paragraphs: [
        isFinal
          ? `This document serves as an official acknowledgement that the project cost for ${service} has been settled${
              balance > 0 ? " to the extent shown above" : " in full"
            } and that the work has been delivered and completed as agreed.`
          : "This document serves as an official acknowledgement of the payments received and the remaining balance.",
      ],
    });
    if (d.delivery_date) {
      sections.push({
        rows: [[isFinal ? "Completion Date" : "Expected Delivery Date", formatDate(d.delivery_date)]],
      });
    }
    if (d.terms?.trim()) sections.push({ heading: "Terms", paragraphs: [d.terms.trim()] });
    if (d.notes?.trim()) sections.push({ heading: "Notes", paragraphs: [d.notes.trim()] });
  } else {
    const isFinalReq = d.doc_type === "final_payment_request";
    sections.push({
      paragraphs: [
        isFinalReq
          ? `This letter serves as the final payment request for ${service}. The work has been completed and delivered as agreed, and the balance shown below is now due.`
          : d.doc_type === "deposit_request"
            ? `This letter serves as a formal request for the agreed deposit toward ${service}. Work commences immediately once the deposit is confirmed.`
            : `This letter serves as a formal payment request toward ${service}.`,
      ],
    });
    if (d.project_description?.trim()) {
      sections.push({ heading: "Project summary", paragraphs: [d.project_description.trim()] });
    }
    if (paymentBullets.length) {
      sections.push({ heading: "Payments already received", bullets: paymentBullets });
    }
    sections.push({
      heading: "Amount due",
      rows: [
        ...financialRows,
        ["Amount Requested Now", formatKsh(Number(d.amount) || 0)],
        ["Payment Due By", formatDate(d.due_date)],
      ],
    });
    sections.push({ heading: "How to pay", bullets: instructions });
    if (d.terms?.trim()) sections.push({ heading: "Terms", paragraphs: [d.terms.trim()] });
    if (d.notes?.trim()) sections.push({ heading: "Notes", paragraphs: [d.notes.trim()] });
  }

  return {
    title: meta.title,
    docNumber: d.doc_number,
    date: formatDate(d.doc_date),
    to: clientLine(d),
    re: `RE: ${
      d.doc_type === "contract" ? "AGREEMENT FOR" : `${meta.title} —`
    } ${(d.service_name || "PROJECT").toUpperCase()}`,
    sections,
    signatures: meta.needsSignature,
  };
}

export function whatsappSummary(d: DocData) {
  const model = buildDocumentModel(d);
  const { paid, balance, total } = computeTotals(d);
  const lines = [
    `*${ISSUER}*`,
    `*${model.title}*`,
    `Ref: ${d.doc_number}`,
    `Date: ${model.date}`,
    `To: ${model.to}`,
    "",
    `Project: ${d.service_name || "—"}`,
    `Total Project Cost: ${formatKsh(total)}`,
  ];
  if (d.doc_type !== "contract") {
    lines.push(`Total Received: ${formatKsh(paid)}`);
    lines.push(`Outstanding Balance: ${formatKsh(balance)}`);
  }
  if (Number(d.amount) > 0) {
    lines.push(
      `${d.doc_type.includes("ack") ? "Amount Paid" : "Amount Due Now"}: ${formatKsh(Number(d.amount))}`,
    );
  }
  if (d.due_date) lines.push(`Due Date: ${formatDate(d.due_date)}`);
  if (d.delivery_date) lines.push(`Delivery / Completion: ${formatDate(d.delivery_date)}`);
  lines.push("", "The signed PDF document is attached / shared separately.", "www.royalrobert.co.ke");
  return lines.join("\n");
}

export function normalizePhone(phone: string) {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0")) return `254${digits.slice(1)}`;
  if (digits.startsWith("7") || digits.startsWith("1")) return `254${digits}`;
  return digits;
}
