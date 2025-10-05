# Product Card Component Documentation

## Overview

The `ProductCard` component is a reusable Next.js component that displays product information in a card format with images, pricing, stock information, and a link to the product detail page.

## Locations

### Product Card Component
```
src/components/ProductCard.tsx
```

### Product Detail Page
```
src/app/(public)/products/[productId]/page.tsx
```

### Product Image Carousel
```
src/components/Carousel/ProductImageCarousel.tsx
```

## Features

- **Product Images**: Displays the first product image or a placeholder if no image is available
- **Image Error Handling**: Automatically falls back to placeholder on image load errors
- **Next.js Image Optimization**: Uses Next.js `Image` component for automatic optimization
- **Responsive Design**: Adapts to different screen sizes using Tailwind CSS
- **Product Information**: Shows product name, price, stock, and creation date
- **Hover Effects**: Smooth transitions and hover states for better UX
- **Indonesian Currency Formatting**: Displays prices in IDR format

## Usage

### Basic Example

```tsx
import ProductCard from "@/components/ProductCard";

function ProductList({ products }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
}
```

### In the Homepage

```tsx
// src/app/(public)/page.tsx
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
}
```

## Props

### `data` (Required)

An object containing product information:

```typescript
type ProductCardProps = {
  data: {
    id: string;              // Unique product identifier
    name: string;            // Product name
    price: number | string;  // Product price
    quantity: number;        // Stock quantity
    createdAt: string;       // ISO date string
    images?: Array<{         // Optional array of product images
      id: string;
      imageUrl: string;
      productId: string;
    }>;
  };
};
```

## Component Structure

```
┌─────────────────────────────┐
│      Product Image          │  ← First image or placeholder (170px height)
├─────────────────────────────┤
│  Product Name (2 lines max) │  ← Truncated with ellipsis
│  Added: [Date]              │  ← Creation date in Indonesian format
│                             │
│  ─────────────────────────  │  ← Divider
│  Price:      Rp XXX,XXX     │  ← Formatted Indonesian currency
│  Stock:      XXX unit       │  ← Available quantity
└─────────────────────────────┘
```

## Styling Details

### Layout
- Full height flex column layout
- Rounded corners with border
- Shadow effects (increased on hover)
- Overflow hidden for clean image display

### Image Container
- Fixed height: 170px
- Object-fit: cover (maintains aspect ratio)
- Gray background while loading
- Responsive sizing with Next.js Image

### Content Area
- 16px padding
- Flex-grow content section
- Auto margin-top pushes price/stock to bottom
- 2-line name truncation

### Hover Effects
- Border color changes from slate-200 to slate-300
- Shadow increases from 2xl to md
- Product name color changes to emerald-600

## Image Configuration

### Next.js Config

The following domains are configured in `next.config.ts` for external images:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "via.placeholder.com", // Placeholder images
    },
    {
      protocol: "https",
      hostname: "**.supabase.co",      // Supabase storage
    },
    {
      protocol: "https",
      hostname: "res.cloudinary.com",  // Cloudinary CDN
    },
  ],
}
```

### Fallback Behavior

1. **First Attempt**: Load the first image from `data.images[0].imageUrl`
2. **No Images**: Use placeholder URL
3. **Load Error**: Switch to placeholder using `onError` handler

## Data Requirements

### API Response Format

The component expects product data from `/api/products` endpoint:

```json
{
  "id": "abc123",
  "name": "Fresh Tomatoes",
  "price": 25000,
  "quantity": 100,
  "createdAt": "2024-01-15T10:30:00Z",
  "images": [
    {
      "id": "img1",
      "imageUrl": "https://storage.supabase.co/...",
      "productId": "abc123"
    }
  ]
}
```

### Database Schema

The component works with the following Prisma schema:

```prisma
model Product {
  id        String         @id @default(cuid())
  name      String
  price     Decimal        @db.Decimal(10, 2)
  quantity  Int
  createdAt DateTime       @default(now())
  images    ProductImage[]
}

model ProductImage {
  id        String   @id @default(cuid())
  imageUrl  String
  productId String
  product   Product  @relation(fields: [productId], references: [id])
}
```

## Responsive Breakpoints

- **Mobile (default)**: 1 column
- **Small (sm: 640px+)**: 2 columns
- **Large (lg: 1024px+)**: 3 columns

```tsx
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {/* Cards here */}
</div>
```

## Performance Considerations

### Image Optimization
- Uses Next.js `Image` component for automatic optimization
- Responsive sizes: `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`
- Lazy loading by default

### Error Handling
- State management for image errors prevents infinite reload loops
- Graceful fallback to placeholder images

### Link Prefetching
- Next.js Link component prefetches product detail pages on hover
- Improves perceived performance

## Accessibility

- Semantic HTML with proper heading hierarchy
- Alt text for images includes product name
- Keyboard navigable (Link component)
- Color contrast meets WCAG standards

## Related Components

### ProductImageCarousel
Used on product detail pages to display multiple product images in a carousel format.

**Location**: `src/components/Carousel/ProductImageCarousel.tsx`

**Features**:
- Auto-playing carousel with navigation
- Pagination dots
- Supports multiple images
- Fallback for no images (shows placeholder)
- Single image optimization (no carousel if only 1 image)

**Usage on Product Detail Page**:
```tsx
import ProductImageCarousel from "@/components/Carousel/ProductImageCarousel";

<ProductImageCarousel
  images={product.images || []}
  productName={product.name}
/>
```

**Product Detail Page Layout**:
- Image carousel displayed at the top (full width)
- Product information and pricing below in a grid layout
- Responsive: stacks on mobile, side-by-side on large screens

### HomeCarousel
Used for homepage banner carousel.

**Location**: `src/components/Carousel/HomeCarousel.tsx`

## Migration Notes

### From Inline Cards

The homepage previously used inline product cards. The migration involved:

1. **Created** `ProductCard.tsx` component
2. **Removed** inline card implementation from `page.tsx`
3. **Updated** product type definition to include images
4. **Configured** Next.js to allow external image domains
5. **Maintained** existing styling and functionality

### Differences from React Router Version

The original `ProductCard.jsx` (in `src/components/Route/ProductCard/`) uses:
- React Router (Link, useNavigate)
- Redux for state management
- Wishlist and cart functionality
- Quick view modal

The new Next.js version:
- Uses Next.js Link and routing
- No Redux dependency (simpler)
- Focused on display only
- Compatible with Next.js App Router

## Product Detail Page Implementation

The product detail page now displays all product images using the `ProductImageCarousel` component.

### Layout Structure

```
┌─────────────────────────────────────┐
│   Product Image Carousel (300px)   │ ← Full width, auto-playing
│   [< Prev]  • • • •  [Next >]      │ ← Navigation & pagination
└─────────────────────────────────────┘

┌──────────────────────┬──────────────┐
│  Product Details     │  Price Card  │
│  • Badge             │  • Price     │
│  • Name              │  • Stock     │
│  • Description       │  • Save btn  │
└──────────────────────┴──────────────┘
```

### Features

✅ **Multiple Images**: Displays all product images in a carousel  
✅ **Auto-play**: Images rotate automatically every 3 seconds  
✅ **Navigation**: Arrow buttons and pagination dots  
✅ **Responsive**: Adapts to all screen sizes  
✅ **Fallback**: Shows placeholder if no images available  
✅ **Optimized**: Single image shows without carousel overhead  

### Data Flow

1. **API Call**: `/api/products/[productId]` returns product with images
2. **Type Definition**: Product type includes `images` array
3. **Carousel Component**: Receives images and product name
4. **Display**: Shows carousel if multiple images, single image if one, placeholder if none

### Example Response

```json
{
  "id": "abc123",
  "name": "Fresh Tomatoes",
  "description": "Organic fresh tomatoes",
  "price": 25000,
  "quantity": 100,
  "sellerId": "seller123",
  "images": [
    {
      "id": "img1",
      "imageUrl": "https://storage.supabase.co/image1.jpg",
      "order": 0
    },
    {
      "id": "img2",
      "imageUrl": "https://storage.supabase.co/image2.jpg",
      "order": 1
    }
  ]
}
```

## Future Enhancements

### Product Card
Potential improvements:

1. **Wishlist Integration**: Add wishlist toggle button
2. **Quick View**: Modal for quick product preview
3. **Add to Cart**: Direct cart addition from card
4. **Ratings Display**: Show product ratings/reviews
5. **Sale Badge**: Highlight discounted products
6. **Stock Warning**: Visual indicator for low stock
7. **Skeleton Loading**: Loading state placeholder
8. **Image Zoom**: Click to zoom on product detail page
9. **Image Thumbnails**: Show thumbnail navigation below main carousel
10. **Video Support**: Support for product videos in carousel

## Testing

### Manual Testing Checklist

**Product Card**:
- [ ] Product image displays correctly
- [ ] Placeholder shows when no image
- [ ] Error fallback works on broken images
- [ ] Price formats correctly in IDR
- [ ] Date displays in Indonesian format
- [ ] Link navigates to correct product page
- [ ] Hover effects work smoothly
- [ ] Responsive at all breakpoints
- [ ] Truncation works for long names

**Product Detail Page**:
- [ ] Image carousel displays all product images
- [ ] Auto-play works (3 second intervals)
- [ ] Navigation arrows work correctly
- [ ] Pagination dots are clickable
- [ ] Single image shows without carousel
- [ ] Placeholder shows when no images
- [ ] Carousel is responsive on all devices
- [ ] Images maintain aspect ratio (300px height)

### Test Cases

```typescript
// Test with no images
<ProductCard data={{ ...product, images: [] }} />

// Test with broken image
<ProductCard data={{ 
  ...product, 
  images: [{ id: '1', imageUrl: 'invalid-url', productId: '1' }] 
}} />

// Test with long name
<ProductCard data={{ 
  ...product, 
  name: 'Very Long Product Name That Should Be Truncated After Two Lines' 
}} />
```

## Troubleshooting

### Images Not Loading

1. **Check Next.js Config**: Ensure domain is in `remotePatterns`
2. **Verify Image URL**: Check browser console for 404 errors
3. **Restart Dev Server**: Changes to `next.config.ts` require restart

### Styling Issues

1. **Tailwind Not Applied**: Ensure `tailwind.config.ts` includes component path
2. **Responsive Not Working**: Check viewport meta tag in layout
3. **Hover Not Smooth**: Verify transition classes are present

### Type Errors

1. **Image Type Mismatch**: Ensure API includes images in response
2. **Price Type**: Component accepts both string and number
3. **Missing Fields**: All required fields must be present in data prop

## Summary

### Product Card
- ✅ Displays first product image or placeholder
- ✅ Used on homepage and product listing pages
- ✅ Links to product detail page
- ✅ Responsive grid layout

### Product Detail Page
- ✅ Displays all product images in carousel
- ✅ Auto-playing with navigation controls
- ✅ Full product information and pricing
- ✅ Save product functionality

### Image Flow
```
Database → API (includes images) → Component → User sees images
```

## Support

For issues or questions:
1. Check the conversation summary in the parent thread
2. Review related documentation: `PRODUCT_IMAGES_MIGRATION.md`
3. Verify API endpoint includes images in response
4. Check Swiper.js is installed: `npm list swiper`
5. Ensure carousel CSS is loaded properly