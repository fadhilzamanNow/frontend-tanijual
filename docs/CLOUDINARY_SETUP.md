# Cloudinary Setup Guide

This guide will help you set up Cloudinary for image uploads in the TaniJual application.

## 1. Create a Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account
2. After signing in, you'll be taken to your dashboard
3. Find your credentials in the "Account Details" section

## 2. Get Your Credentials

From your Cloudinary dashboard, copy these three values:

- **Cloud Name**: Your unique cloud name (e.g., `dxxxxxxxx`)
- **API Key**: Your API key (e.g., `123456789012345`)
- **API Secret**: Your API secret (e.g., `abcdefghijklmnopqrstuvwxyz123`)

## 3. Add Environment Variables

Add these variables to your `.env.development` and `.env.production` files:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Important**: Never commit these credentials to your repository!

## 4. Usage Examples

### Basic Upload Component

```tsx
import ImageUpload from "@/components/ImageUpload";

export default function MyForm() {
  const handleUploadSuccess = (url: string, publicId: string) => {
    console.log("Image uploaded:", url);
    // Save url to your database
  };

  return (
    <div>
      <ImageUpload
        folder="products"
        onUploadSuccess={handleUploadSuccess}
        maxSizeMB={5}
      />
    </div>
  );
}
```

### Using the Hook Directly

```tsx
import { useImageUpload } from "@/hooks/useImageUpload";

export default function CustomUpload() {
  const { upload, uploading, progress, error, result } = useImageUpload({
    folder: "sellers",
    maxSizeMB: 5,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await upload(file);
      if (result) {
        console.log("Uploaded:", result.url);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={uploading} />
      {uploading && <p>Uploading... {progress}%</p>}
      {error && <p className="text-red-500">{error}</p>}
      {result && <img src={result.url} alt="Uploaded" />}
    </div>
  );
}
```

### Upload from API Route

```tsx
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  
  // Convert to buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Upload
  const result = await uploadToCloudinary(buffer, "my-folder");
  
  return Response.json({ url: result.url });
}
```

### Multiple Image Upload

```tsx
import { useImageUpload } from "@/hooks/useImageUpload";

export default function MultipleUpload() {
  const { uploadMultiple, uploading } = useImageUpload({
    folder: "gallery",
  });

  const handleMultipleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const results = await uploadMultiple(files);
    console.log("Uploaded images:", results);
  };

  return (
    <input
      type="file"
      multiple
      onChange={handleMultipleFiles}
      disabled={uploading}
    />
  );
}
```

## 5. API Endpoints

### Upload Image

**Endpoint**: `POST /api/upload`

**Request**: `multipart/form-data`
- `file`: Image file (required)
- `folder`: Folder name in Cloudinary (optional)

**Response**:
```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "tanijual/abc123",
    "width": 1920,
    "height": 1080,
    "format": "jpg"
  }
}
```

## 6. File Restrictions

- **Allowed types**: JPEG, JPG, PNG, WebP
- **Max size**: 5MB (configurable)
- **Folder structure**: Organized by feature (e.g., `products/`, `sellers/`, `users/`)

## 7. Cloudinary Features Used

- **Auto-optimization**: Images are automatically optimized for web
- **Responsive images**: Cloudinary can serve different sizes
- **Secure URLs**: All uploads use HTTPS
- **CDN delivery**: Fast global content delivery

## 8. Best Practices

### Organize by Folders

```tsx
// Products
<ImageUpload folder="products" />

// User avatars
<ImageUpload folder="users/avatars" />

// Seller logos
<ImageUpload folder="sellers/logos" />
```

### Delete Old Images

When updating images, delete the old one:

```tsx
import { deleteFromCloudinary } from "@/lib/cloudinary";

// When user updates profile picture
const oldPublicId = user.profilePicturePublicId;
if (oldPublicId) {
  await deleteFromCloudinary(oldPublicId);
}
```

### Store Public ID in Database

Always store both the URL and public ID:

```prisma
model Product {
  id        String  @id @default(uuid())
  name      String
  imageUrl  String?
  imagePublicId String?
}
```

This allows you to delete images later.

## 9. Troubleshooting

### Error: "Invalid cloud_name"
- Check that `CLOUDINARY_CLOUD_NAME` is set correctly
- Verify there are no extra spaces in your `.env` file

### Error: "Invalid API key"
- Verify `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET`
- Make sure you're using the correct credentials from your dashboard

### Upload fails silently
- Check browser console for errors
- Verify file size is under limit
- Ensure file type is allowed (JPEG, PNG, WebP)

### Images not loading
- Check that the URL is correct
- Verify your Cloudinary account is active
- Ensure CORS is configured if needed

## 10. Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Cloudinary React SDK](https://cloudinary.com/documentation/react_integration)

## 11. Security Notes

- Never expose API credentials in client-side code
- All uploads go through your API route
- Implement authentication checks in your upload endpoint
- Consider adding rate limiting for uploads
- Validate file types and sizes on the server

## Example: Adding Auth to Upload Route

```tsx
// src/app/api/upload/route.ts
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  // Verify user is authenticated
  const token = req.cookies.get("authToken")?.value;
  if (!token) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await verifyToken(token);
    // Continue with upload...
  } catch (error) {
    return json({ error: "Invalid token" }, { status: 401 });
  }
}
```
