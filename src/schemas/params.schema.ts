import { z } from "zod";

export const searchContactsQuerySchema = z.object({
  id: z.int().min(1),
});
