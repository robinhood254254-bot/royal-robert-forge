import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Save, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/db";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/clients")({
  component: ClientsPage,
});

type ClientRow = {
  id?: string;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  notes: string;
};

const blank: ClientRow = { name: "", contact_person: "", phone: "", email: "", notes: "" };

function ClientsPage() {
  const [form, setForm] = useState<ClientRow>(blank);
  const [term, setTerm] = useState("");
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await db.from("clients").select("*").order("name");
      if (error) throw error;
      return (data ?? []) as ClientRow[];
    },
  });

  const save = async () => {
    if (!form.name.trim()) {
      toast.error("Client name is required");
      return;
    }
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) throw new Error("Your session expired. Sign in again.");
      const payload = { ...form, user_id: userId };
      delete (payload as { id?: string }).id;
      if (form.id) {
        const { error } = await db.from("clients").update(payload).eq("id", form.id);
        if (error) throw error;
      } else {
        const { error } = await db.from("clients").insert(payload);
        if (error) throw error;
      }
      toast.success("Client saved");
      setForm(blank);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save the client");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id?: string) => {
    if (!id || !window.confirm("Delete this client?")) return;
    const { error } = await db.from("clients").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["clients"] });
    toast.success("Client deleted");
  };

  const filtered = (clients ?? []).filter((c) =>
    [c.name, c.contact_person, c.phone, c.email].join(" ").toLowerCase().includes(term.trim().toLowerCase()),
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
          {form.id ? "Edit client" : "Add client"}
        </h2>
        <div className="mt-4 space-y-4">
          {(
            [
              ["name", "Client / organization"],
              ["contact_person", "Contact person"],
              ["phone", "Phone / WhatsApp"],
              ["email", "Email"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>{label}</Label>
              <Input id={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
            </div>
          ))}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <Button onClick={save} disabled={saving} className="flex-1">
              {form.id ? <Save className="size-4" /> : <Plus className="size-4" />} Save client
            </Button>
            {form.id ? (
              <Button variant="outline" onClick={() => setForm(blank)}>Cancel</Button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search clients" className="pl-9" />
        </div>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading clients…</p>
        ) : filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
            No clients saved yet.
          </p>
        ) : (
          filtered.map((c) => (
            <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
              <div>
                <p className="font-semibold text-foreground">{c.name}</p>
                <p className="text-sm text-muted-foreground">
                  {[c.contact_person, c.phone, c.email].filter(Boolean).join(" · ") || "—"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setForm(c)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => remove(c.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
