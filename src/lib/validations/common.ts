import { z } from "zod";

export const idSchema = z.string().min(1);
export const nameSchema = z.string().trim().min(2).max(120);
export const optionalTextSchema = z.string().trim().max(5000).optional();