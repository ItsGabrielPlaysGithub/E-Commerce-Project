# Product Detail Page - User Journey

## What Happens When a User Clicks a Product

### Step 1: User Clicks ProductCard
```
Location: /b2b/products/all (or any products listing page)
Action: User clicks on a ProductCard component
```

The ProductCard is a clickable link:
```tsx
<Link href={`/b2b/products/${product.id}`}>
  <ProductCard product={product} />
</Link>
```

### Step 2: Next.js Routing
```
Next.js routes to: /b2b/products/[id]
File loaded: src/app/(b2b)/b2b/products/[id]/page.tsx
```

The dynamic route parameter `[id]` captures the product ID from the URL.

### Step 3: ProductDetailPage Component
```tsx
export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  // Find product by ID from the products array
  const product = products.find((p) => p.id === productId);
  
  // Pass to container component
  return <ProductDetailContainer product={product} />;
}
```

### Step 4: ProductDetailContainer Initialization
```tsx
<ProductDetailContainer product={product} />
  ↓
  // Initialize state & hooks
  const { activeTab, setActiveTab } = usePricingTab();
  const { sapStock, loadingSAP, errorSAP } = useSAPStock(product?.id);
  
  ↓
  // Render complete layout
```

### Step 5: Component Rendering Order

#### Top Section
1. **ProductBreadcrumb** - Shows navigation path
   - Link to home, products, category, current product

2. **Two-Column Layout**
   - **Left Column:**
     - ProductImage - Shows product photo
   
   - **Right Column:**
     - ProductHeader - Title, badge, rating
     - ProductPricing - Tabs for retail/wholesale/bulk
     - ProductSAPStock - Live inventory from SAP
     - ProductActions - Order/Inquire buttons
     - ProductSpecs - List of features

#### Bottom Section
3. **ProductDescription** - About the product
4. **RelatedProducts** - Similar items in same category

### Step 6: User Interactions

#### Changing Pricing Tier
```
User clicks "wholesale" or "bulk" tab
  ↓
setActiveTab() updates activeTab state
  ↓
ProductPricing re-renders with new price
ProductActions updates button text
```

#### Placing Order
```
User clicks "Order Now" or "Request Quote"
  ↓
Routes to /b2b/inquiry page with product context
```

### Step 7: Data Flow

```
ProductDetailPage
    ↓
    params.id extracted
    ↓
    product found from products array
    ↓
ProductDetailContainer
    ├── usePricingTab() → manages activeTab state
    ├── useSAPStock(productId) → fetches from SAP backend
    └── Calculates relatedProducts
    ↓
Renders 9 sub-components with their respective data
```

## Component Dependencies

```
ProductDetailContainer (Main Orchestrator)
│
├─ ProductBreadcrumb
├─ ProductImage
├─ ProductHeader
├─ ProductPricing (uses: usePricingTab helpers)
├─ ProductSAPStock (displays: useSAPStock data)
├─ ProductActions (uses: activeTab state)
├─ ProductSpecs
├─ ProductDescription
└─ RelatedProducts
    └─ ProductCard (re-used for each related product)
```

## Data Sources

### Product Data
```
Source: /src/data/products.ts
Content: Static product array with all product info
Accessed: products.find(p => p.id === productId)
```

### SAP Inventory
```
Source: /src/lib/sap-service.ts
Content: Live stock information from SAP backend
Accessed: useSAPStock(productId) hook
Status: Loading → Success/Error
```

## State Management

### Active State
```tsx
const { activeTab, setActiveTab } = usePricingTab();
// activeTab: "retail" | "wholesale" | "bulk"
// Updated when user clicks pricing tabs
```

### SAP Stock State
```tsx
const { sapStock, loadingSAP, errorSAP } = useSAPStock(product?.id);
// sapStock: Inventory data from SAP
// loadingSAP: Boolean for loading state
// errorSAP: Error message if fetch fails
```

## Error Handling

### Missing Product
```
Product not found in array
  ↓
ProductDetailContainer shows:
  📦 icon
  "Product not found."
  ← Back to Products link
```

### SAP Backend Failure
```
SAP fetch fails
  ↓
ProductSAPStock shows error message
  or
  "Unable to load SAP data."
  (Page still functional, just no inventory data)
```

## Performance Optimizations

✅ Image lazy loading in ProductImage
✅ Memoized price calculations
✅ Separate SAP fetch hook (doesn't block initial render)
✅ Related products only fetch if product exists
✅ Component splitting reduces re-render scope

## URL Examples

```
/b2b/products/p1          → Product 1
/b2b/products/p123        → Product 123
/b2b/products/abc-xyz     → Any product with ID 'abc-xyz'
```

## Which Components Are Used

### Always Rendered
- ✅ ProductBreadcrumb
- ✅ ProductImage
- ✅ ProductHeader
- ✅ ProductPricing
- ✅ ProductActions

### Conditionally Rendered
- ✅ ProductSAPStock (always, but with loading/error states)
- ✅ ProductSpecs (if specs exist)
- ✅ ProductDescription (if description exists)
- ✅ RelatedProducts (if related products exist)

## Quick Reference: What Gets Displayed

| Component | Shows | Triggered By |
|-----------|-------|--------------|
| ProductBreadcrumb | Navigation path | Page load |
| ProductImage | Product photo | Page load |
| ProductHeader | Name, badge, rating | Page load |
| ProductPricing | Price tabs & pricing | Pricing tab click |
| ProductSAPStock | Live inventory | SAP API response |
| ProductActions | Order buttons | Page load |
| ProductSpecs | Features list | Page load |
| ProductDescription | About section | Page load |
| RelatedProducts | Similar products | Page load |
