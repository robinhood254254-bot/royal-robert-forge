import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Download, Loader2, Plus, Save, Share2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentPreview } from "@/components/admin/DocumentPreview";
import { db } from "@/lib/db";
import { downloadPdf } from "@/lib/doc-pdf";
import { supabase } from "@/integrations/supabase/client";
import {
  DOC_TYPES,
  computeTotals,
  emptyDoc,
  formatKsh,
  newDocNumber,
  normalizePhone,
  whatsappSummary,
  type DocData,
  type DocType,
  type Payment,
} from "@/lib/documents";

export const Route = createFileRoute("/admin/new")({
  validateSearch: (search: Record<string, unknown>): { id?: string } =>
    typeof search['id'] === "string" ? { id: search['id'] as string } : {},
  component: DocumentEditor,
});

type ClientRow = { id: string; name: string; contact_person: string; phone: string; email: string };

function DocumentEditor() {
  const { id } = Route.useSearch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [doc, setDoc] = useState<DocData>(() => emptyDoc("contract"));
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  const { data: existing } = useQuery({
    queryKey: ["document", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await db.from("documents").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data as DocData | null;
    },
  });

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await db.from("clients").select("*").order("name");
      if (error) throw error;
      return (data ?? []) as ClientRow[];
    },
  });

  useEffect(() => {
    if (existing) setDoc({ ...emptyDoc(existing.doc_type), ...existing, payments: existing.payments ?? [] });
  }, [existing]);

  const set = <K extends keyof DocData>(key: K, value: DocData[K]) =>
    setDoc((prev) => ({ ...prev, [key]: value }));

  const totals = computeTotals(doc);

  const addPayment = () =>
    setDoc((prev) => ({
      ...prev,
      payments: [
        ...prev.payments,
        {
          date: new Date().toISOString().slice(0, 10),
          amount: 0,
          method: prev.payment_method || "M-PESA Buy Goods Till",
          reference: "",
          note: "",
        },
      ],
    }));

  const updatePayment = (index: number, patch: Partial<Payment>) =>
    setDoc((prev) => ({
      ...prev,
      payments: prev.payments.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    }));

  const removePayment = (index: number) =>
    setDoc((prev) => ({ ...prev, payments: prev.payments.filter((_, i) => i !== index) }));

  const save = async () => {
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) throw new Error("Your session expired. Sign in again.");
      const payload = {
        user_id: userId,
        client_id: doc.client_id ?? null,
        doc_type: doc.doc_type,
        doc_number: doc.doc_number,
        client_name: doc.client_name,
        contact_person: doc.contact_person,
        phone: doc.phone,
        email: doc.email,
        service_name: doc.service_name,
        project_description: doc.project_description,
        total_cost: Number(doc.total_cost) || 0,
        amount: Number(doc.amount) || 0,
        payments: doc.payments,
        payment_method: doc.payment_method,
        reference: doc.reference,
        doc_date: doc.doc_date || null,
        due_date: doc.due_date || null,
        delivery_date: doc.delivery_date || null,
        payment_schedule: doc.payment_schedule,
        terms: doc.terms,
        expectations: doc.expectations,
        notes: doc.notes,
        status: doc.status ?? "draft",
      };

      if (doc.id) {
        const { error } = await db.from("documents").update(payload).eq("id", doc.id);
        if (error) throw error;
      } else {
        const { data, error } = await db.from("documents").insert(payload).select("id").single();
        if (error) throw error;
        setDoc((prev) => ({ ...prev, id: data.id }));
        navigate({ to: "/admin/new", search: { id: data.id }, replace: true });
      }
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save the document");
    } finally {
      setSaving(false);
    }
  };

  const generate = async () => {
    setGenerating(true);
    try {
      await downloadPdf(doc);
      toast.success("PDF downloaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not generate the PDF");
    } finally {
      setGenerating(false);
    }
  };

  const share = () => {
    const phone = normalizePhone(doc.phone);
    const text = encodeURIComponent(whatsappSummary(doc));
    window.open(phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`, "_blank");
  };

  const pickClient = (clientId: string) => {
    const c = clients?.find((x) => x.id === clientId);
    if (!c) return;
    setDoc((prev) => ({
      ...prev,
      client_id: c.id,
      client_name: c.name,
      contact_person: c.contact_person ?? "",
      phone: c.phone ?? "",
      email: c.email ?? "",
    }));
  };

  const isContract = doc.doc_type === "contract";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-foreground">{doc.id ? "Edit document" : "New document"}</h1>
          <div className="flex flex-wrap gap-2">
            <Button onClick={save} disabled={saving}>
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save
            </Button>
            <Button variant="outline" onClick={generate} disabled={generating}>
              {generating ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />} PDF
            </Button>
            <Button variant="outline" onClick={share}>
              <Share2 className="size-4" /> WhatsApp
            </Button>
          </div>
        </div>

        <Section title="Document">
          <Field label="Document type">
            <Select
              value={doc.doc_type}
              onValueChange={(v) =>
                setDoc((prev) => ({
                  ...prev,
                  doc_type: v as DocType,
                  doc_number: prev.id ? prev.doc_number : newDocNumber(v as DocType),
                }))
              }
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {DOC_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Document number">
            <Input value={doc.doc_number} onChange={(e) => set("doc_number", e.target.value)} />
          </Field>
          <Field label="Document date">
            <Input type="date" value={doc.doc_date} onChange={(e) => set("doc_date", e.target.value)} />
          </Field>
          <Field label="Due date">
            <Input type="date" value={doc.due_date} onChange={(e) => set("due_date", e.target.value)} />
          </Field>
          <Field label="Delivery / completion date">
            <Input type="date" value={doc.delivery_date} onChange={(e) => set("delivery_date", e.target.value)} />
          </Field>
        </Section>

        <Section title="Client">
          {clients?.length ? (
            <Field label="Load a saved client">
              <Select value={doc.client_id ?? ""} onValueChange={pickClient}>
                <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          ) : null}
          <Field label="Client / organization name">
            <Input value={doc.client_name} onChange={(e) => set("client_name", e.target.value)} />
          </Field>
          <Field label="Contact person">
            <Input value={doc.contact_person} onChange={(e) => set("contact_person", e.target.value)} />
          </Field>
          <Field label="Phone / WhatsApp">
            <Input value={doc.phone} onChange={(e) => set("phone", e.target.value)} placeholder="0712 345 678" />
          </Field>
          <Field label="Email">
            <Input type="email" value={doc.email} onChange={(e) => set("email", e.target.value)} />
          </Field>
        </Section>

        <Section title="Project">
          <Field label="Service / project name" full>
            <Input value={doc.service_name} onChange={(e) => set("service_name", e.target.value)} />
          </Field>
          <Field label="Project description" full>
            <Textarea rows={4} value={doc.project_description} onChange={(e) => set("project_description", e.target.value)} />
          </Field>
        </Section>

        <Section title="Money">
          <Field label="Total project cost (KSh)">
            <Input type="number" min={0} value={doc.total_cost} onChange={(e) => set("total_cost", Number(e.target.value))} />
          </Field>
          <Field label={doc.doc_type.includes("ack") ? "Amount paid now (KSh)" : "Amount requested now (KSh)"}>
            <Input type="number" min={0} value={doc.amount} onChange={(e) => set("amount", Number(e.target.value))} />
          </Field>
          <Field label="Payment method">
            <Input value={doc.payment_method} onChange={(e) => set("payment_method", e.target.value)} />
          </Field>
          <Field label="Transaction / reference number">
            <Input value={doc.reference} onChange={(e) => set("reference", e.target.value)} />
          </Field>
          <div className="sm:col-span-2 rounded-lg border border-border bg-secondary/40 p-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Total paid</span><b>{formatKsh(totals.paid)}</b></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Outstanding balance</span><b>{formatKsh(totals.balance)}</b></div>
          </div>
        </Section>

        <Section title="Payments recorded">
          <div className="sm:col-span-2 space-y-3">
            {doc.payments.map((p, i) => (
              <div key={i} className="grid gap-2 rounded-lg border border-border p-3 sm:grid-cols-[1fr_1fr_1fr_1fr_auto]">
                <Input type="date" value={p.date} onChange={(e) => updatePayment(i, { date: e.target.value })} />
                <Input type="number" min={0} value={p.amount} onChange={(e) => updatePayment(i, { amount: Number(e.target.value) })} placeholder="Amount" />
                <Input value={p.method} onChange={(e) => updatePayment(i, { method: e.target.value })} placeholder="Method" />
                <Input value={p.reference} onChange={(e) => updatePayment(i, { reference: e.target.value })} placeholder="Transaction code" />
                <Button variant="ghost" size="icon" onClick={() => removePayment(i)} aria-label="Remove payment">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addPayment}>
              <Plus className="size-4" /> Add payment
            </Button>
          </div>
        </Section>

        <Section title="Terms & notes">
          {isContract ? (
            <Field label="Payment schedule" full>
              <Textarea rows={3} value={doc.payment_schedule} onChange={(e) => set("payment_schedule", e.target.value)} placeholder="e.g. 50% deposit on signing, 30% at design approval, 20% on delivery." />
            </Field>
          ) : null}
          <Field label="Expectations" full>
            <Textarea rows={3} value={doc.expectations} onChange={(e) => set("expectations", e.target.value)} />
          </Field>
          <Field label="Terms and conditions" full>
            <Textarea rows={5} value={doc.terms} onChange={(e) => set("terms", e.target.value)} placeholder="Leave blank to use the standard Royal Robert terms." />
          </Field>
          <Field label="Additional notes" full>
            <Textarea rows={3} value={doc.notes} onChange={(e) => set("notes", e.target.value)} />
          </Field>
        </Section>
      </div>

      <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto">
        <p className="mb-3 text-sm font-semibold text-muted-foreground">Live preview</p>
        <DocumentPreview data={doc} />
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-primary">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={`space-y-2 ${full ? "sm:col-span-2" : ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
