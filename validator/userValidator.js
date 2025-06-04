import { z } from "zod";

const validateCreateUser = z.object({
  name: z.string().max(30).min(2).optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

const validateIdUser = z.object({
  userId: z.string().min(10),
});

export { validateCreateUser, validateIdUser };
