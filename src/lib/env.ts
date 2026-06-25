import { z } from "zod";

// All env, zod-validated and parsed DEFENSIVELY: a missing var warns and
// falls back rather than crashing the build, so the shell renders during
// setup. Server secrets are never read in the browser.

const serverSchema = z.object({
  ANTHROPIC_API_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_FROM_NUMBER: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
});

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
});

function parseDefensively<T extends z.ZodTypeAny>(schema: T, source: unknown): z.infer<T> {
  const result = schema.safeParse(source);
  if (result.success) return result.data;
  console.warn("[env] some variables are missing or invalid — using fallbacks:", result.error.flatten().fieldErrors);
  // Re-parse with an empty object so optionals/defaults fill in.
  return schema.parse({});
}

const publicEnv = parseDefensively(publicSchema, {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
});

export const env = {
  ...publicEnv,
  // Server values are only resolved on the server.
  server: typeof window === "undefined" ? parseDefensively(serverSchema, process.env) : ({} as z.infer<typeof serverSchema>),
};
