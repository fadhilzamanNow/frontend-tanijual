import { z } from "zod";

const phoneNumberSchema = z
  .string()
  .min(10, "Nomor telepon minimal 10 digit")
  .refine(
    (val) => val.startsWith("08"),
    "Nomor telepon harus dimulai dengan 08",
  );

const priceSchema = z
  .union([z.number(), z.string()])
  .transform((v) => Number(v));

export const productCreateSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  description: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  quantity: z.number().int().min(0, "Jumlah minimal 0"),
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
    .min(2, "Username minimal 2 karakter")
    .max(50, "Username maksimal 50 karakter"),
  email: z.email("Masukkan alamat email yang valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(100, "Password maksimal 100 karakter"),
  phoneNumber: phoneNumberSchema,
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Masukkan alamat email yang valid"),
  password: z.string().min(1, "Password wajib diisi"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const sellerRegisterSchema = z.object({
  username: z
    .string()
    .min(2, "Username minimal 2 karakter")
    .max(50, "Username maksimal 50 karakter"),
  email: z.string().email("Masukkan alamat email yang valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(100, "Password maksimal 100 karakter"),
  phoneNumber: phoneNumberSchema,
});
export type SellerRegisterInput = z.infer<typeof sellerRegisterSchema>;

export const sellerLoginSchema = z.object({
  email: z.string().email("Masukkan alamat email yang valid"),
  password: z.string().min(1, "Password wajib diisi"),
});
export type SellerLoginInput = z.infer<typeof sellerLoginSchema>;
