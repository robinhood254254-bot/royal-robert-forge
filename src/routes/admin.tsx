import { Link, Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { FileText, LogOut, Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import markSrc from "@/assets/royal-robert-mark.png";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Document Workspace | Royal Robert" },
      { name: "description", content: "Private workspace for generating Royal Robert client documents." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Document Workspace | Royal Robert" },
      { property: "og:description", content: "Private workspace for generating Royal Robert client documents." },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { session, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/auth" });
  }, [loading, session, navigate]);

  if (loading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30">
        <p className="text-sm text-muted-foreground">Checking your session…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <Link to="/admin" className="flex items-center gap-2">
            <img src={markSrc} alt="" className="h-9 w-9" />
            <span className="text-sm font-bold text-foreground">Document Workspace</span>
          </Link>
          <nav className="ml-auto flex flex-wrap items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin">
                <FileText className="size-4" /> Documents
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/clients">
                <Users className="size-4" /> Clients
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/admin/new">
                <Plus className="size-4" /> New document
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              <LogOut className="size-4" /> Sign out
            </Button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
