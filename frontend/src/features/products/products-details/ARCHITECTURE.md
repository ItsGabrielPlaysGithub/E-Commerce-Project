# Product Detail Page Architecture

## Overview
Refactored product detail page with separated concerns, reusable components, and custom hooks.

## File Structure

```
products-details/
├── hooks/
│   ├── usePricingTab.ts          # Pricing tab logic & calculations
│   └── useSAPStock.ts            # SAP inventory data fetching
├── components/
│   ├── ProductBreadcrumb.tsx     # Navigation breadcrumb
│   ├── ProductImage.tsx          # Product image display
│   ├── ProductHeader.tsx         # Title, badge, rating
│   ├── ProductPricing.tsx        # Price tabs & pricing display
│   ├── ProductSAPStock.tsx       # SAP inventory widget
│   ├── ProductActions.tsx        # CTA buttons & delivery info
│   ├── ProductSpecs.tsx          # Product specifications list
│   ├── ProductDescription.tsx    # About section
│   ├── RelatedProducts.tsx       # Related products grid
│   └── ProductDetailContainer.tsx # Main container component
```

## Usage Flow

### 1. **ProductCard Click**
```
User clicks ProductCard → Next.js routes to /b2b/products/[id]
```

### 2. **Page Load**
```
ProductDetailPage loads
  → Extracts product ID from URL params
  → Finds product from products array
  → Passes to ProductDetailContainer
```

### 3. **ProductDetailContainer**
The main orchestrator component that:
- Manages pricing tab state via `usePricingTab()`
- Fetches SAP stock via `useSAPStock()`
- Calculates related products
- Composes all sub-components

```tsx
<ProductDetailContainer product={product} />
  ├── ProductBreadcrumb
  ├── ProductImage
  ├── ProductHeader
  ├── ProductPricing
  ├── ProductSAPStock
  ├── ProductActions
  ├── ProductSpecs
  ├── ProductDescription
  └── RelatedProducts
```

## Component Breakdown

### **ProductBreadcrumb**
- Displays navigation path to current product
- Links to home, products list, and category

### **ProductImage**
- Displays main product image
- Lazy loading enabled

### **ProductHeader**
- Product name & badge
- SKU and category
- Star rating with review count

### **ProductPricing**
- Three pricing tiers: Retail, Wholesale, Bulk
- Dynamic tabs that change price display
- Shows savings percentage
- Displays minimum order quantities

### **ProductSAPStock**
- Connects to SAP backend for live inventory
- Shows available, in-transit, and blocked stock
- Loading and error states

### **ProductActions**
- "Order Now" / "Request Quote" buttons (context-aware)
- "Inquire" secondary button
- Delivery information

### **ProductSpecs**
- Bulleted list of product specifications
- Easy to extend for additional specs

### **ProductDescription**
- Full product description
- Optional if description doesn't exist

### **RelatedProducts**
- Shows 4 related products from same category
- Uses ProductCard component
- Only visible if related products exist

## Custom Hooks

### **usePricingTab()**
```tsx
const { activeTab, setActiveTab } = usePricingTab();
// activeTab: "retail" | "wholesale" | "bulk"
// Helper functions for price/savings calculations
```

### **useSAPStock(sapMaterialNo)**
```tsx
const { sapStock, loadingSAP, errorSAP } = useSAPStock(productId);
// sapStock: SAPMaterial | null
// loadingSAP: boolean
// errorSAP: string | null
```

## Key Features

✅ **Modular Components** - Each piece has a single responsibility
✅ **Reusable Hooks** - Logic can be used in other features
✅ **Error Handling** - Graceful error states for missing products & SAP failures
✅ **Loading States** - Skeleton loaders for async data
✅ **Responsive Design** - Works on mobile, tablet, and desktop
✅ **Type Safe** - Full TypeScript support
✅ **Next.js Compatible** - Uses Next.js routing and conventions

## How to Use

### Display a product detail page:
```tsx
// In ProductCard or any list item
<Link href={`/b2b/products/${product.id}`}>
  <ProductCard product={product} />
</Link>
```

### Access the product detail:
```tsx
// In the page component
const params = useParams();
const productId = params.id;
const product = products.find(p => p.id === productId);
```

## Future Enhancements

- [ ] Add product reviews section
- [ ] Add image gallery/carousel
- [ ] Add video demo section
- [ ] Add customer testimonials
- [ ] Add comparison with similar products
- [ ] Add stock level indicators (Low stock, In stock, Out of stock)
- [ ] Add variant selection (colors, sizes)
- [ ] Add wishlist/save functionality
- [ ] Add share buttons
