import { jsPDF } from "jspdf";

import markSrc from "@/assets/royal-robert-mark.png";
import {
  AUTHORIZED_BY,
  ISSUER,
  buildDocumentModel,
  type DocData,
  type DocModel,
} from "./documents";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 56;
const CONTENT_TOP = 204;
const CONTENT_BOTTOM = PAGE_H - 112;

const NAVY: [number, number, number] = [18, 42, 71];
const SLATE: [number, number, number] = [95, 106, 122];
const TEAL: [number, number, number] = [23, 105, 150];
const LIGHT: [number, number, number] = [239, 243, 248];

let markCache: string | null = null;

async function loadMark(): Promise<string> {
  if (markCache) return markCache;
  const res = await fetch(markSrc);
  const blob = await res.blob();
  markCache = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  return markCache;
}

/** Draws the wave letterhead (header + footer) onto an offscreen canvas. */
function letterheadDataUrl(): string {
  const scale = 3;
  const canvas = document.createElement("canvas");
  canvas.width = PAGE_W * scale;
  canvas.height = PAGE_H * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  const band = (
    color: string,
    leftY: number,
    rightY: number,
    top: boolean,
  ) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    if (top) {
      ctx.moveTo(0, leftY);
      ctx.bezierCurveTo(PAGE_W * 0.3, leftY + 70, PAGE_W * 0.5, rightY - 80, PAGE_W, rightY);
      ctx.lineTo(PAGE_W, 0);
      ctx.lineTo(0, 0);
    } else {
      ctx.moveTo(0, PAGE_H - leftY);
      ctx.bezierCurveTo(
        PAGE_W * 0.32,
        PAGE_H - leftY - 60,
        PAGE_W * 0.52,
        PAGE_H - rightY + 60,
        PAGE_W,
        PAGE_H - rightY,
      );
      ctx.lineTo(PAGE_W, PAGE_H);
      ctx.lineTo(0, PAGE_H);
    }
    ctx.closePath();
    ctx.fill();
  };

  // Header waves
  band("#3f4650", 118, 186, true);
  band("#122a47", 96, 162, true);
  band("#176996", 78, 140, true);

  // White bay for the logo
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(150, 0);
  ctx.bezierCurveTo(238, 52, 240, 132, 152, 190);
  ctx.lineTo(0, 190);
  ctx.closePath();
  ctx.fill();

  // Footer waves
  band("#3f4650", 34, 86, false);
  band("#122a47", 22, 68, false);
  band("#176996", 10, 48, false);

  return canvas.toDataURL("image/png");
}

let letterheadCache: string | null = null;
function getLetterhead() {
  if (!letterheadCache) letterheadCache = letterheadDataUrl();
  return letterheadCache;
}

function drawChrome(doc: jsPDF, mark: string) {
  doc.addImage(getLetterhead(), "PNG", 0, 0, PAGE_W, PAGE_H, undefined, "FAST");
  doc.addImage(mark, "PNG", 62, 18, 76, 76, undefined, "FAST");
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11.5);
  doc.text("ROYAL ROBERT", 100, 112, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...SLATE);
  doc.text("D I G I T A L   S O L U T I O N S", 100, 124, { align: "center" });

  // Contact block (white on the dark wave)
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("www.royalrobert.co.ke", PAGE_W - MARGIN, 40, { align: "right" });
  doc.text("info@royalrobert.co.ke", PAGE_W - MARGIN, 58, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text("+254 710 837 083", PAGE_W - MARGIN, 76, { align: "right" });
  doc.text("+254 792 645 485", PAGE_W - MARGIN, 90, { align: "right" });
  doc.setFontSize(8);
  doc.text("24-hour support", PAGE_W - MARGIN, 106, { align: "right" });
}

export async function buildPdf(data: DocData): Promise<jsPDF> {
  const model: DocModel = buildDocumentModel(data);
  const mark = await loadMark();
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const width = PAGE_W - MARGIN * 2;
  let y = CONTENT_TOP;
  let page = 1;

  drawChrome(doc, mark);

  const ensure = (needed: number) => {
    if (y + needed <= CONTENT_BOTTOM) return;
    doc.addPage();
    page += 1;
    drawChrome(doc, mark);
    y = CONTENT_TOP;
  };

  const para = (
    text: string,
    opts: { size?: number; style?: "normal" | "bold"; color?: [number, number, number]; gap?: number; indent?: number } = {},
  ) => {
    const size = opts.size ?? 10.5;
    const indent = opts.indent ?? 0;
    doc.setFont("helvetica", opts.style ?? "normal");
    doc.setFontSize(size);
    doc.setTextColor(...(opts.color ?? NAVY));
    const lines = doc.splitTextToSize(text, width - indent) as string[];
    const lh = size * 1.38;
    lines.forEach((line) => {
      ensure(lh);
      doc.text(line, MARGIN + indent, y);
      y += lh;
    });
    y += opts.gap ?? 6;
  };

  // Title
  ensure(60);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.setTextColor(...NAVY);
  doc.text(model.title, MARGIN, y);
  y += 8;
  doc.setDrawColor(...TEAL);
  doc.setLineWidth(2.4);
  doc.line(MARGIN, y, MARGIN + 78, y);
  y += 22;

  // Meta
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...SLATE);
  doc.text(`Document No: ${model.docNumber}`, MARGIN, y);
  doc.text(`Date: ${model.date}`, PAGE_W - MARGIN, y, { align: "right" });
  y += 18;
  doc.setTextColor(...NAVY);
  doc.setFontSize(10.5);
  doc.text(`To: ${model.to}`, MARGIN, y);
  y += 20;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  const reLines = doc.splitTextToSize(model.re, width) as string[];
  reLines.forEach((l) => {
    ensure(16);
    doc.text(l, MARGIN, y);
    y += 16;
  });
  y += 10;

  for (const section of model.sections) {
    if (section.heading) {
      const first = section.rows?.length
        ? 22 * Math.min(section.rows.length, 2)
        : section.bullets?.length
          ? 34
          : 34;
      console.log("HEAD", section.heading, y, CONTENT_BOTTOM);
      ensure(36 + first);
      y += 3;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...TEAL);
      doc.text(section.heading.toUpperCase(), MARGIN, y);
      y += 14;
    }
    section.paragraphs?.forEach((p) => para(p));
    section.bullets?.forEach((b) => {
      const size = 10.5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(size);
      doc.setTextColor(...NAVY);
      const lines = doc.splitTextToSize(b, width - 18) as string[];
      const lh = size * 1.38;
      lines.forEach((line, i) => {
        ensure(lh);
        if (i === 0) {
          doc.setTextColor(...TEAL);
          doc.text("•", MARGIN + 4, y);
          doc.setTextColor(...NAVY);
        }
        doc.text(line, MARGIN + 18, y);
        y += lh;
      });
      y += 2;
    });
    if (section.rows?.length) {
      const rowH = 22;
      ensure(rowH * section.rows.length);
      section.rows.forEach(([label, value], i) => {
        ensure(rowH);
        if (i % 2 === 0) {
          doc.setFillColor(...LIGHT);
          doc.rect(MARGIN, y - 14, width, rowH, "F");
        }
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(...SLATE);
        doc.text(label, MARGIN + 10, y);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...NAVY);
        doc.text(value, PAGE_W - MARGIN - 10, y, { align: "right" });
        y += rowH;
      });
      y += 8;
    }
  }

  // Signatures
  if (y + 127 > PAGE_H - 96) {
    doc.addPage();
    page += 1;
    drawChrome(doc, mark);
    y = CONTENT_TOP;
  }
  y += 10;
  doc.setDrawColor(215, 222, 230);
  doc.setLineWidth(1);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...SLATE);
  doc.text("Issued by:", MARGIN, y);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  doc.text(ISSUER, MARGIN, y + 15);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...SLATE);
  doc.text("Authorized by:", MARGIN, y + 36);
  doc.setTextColor(...NAVY);
  doc.text(AUTHORIZED_BY, MARGIN, y + 51);

  const sigY = y + 72;
  const colW = (width - 40) / 2;
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, sigY, MARGIN + colW, sigY);
  doc.setFontSize(9);
  doc.setTextColor(...SLATE);
  doc.text("Signature — Royal Robert Digital Solutions", MARGIN, sigY + 12);
  doc.text(`Date: ______________`, MARGIN, sigY + 25);

  if (model.signatures === "both") {
    const x2 = MARGIN + colW + 40;
    doc.setDrawColor(...NAVY);
    doc.line(x2, sigY, x2 + colW, sigY);
    doc.setTextColor(...SLATE);
    doc.text(`Signature — ${data.client_name || "Client"}`, x2, sigY + 12);
    doc.text(`Date: ______________`, x2, sigY + 25);
  }

  // Footer note on every page
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p += 1) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...SLATE);
    doc.text(`${model.docNumber}`, MARGIN, PAGE_H - 96);
    doc.text(`Page ${p} of ${total}`, PAGE_W - MARGIN, PAGE_H - 96, { align: "right" });
  }
  doc.setPage(page);

  return doc;
}

export function pdfFileName(data: DocData) {
  const safe = (s: string) => (s || "document").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  return `${safe(data.doc_number)}-${safe(data.client_name)}.pdf`;
}

export async function downloadPdf(data: DocData) {
  const doc = await buildPdf(data);
  doc.save(pdfFileName(data));
}

export async function pdfBlob(data: DocData) {
  const doc = await buildPdf(data);
  return doc.output("blob");
}

export async function pdfPreviewUrl(data: DocData) {
  const blob = await pdfBlob(data);
  return URL.createObjectURL(blob);
}
