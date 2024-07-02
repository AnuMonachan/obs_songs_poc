import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const getRouter = createTRPCRouter({
  getDirections: publicProcedure.query(({ ctx }) => {
    return ctx.db.direction.findMany();
  }),
  getLanguages: publicProcedure.query(({ ctx }) => {
    return ctx.db.languages.findMany();
  }),
  getLanguageData: publicProcedure.query(({ ctx }) => {
    return ctx.db.language_data.findMany();
  }),
  getObsLanguages: publicProcedure.query(({ ctx }) => {
    return ctx.db.obs_languages.findMany();
  }),
  getSongLanguages: publicProcedure.query(({ ctx }) => {
    return ctx.db.song_languages.findMany();
  }),
  getSongDetails: publicProcedure.query(({ ctx }) => {
    return ctx.db.song_details.findMany();
  }),
});
