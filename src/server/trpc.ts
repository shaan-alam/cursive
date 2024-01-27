import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({
  transformer: superjson,
});

const middleware = t.middleware;

const isAuth = middleware(async ({ next }) => {
  return next({
    ctx: {
      name: "Shaan",
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
