import { z } from "zod";

const priceSchema = z
  .union([z.number(), z.string()])
  .transform((v) => Number(v));

export const productCreateSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().int().min(0),
  price: priceSchema,
  sellerId: z.uuid(),
});
export type ProductCreateInput = z.infer<typeof productCreateSchema>;

export const productUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  quantity: z.number().int().min(0).optional(),
  price: priceSchema.optional(),
});
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;

export const savedAddItemSchema = z.object({
  productId: z.uuid(),
});
export type SavedAddItemInput = z.infer<typeof savedAddItemSchema>;

export const registerSchema = z.object({
  username: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const sellerRegisterSchema = z.object({
  username: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});
export type SellerRegisterInput = z.infer<typeof sellerRegisterSchema>;

export const sellerLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});
export type SellerLoginInput = z.infer<typeof sellerLoginSchema>;
