import { loginSchema, registerSchema } from "@/lib/validation";
import z from "zod";

export type FormData = z.infer<typeof registerSchema>;

export type LoginFormData = z.infer<typeof loginSchema>;
