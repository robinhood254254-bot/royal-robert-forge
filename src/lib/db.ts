/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/integrations/supabase/client";

/**
 * Loosely typed accessor for the private admin tables (clients, documents).
 * The generated types file may lag behind migrations, so table access is
 * intentionally untyped here while the row shapes live in src/lib/documents.ts.
 */
export const db = supabase as any;
