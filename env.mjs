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
  DATABASE_URI: z.string()
});

/**
 * Environment variable declarations based on the schema help structure your environment variables programmatically.
 * @type {{ [k in keyof z.infer<typeof schema>]: z.infer<typeof schema>[k] | undefined }}
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URI: process.env.DATABASE_URI
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