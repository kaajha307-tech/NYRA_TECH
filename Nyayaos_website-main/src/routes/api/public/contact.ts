import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const Schema = z.object({
  kind: z.enum(["message", "schedule", "live_support"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().nullable(),
  topic: z.string().trim().max(160).optional().nullable(),
  message: z.string().trim().max(4000).optional().nullable(),
  preferred_at: z.string().datetime().optional().nullable(),
});

async function trySend(origin: string, body: Record<string, unknown>) {
  try {
    const res = await fetch(`${origin}/lovable/email/transactional/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`,
      },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: z.infer<typeof Schema>;
        try {
          payload = Schema.parse(await request.json());
        } catch (err) {
          return new Response(
            JSON.stringify({ error: "invalid_input", details: String(err) }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }

        const { data, error } = await supabaseAdmin
          .from("contact_submissions")
          .insert({
            kind: payload.kind,
            name: payload.name,
            email: payload.email,
            phone: payload.phone ?? null,
            topic: payload.topic ?? null,
            message: payload.message ?? null,
            preferred_at: payload.preferred_at ?? null,
          })
          .select("id")
          .single();

        if (error || !data) {
          return new Response(JSON.stringify({ error: "db_error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Best-effort transactional emails (no-op if email infra not configured yet)
        const origin = new URL(request.url).origin;
        const confirmation = await trySend(origin, {
          templateName: "contact-confirmation",
          recipientEmail: payload.email,
          idempotencyKey: `contact-confirm-${data.id}`,
          templateData: {
            name: payload.name,
            kind: payload.kind,
            topic: payload.topic ?? "",
            message: payload.message ?? "",
            preferredAt: payload.preferred_at ?? "",
          },
        });
        const founder = await trySend(origin, {
          templateName: "contact-founder-notification",
          recipientEmail: "NYGENX .official@gmail.com",
          idempotencyKey: `contact-founder-${data.id}`,
          templateData: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone ?? "",
            kind: payload.kind,
            topic: payload.topic ?? "",
            message: payload.message ?? "",
            preferredAt: payload.preferred_at ?? "",
          },
        });

        if (confirmation || founder) {
          await supabaseAdmin
            .from("contact_submissions")
            .update({ confirmation_sent: confirmation, founder_notified: founder })
            .eq("id", data.id);
        }

        return new Response(
          JSON.stringify({ ok: true, id: data.id, emailed: confirmation }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
