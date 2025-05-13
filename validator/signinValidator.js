import { z } from "zod";

const validateLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export { validateLogin };
