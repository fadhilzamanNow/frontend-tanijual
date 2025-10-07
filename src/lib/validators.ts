import { z } from "zod";

const priceSchema = z
  .union([z.number(), z.string()])
  .transform((v) => Number(v));

export const productCreateSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  quantity: z.number().int().min(0, "Quantity must be 0 or greater"),
  price: priceSchema,
  sellerId: z.uuid(),
  imageUrl: z.string().optional(),
  imageKey: z.string().optional(),
});
export type ProductCreateInput = z.infer<typeof productCreateSchema>;

export const productUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  categoryId: z.string().uuid().optional().nullable(),
  quantity: z.number().int().min(0).optional(),
  price: priceSchema.optional(),
  imageUrl: z.string().optional(),
  imageKey: z.string().optional(),
});
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;

export const savedAddItemSchema = z.object({
  productId: z.uuid(),
});
export type SavedAddItemInput = z.infer<typeof savedAddItemSchema>;

export const registerSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(50, "Username must be less than 50 characters"),
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be less than 100 characters"),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const sellerRegisterSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(50, "Username must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be less than 100 characters"),
});
export type SellerRegisterInput = z.infer<typeof sellerRegisterSchema>;

export const sellerLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
export type SellerLoginInput = z.infer<typeof sellerLoginSchema>;
