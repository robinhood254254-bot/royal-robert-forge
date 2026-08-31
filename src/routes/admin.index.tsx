import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Download, FileText, Loader2, Pencil, Search, Share2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { downloadPdf } from "@/lib/doc-pdf";
import {
  computeTotals,
  docTypeMeta,
  formatDate,
  formatKsh,
  normalizePhone,
  whatsappSummary,
  type DocData,
} from "@/lib/documents";

export const Route = createFileRoute("/admin/")({
  component: DocumentsList,
});

function DocumentsList() {
  const [term, setTerm] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const { data: rows, error } = await db
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (rows ?? []) as DocData[];
    },
  });

  const filtered = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return data ?? [];
    return (data ?? []).filter((d) =>
      [d.client_name, d.contact_person, d.service_name, d.doc_number, docTypeMeta(d.doc_type).label]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [data, term]);

  const remove = async (id: string) => {
    if (!window.confirm("Delete this document permanently?")) return;
    const { error } = await db.from("documents").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Document deleted");
    queryClient.invalidateQueries({ queryKey: ["documents"] });
  };

  const share = (doc: DocData) => {
    const phone = normalizePhone(doc.phone);
    const text = encodeURIComponent(whatsappSummary(doc));
    window.open(phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`, "_blank");
  };

  const download = async (doc: DocData) => {
    setBusyId(doc.id ?? null);
    try {
      await downloadPdf(doc);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not generate the PDF");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground">
            Every contract, request and acknowledgement you have generated.
          </p>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search client, project or reference"
            className="pl-9"
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading documents…</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <FileText className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No documents yet.</p>
          <Button asChild className="mt-4">
            <Link to="/admin/new">Create your first document</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((doc) => {
            const totals = computeTotals(doc);
            return (
              <div
                key={doc.id}
                className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-border bg-card p-5"
              >
                <div className="min-w-[220px] space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{docTypeMeta(doc.doc_type).label}</Badge>
                    <span className="text-xs text-muted-foreground">{doc.doc_number}</span>
                  </div>
                  <p className="font-semibold text-foreground">{doc.client_name || "Untitled client"}</p>
                  <p className="text-sm text-muted-foreground">
                    {doc.service_name || "—"} · {formatDate(doc.doc_date)}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">
                    Total <span className="font-semibold text-foreground">{formatKsh(totals.total)}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Paid <span className="font-semibold text-foreground">{formatKsh(totals.paid)}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Balance <span className="font-semibold text-foreground">{formatKsh(totals.balance)}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/admin/new" search={{ id: doc.id }}>
                      <Pencil className="size-4" /> Edit
                    </Link>
                  </Button>
                  <Button size="sm" onClick={() => download(doc)} disabled={busyId === doc.id}>
                    {busyId === doc.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Download className="size-4" />
                    )}
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => share(doc)}>
                    <Share2 className="size-4" /> WhatsApp
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => doc.id && remove(doc.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
