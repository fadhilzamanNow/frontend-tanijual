# User Profile API Documentation

API endpoints for managing user profile information.

## Base URL

All endpoints are prefixed with `/api/me`

## Authentication

All endpoints require authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### 1. Get User Profile

Get the authenticated user's profile information.

**Endpoint:** `GET /api/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "user-uuid",
  "username": "johndoe",
  "email": "john@example.com",
  "profilePhotoUrl": "/uploads/avatars/abc-123.jpg"
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized (missing or invalid token)
- `404` - User not found

---

### 2. Upload Profile Photo

Upload a new profile photo for the authenticated user.

**Endpoint:** `POST /api/me/photo`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
- `photo` (File) - Image file to upload

**Validation:**
- **File types:** JPEG, JPG, PNG, WebP only
- **Max size:** 5MB
- **Required:** Yes

**Example (JavaScript):**
```javascript
const formData = new FormData();
formData.append("photo", fileInput.files[0]);

const response = await fetch("/api/me/photo", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});
```

**Response:**
```json
{
  "id": "user-uuid",
  "username": "johndoe",
  "email": "john@example.com",
  "profilePhotoUrl": "/uploads/avatars/xyz-789.jpg"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad request (invalid file type, too large, or missing file)
- `401` - Unauthorized

**Notes:**
- Automatically deletes the old profile photo when uploading a new one
- Uses hybrid storage (local in dev, S3 in production)
- Files saved to `avatars/` folder

---

### 3. Change Password

Change the authenticated user's password.

**Endpoint:** `PATCH /api/me/password`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentPassword": "old-password",
  "newPassword": "new-password"
}
```

**Validation:**
- `currentPassword` - Required, must match user's current password
- `newPassword` - Required, minimum 6 characters

**Example:**
```javascript
const response = await fetch("/api/me/password", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    currentPassword: "oldPass123",
    newPassword: "newPass456",
  }),
});
```

**Response:**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad request (missing fields or password too short)
- `401` - Unauthorized (invalid current password or missing token)
- `404` - User not found

---

## Error Response Format

All endpoints return errors in this format:

```json
{
  "error": "Error title",
  "message": "Detailed error message"
}
```

## Common Errors

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 400 Bad Request
```json
{
  "error": "Invalid file type",
  "message": "Only JPEG, PNG, and WebP images are allowed"
}
```

### 404 Not Found
```json
{
  "error": "User not found",
  "message": "User account does not exist"
}
```

## Usage Examples

### React Component Example

```tsx
import { useState } from "react";

function ProfilePhotoUpload() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const token = localStorage.getItem("authToken");

      const formData = new FormData();
      formData.append("photo", file);

      const response = await fetch("/api/me/photo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const updatedUser = await response.json();
      console.log("New photo URL:", updatedUser.profilePhotoUrl);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
      disabled={uploading}
    />
  );
}
```

### Password Change Example

```tsx
async function changePassword(currentPassword: string, newPassword: string) {
  const token = localStorage.getItem("authToken");

  const response = await fetch("/api/me/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}
```

## Storage Information

### Profile Photos

- **Development:** Saved to `public/uploads/avatars/`
- **Production:** Saved to AWS S3 bucket in `avatars/` folder
- **Naming:** UUID-based (e.g., `abc-123-def-456.jpg`)
- **Old photos:** Automatically deleted when uploading new one

### File URLs

**Development:**
```
/uploads/avatars/abc-123.jpg
```

**Production:**
```
https://your-bucket.s3.us-east-1.amazonaws.com/avatars/abc-123.jpg
```

## Security Notes

1. **Authentication Required:** All endpoints require valid JWT token
2. **File Validation:** Server-side validation for file type and size
3. **Password Hashing:** Passwords are hashed using bcrypt before storage
4. **Current Password Verification:** Must provide correct current password to change
5. **Automatic Cleanup:** Old profile photos are deleted when uploading new ones

## Rate Limiting

Consider implementing rate limiting for these endpoints:
- Photo uploads: 10 per hour
- Password changes: 5 per hour

## Related Files

- **API Routes:**
  - `src/app/api/me/route.ts` - Get profile
  - `src/app/api/me/photo/route.ts` - Upload photo
  - `src/app/api/me/password/route.ts` - Change password

- **Components:**
  - `src/components/Settings/AccountProfile.tsx` - Profile management UI

- **Storage:**
  - `src/lib/storage.ts` - Hybrid storage abstraction
  - `src/lib/storage-local.ts` - Local file storage
  - `src/lib/s3.ts` - AWS S3 storage

## Testing

### Test Photo Upload (curl)

```bash
curl -X POST http://localhost:3000/api/me/photo \
  -H "Authorization: Bearer <your-token>" \
  -F "photo=@/path/to/image.jpg"
```

### Test Password Change (curl)

```bash
curl -X PATCH http://localhost:3000/api/me/password \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "oldpass",
    "newPassword": "newpass123"
  }'
```

---

**Last Updated:** 2024
**Version:** 1.0