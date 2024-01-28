// @ts-check
import { z } from "zod";

/**
 * Specify your environment variables schema here.
 * This way, you can ensure the app isn't built with invalid environment variables.
 * By default, environment variables are only available in the Node.js environment, meaning they won't be exposed to the browser. In order to expose a variable to the browser you have to prefix the variable with NEXT_PUBLIC_.
 * -> Don't use any Zod .transform() methods in the schema (will cause `implicitly has type 'any'` error) <-
 */
export const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: z.string(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_SECRET: z.string(),
  EMAIL_SERVER_HOST: z.string(),
  EMAIL_SERVER_PORT: z.string(),
  EMAIL_SERVER_USER: z.string(),
  EMAIL_SERVER_PASSWORD: z.string(),
  EMAIL_FROM: z.string(),
});

/**
 * Environment variable declarations based on the schema help structure your environment variables programmatically.
 * @type {{ [k in keyof z.infer<typeof schema>]: z.infer<typeof schema>[k] | undefined }}
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  GITHUB_ID: process.env.GITHUB_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
  EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
  EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
  EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,
};

/**
 * --------------------------------
 * --------------------------------
 * Next-ValidEnv Manual Implementation
 * --------------------------------
 * --------------------------------
 */

export const formatZodErrors = (
  /** @type z.ZodFormattedError<Map<string, string>, string> */ errors
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        return `${name}: ${value._errors.join(", ")}\n`;

      return;
    })
    .filter(Boolean);

const safeParsedEnv = schema.safeParse(env);

if (!safeParsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatZodErrors(safeParsedEnv.error.format())
  );
  throw new Error("Invalid environment variables");
}
