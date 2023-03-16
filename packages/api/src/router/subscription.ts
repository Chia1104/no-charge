import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const subscriptionRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.subscription.findMany({
      where: {
        userId: ctx.user.id,
      },
    });
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.subscription.findFirst({
        where: {
          id: input.id,
          userId: ctx.user.id,
        },
      });
    }),
});
