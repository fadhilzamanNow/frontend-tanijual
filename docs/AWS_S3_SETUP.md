# AWS S3 Setup Guide

This guide will help you set up AWS S3 for image uploads in the TaniJual application.

## 1. Create an AWS Account

1. Go to [AWS](https://aws.amazon.com/) and sign up for an account if you don't have one
2. Sign in to the AWS Management Console

## 2. Create an S3 Bucket

1. Navigate to **S3** service in the AWS Console
2. Click **Create bucket**
3. Configure your bucket:
   - **Bucket name**: Choose a unique name (e.g., `tanijual-images`)
   - **AWS Region**: Choose the region closest to your users (e.g., `us-east-1`, `ap-southeast-1`)
   - **Object Ownership**: Select "ACLs enabled" and "Bucket owner preferred"
   - **Block Public Access settings**: 
     - Uncheck "Block all public access" (if you want public images)
     - Acknowledge the warning
   - Leave other settings as default
4. Click **Create bucket**

## 3. Configure Bucket Policy (for Public Access)

If you want your images to be publicly accessible:

1. Go to your bucket
2. Click on the **Permissions** tab
3. Scroll down to **Bucket policy**
4. Click **Edit** and paste this policy (replace `YOUR_BUCKET_NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

5. Click **Save changes**

## 4. Create IAM User for Programmatic Access

1. Navigate to **IAM** service in the AWS Console
2. Click **Users** in the left sidebar
3. Click **Add users**
4. Configure the user:
   - **User name**: e.g., `tanijual-s3-user`
   - **Access type**: Select "Programmatic access"
5. Click **Next: Permissions**

## 5. Set User Permissions

1. Click **Attach existing policies directly**
2. Search for and select **AmazonS3FullAccess** (or create a custom policy with limited permissions)
3. Click **Next: Tags** (optional, skip if not needed)
4. Click **Next: Review**
5. Click **Create user**

### Alternative: Create Custom Policy (More Secure)

Instead of AmazonS3FullAccess, create a custom policy:

1. In IAM, go to **Policies** → **Create policy**
2. Click **JSON** tab and paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME"
    }
  ]
}
```

3. Name it (e.g., `TaniJualS3Policy`) and create it
4. Attach this policy to your IAM user

## 6. Save Your Credentials

After creating the IAM user, you'll see:
- **Access key ID**
- **Secret access key**

⚠️ **Important**: Copy these credentials immediately - you won't be able to see the secret key again!

## 7. Configure Environment Variables

Add these variables to your `.env.development` and `.env.production` files:

```env
# AWS S3 Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
AWS_S3_BUCKET_NAME=your_bucket_name_here
```

**Security Best Practice**: 
- Never commit these credentials to version control
- Add `.env*` files to your `.gitignore`
- Use AWS IAM roles for EC2/Lambda deployments instead of access keys when possible

## 8. Install Required Dependencies

The AWS SDK should be installed:

```bash
npm install @aws-sdk/client-s3 uuid
npm install --save-dev @types/uuid
```

## 9. Test Your Setup

1. Start your development server
2. Try uploading an image using the `ImageUpload` component
3. Check your S3 bucket to verify the image was uploaded

## Configuration Options

### Private Images (Presigned URLs)

If you want private images instead of public access:

1. Remove the bucket policy that allows public access
2. Update `src/lib/s3.ts` to remove the `ACL: "public-read"` parameter
3. Implement presigned URL generation for temporary access:

```typescript
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getPresignedUrl(key: string, expiresIn = 3600) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  
  const url = await getSignedUrl(s3Client, command, { expiresIn });
  return url;
}
```

### CloudFront CDN (Optional)

For better performance, set up CloudFront:

1. Navigate to **CloudFront** in AWS Console
2. Click **Create Distribution**
3. Set your S3 bucket as the origin
4. Configure caching and SSL settings
5. Update your URL generation in `s3.ts` to use CloudFront domain

## Usage Examples

### Upload Single Image

```typescript
import { uploadToS3 } from "@/lib/s3";

const result = await uploadToS3(buffer, "products");
console.log(result.url); // https://bucket.s3.region.amazonaws.com/products/uuid.jpg
```

### Delete Image

```typescript
import { deleteFromS3 } from "@/lib/s3";

await deleteFromS3("products/uuid.jpg");
```

### Upload Multiple Images

```typescript
import { uploadMultipleToS3 } from "@/lib/s3";

const results = await uploadMultipleToS3([buffer1, buffer2], "products");
```

## Troubleshooting

### Error: "Access Denied"
- Check that your IAM user has the correct permissions
- Verify your AWS credentials in `.env` file
- Ensure the bucket policy allows the necessary actions

### Error: "Bucket not found"
- Verify the bucket name in your `.env` file
- Check that you're using the correct AWS region
- Ensure the bucket exists in your AWS account

### Images not loading
- Check bucket CORS configuration if accessing from browser
- Verify the bucket policy allows public read access
- Check the URL format matches your bucket configuration

### CORS Issues

If you need to access images from your frontend, add CORS configuration:

1. Go to your S3 bucket
2. Click **Permissions** tab
3. Scroll to **Cross-origin resource sharing (CORS)**
4. Add this configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

## Cost Optimization

- **S3 Standard**: For frequently accessed images
- **S3 Intelligent-Tiering**: Automatically moves objects between access tiers
- **S3 Glacier**: For archived images (slow retrieval)
- **Lifecycle Policies**: Automatically transition or delete old objects

Set up lifecycle rules in your bucket's **Management** tab.

## Security Best Practices

1. **Never hardcode credentials** - Always use environment variables
2. **Use IAM roles** when deploying to AWS services (EC2, Lambda, etc.)
3. **Implement least privilege** - Only grant necessary permissions
4. **Enable bucket versioning** - Protects against accidental deletions
5. **Enable logging** - Track access to your bucket
6. **Encrypt data** - Enable server-side encryption (SSE-S3 or SSE-KMS)
7. **Regular audits** - Review IAM policies and bucket permissions regularly

## Migration from Cloudinary

Your existing upload endpoints will continue to work. The response format has changed slightly:
- `publicId` is now `key` (the S3 object key)
- URLs are now S3 URLs instead of Cloudinary URLs

Update your frontend code to use `key` instead of `publicId` for deletions.

---

**Need help?** Check the [AWS S3 documentation](https://docs.aws.amazon.com/s3/) or the troubleshooting section above.