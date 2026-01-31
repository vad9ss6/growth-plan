# Q2 (April - June): Architecture & Performance - Detailed Plan

By the end of Q2, you'll have a deep understanding of rendering strategies, performance optimization, and resilient error handling patterns for modern web applications.

---

## April: Rendering Strategies Deep Dive

### Learning Goals

- Understand CSR, SSR, SSG, and ISR trade-offs
- Know when to use each rendering strategy
- Implement practical examples of each approach

---

### Week 1: Client-Side Rendering (CSR) Fundamentals (Days 1-7)

**Day 1-2: Theory**

- [ ] Review how traditional SPAs work (React/Vue default behavior)
- [ ] Understand the CSR lifecycle: blank HTML → JS download → hydration → interactive
- [ ] Learn pros: rich interactivity, simpler hosting, great for dashboards
- [ ] Learn cons: poor initial load, SEO challenges, no content until JS loads

**Day 3-4: Hands-On CSR**

- [ ] Create a simple Vite + React app (pure CSR)
- [ ] Measure performance with Lighthouse (note the metrics)
- [ ] Observe "flash of blank content" in slow network (DevTools throttling)

**Day 5-7: SEO and CSR Limitations**

- [ ] Test how search engines see your CSR app (View Page Source)
- [ ] Explore solutions: prerendering, dynamic rendering
- [ ] Document: "When CSR is the right choice"

### Week 1 Checkpoint

You should understand why CSR apps struggle with SEO and initial load performance.

---

### Week 2: Server-Side Rendering (SSR) (Days 8-14)

**Day 8-9: SSR Theory**

- [ ] Understand SSR flow: request → server renders HTML → send to client → hydration
- [ ] Learn pros: better SEO, faster First Contentful Paint, social sharing works
- [ ] Learn cons: server load, TTFB latency, complexity, hydration mismatches

**Day 10-12: Hands-On SSR with Next.js**

- [ ] Create Next.js app with `getServerSideProps`
- [ ] Build a page that fetches data on each request
- [ ] Compare Lighthouse scores with your CSR app

```tsx
// pages/products/[id].tsx - SSR Example
export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://api.example.com/products/${id}`);
  const product = await res.json();

  return {
    props: { product }, // Passed to page component
  };
}

export default function ProductPage({ product }) {
  return <div>{product.name}</div>;
}
```

**Day 13-14: SSR Challenges**

- [ ] Experience hydration mismatch errors (use `window` object incorrectly)
- [ ] Learn about `useEffect` for client-only code
- [ ] Document: "When SSR is the right choice"

### Week 2 Checkpoint

You should be able to implement SSR and explain hydration.

---

### Week 3: Static Site Generation (SSG) & ISR (Days 15-21)

**Day 15-16: SSG Theory**

- [ ] Understand SSG: pages built at build time, served as static files
- [ ] Learn pros: fastest possible load, CDN-friendly, no server needed
- [ ] Learn cons: rebuild needed for content changes, not for dynamic data

**Day 17-18: Hands-On SSG**

- [ ] Use `getStaticProps` and `getStaticPaths` in Next.js
- [ ] Build a blog with markdown files
- [ ] Deploy to Vercel/Netlify and observe CDN caching

```tsx
// pages/posts/[slug].tsx - SSG Example
export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false, // or 'blocking' for ISR
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  return { props: { post } };
}
```

**Day 19-21: Incremental Static Regeneration (ISR)**

- [ ] Understand ISR: SSG + background revalidation
- [ ] Implement `revalidate` option in `getStaticProps`
- [ ] Test stale-while-revalidate behavior
- [ ] Document: "When SSG/ISR is the right choice"

```tsx
export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: { data },
    revalidate: 60, // Regenerate page every 60 seconds
  };
}
```

### Week 3 Checkpoint

You should understand the full spectrum from SSG to ISR to SSR.

---

### Week 4: Comparison & Documentation (Days 22-30)

**Day 22-24: Build Comparison Demo**

- [ ] Create a single project with 4 routes demonstrating each strategy
- [ ] Measure and document performance metrics for each
- [ ] Create visual comparison chart

**Day 25-27: Decision Framework**

- [ ] Create flowchart: "Which rendering strategy should I use?"
- [ ] Consider: content freshness, personalization, SEO needs, infrastructure

**Day 28-30: Documentation**

- [ ] Write `docs/rendering-strategies.md` with your findings
- [ ] Include code examples and metrics
- [ ] Monthly reflection in `docs/monthly-progress/april.md`

---

### April Decision Framework

```
┌─────────────────────────────────────────────────────────────┐
│                 RENDERING STRATEGY DECISION                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Does the page need SEO?                                     │
│    └── NO → Is it highly interactive (dashboard)?            │
│              └── YES → CSR ✓                                 │
│    └── YES → Does content change per user/request?           │
│              └── YES → SSR ✓                                 │
│              └── NO → Does content change frequently?        │
│                       └── NO → SSG ✓                         │
│                       └── YES → ISR ✓ (with revalidate)      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### April Deliverables

- [ ] Demo app with all 4 rendering strategies
- [ ] Rendering strategy comparison document
- [ ] Decision flowchart

---

## May: Performance Optimization

### Learning Goals

- Master code splitting and lazy loading
- Understand and optimize Core Web Vitals
- Implement effective caching strategies

---

### Week 1: Core Web Vitals Deep Dive (Days 1-7)

**Day 1-2: Understanding the Metrics**

- [ ] Study LCP (Largest Contentful Paint) - target: < 2.5s
- [ ] Study FID/INP (First Input Delay/Interaction to Next Paint) - target: < 100ms
- [ ] Study CLS (Cumulative Layout Shift) - target: < 0.1
- [ ] Install Web Vitals library in your project

```bash
npm install web-vitals
```

```tsx
// Measure Core Web Vitals
import { onCLS, onFID, onLCP } from "web-vitals";

onCLS(console.log);
onFID(console.log);
onLCP(console.log);
```

**Day 3-4: Measuring Your App**

- [ ] Run Lighthouse audits on your Q2 project
- [ ] Use Chrome DevTools Performance panel
- [ ] Set up Real User Monitoring (RUM) with `web-vitals`
- [ ] Identify your worst metrics

**Day 5-7: LCP Optimization**

- [ ] Identify your LCP element (usually hero image/text)
- [ ] Implement `<link rel="preload">` for critical assets
- [ ] Optimize images: WebP/AVIF, responsive sizes, lazy loading
- [ ] Remove render-blocking resources

```html
<!-- Preload critical hero image -->
<link rel="preload" as="image" href="/hero.webp" />

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

### Week 1 Checkpoint

You should be able to measure and explain all Core Web Vitals.

---

### Week 2: Code Splitting & Lazy Loading (Days 8-14)

**Day 8-9: Route-Based Code Splitting**

- [ ] Understand how bundlers create chunks
- [ ] Implement `React.lazy()` for route components
- [ ] Add `Suspense` boundaries with loading states

```tsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load route components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Analytics = lazy(() => import("./pages/Analytics"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}
```

**Day 10-11: Component-Level Code Splitting**

- [ ] Identify heavy components (charts, editors, modals)
- [ ] Lazy load components that aren't immediately visible
- [ ] Implement intersection observer for below-fold content

```tsx
// Lazy load heavy components
const HeavyChart = lazy(() => import("./components/HeavyChart"));
const RichTextEditor = lazy(() => import("./components/RichTextEditor"));

// Use in component with Suspense
<Suspense fallback={<ChartSkeleton />}>
  <HeavyChart data={data} />
</Suspense>;
```

**Day 12-14: Bundle Analysis**

- [ ] Install and run bundle analyzer
- [ ] Identify large dependencies
- [ ] Replace heavy libraries with lighter alternatives
- [ ] Document before/after bundle sizes

```bash
# For Vite
npm install -D rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [visualizer({ open: true })]
}
```

### Week 2 Checkpoint

You should have reduced your main bundle by at least 30%.

---

### Week 3: Caching Strategies (Days 15-21)

**Day 15-16: Browser Caching**

- [ ] Understand Cache-Control headers
- [ ] Learn caching strategies: no-cache, max-age, immutable
- [ ] Implement content hashing in filenames

```
# Static assets (hashed filenames) - cache forever
Cache-Control: public, max-age=31536000, immutable

# HTML files - always revalidate
Cache-Control: no-cache

# API responses - short cache with revalidation
Cache-Control: public, max-age=60, stale-while-revalidate=300
```

**Day 17-18: Service Worker Caching**

- [ ] Study Service Worker basics
- [ ] Implement Workbox for asset caching
- [ ] Create offline fallback page

**Day 19-21: Data Caching**

- [ ] Implement client-side data caching (TanStack Query preview)
- [ ] Understand stale-while-revalidate pattern
- [ ] Set up proper cache invalidation

### Week 3 Checkpoint

You should understand the full caching stack from browser to CDN to service worker.

---

### Week 4: Image & Font Optimization (Days 22-31)

**Day 22-24: Image Optimization**

- [ ] Convert images to WebP/AVIF formats
- [ ] Implement responsive images with `srcset`
- [ ] Add lazy loading with `loading="lazy"`
- [ ] Use blur placeholder technique

```tsx
// Next.js Image (or similar for other frameworks)
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // For LCP images
  placeholder="blur"
  blurDataURL={blurHash}
/>

// Native HTML responsive images
<img
  srcset="hero-400.webp 400w,
          hero-800.webp 800w,
          hero-1200.webp 1200w"
  sizes="(max-width: 600px) 400px,
         (max-width: 1000px) 800px,
         1200px"
  src="hero-800.webp"
  alt="Hero"
  loading="lazy"
/>
```

**Day 25-27: Font Optimization**

- [ ] Use `font-display: swap` to prevent FOIT
- [ ] Subset fonts to include only needed characters
- [ ] Self-host fonts instead of Google Fonts (for performance)
- [ ] Preload critical fonts

```css
@font-face {
  font-family: "CustomFont";
  src: url("/fonts/custom.woff2") format("woff2");
  font-display: swap;
}
```

```html
<link
  rel="preload"
  href="/fonts/custom.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

**Day 28-31: Performance Budget & Monitoring**

- [ ] Set up performance budget (e.g., < 200KB JS, LCP < 2s)
- [ ] Add Lighthouse CI to your pipeline
- [ ] Create performance monitoring dashboard
- [ ] Monthly reflection in `docs/monthly-progress/may.md`

### May Deliverables

- [ ] Performance-optimized version of your app
- [ ] Before/after Lighthouse scores documented
- [ ] Performance budget configuration
- [ ] Bundle analysis report

---

## June: API Patterns & Error Handling

### Learning Goals

- Master modern data fetching patterns
- Build resilient error handling systems
- Implement offline-capable applications

---

### Week 1: Data Fetching Patterns (Days 1-7)

**Day 1-2: The Problem with useEffect + fetch**

- [ ] Understand common pitfalls: race conditions, no caching, loading states
- [ ] Experience the pain firsthand with a naive implementation
- [ ] Learn why data fetching libraries exist

```tsx
// ❌ Problematic pattern
useEffect(() => {
  fetch("/api/data")
    .then((res) => res.json())
    .then(setData);
}, []); // Race conditions, no error handling, no caching
```

**Day 3-5: TanStack Query (React Query)**

- [ ] Install and configure TanStack Query
- [ ] Learn `useQuery` for fetching data
- [ ] Learn `useMutation` for updating data
- [ ] Understand automatic caching and background refetching

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetching data
function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch("/api/products").then((res) => res.json()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;
  return <ProductGrid products={data} />;
}

// Mutating data
function AddProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newProduct) =>
      fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return <form onSubmit={() => mutation.mutate(formData)}>...</form>;
}
```

**Day 6-7: Advanced Patterns**

- [ ] Implement optimistic updates
- [ ] Learn prefetching for better UX
- [ ] Set up query invalidation strategies

### Week 1 Checkpoint

You should be comfortable with TanStack Query for all data operations.

---

### Week 2: Error Boundaries & Fallbacks (Days 8-14)

**Day 8-9: React Error Boundaries**

- [ ] Understand error boundary concept
- [ ] Create reusable ErrorBoundary component
- [ ] Learn what errors boundaries catch (and don't catch)

```tsx
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary fallback={<ErrorFallback />}>
  <RiskyComponent />
</ErrorBoundary>;
```

**Day 10-11: Granular Error Boundaries**

- [ ] Place error boundaries strategically (route-level, feature-level)
- [ ] Create different fallback UIs for different contexts
- [ ] Implement "retry" functionality

```tsx
// Route-level boundary
<ErrorBoundary fallback={<FullPageError />}>
  <Routes>...</Routes>
</ErrorBoundary>

// Feature-level boundary
<ErrorBoundary fallback={<WidgetError />}>
  <DashboardWidget />
</ErrorBoundary>
```

**Day 12-14: Skeleton Loading States**

- [ ] Design loading skeletons that match content layout
- [ ] Prevent layout shift with proper sizing
- [ ] Implement streaming/suspense patterns

```tsx
// Skeleton component
function ProductSkeleton() {
  return (
    <div className="product-card">
      <div className="skeleton skeleton-image" />
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-price" />
    </div>
  );
}
```

```css
/* CSS */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

### Week 2 Checkpoint

You should have a comprehensive error handling strategy.

---

### Week 3: Retry Logic & Resilience (Days 15-21)

**Day 15-16: Automatic Retry with Backoff**

- [ ] Understand exponential backoff
- [ ] Configure retry in TanStack Query
- [ ] Handle transient vs permanent errors differently

```tsx
const { data } = useQuery({
  queryKey: ["data"],
  queryFn: fetchData,
  retry: 3, // Retry failed requests 3 times
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
});
```

**Day 17-18: Timeout Handling**

- [ ] Implement request timeouts
- [ ] Show appropriate UI during long requests
- [ ] Allow users to cancel pending requests

```tsx
// AbortController for cancellation
const controller = new AbortController();

fetch("/api/data", { signal: controller.signal }).catch((err) => {
  if (err.name === "AbortError") {
    console.log("Request was cancelled");
  }
});

// Cancel after timeout
setTimeout(() => controller.abort(), 5000);
```

**Day 19-21: Circuit Breaker Pattern**

- [ ] Understand circuit breaker concept
- [ ] Implement basic circuit breaker for failing APIs
- [ ] Show degraded UI when services are down

### Week 3 Checkpoint

You should handle network failures gracefully.

---

### Week 4: Offline Support & Final Integration (Days 22-30)

**Day 22-24: Offline Detection**

- [ ] Use `navigator.onLine` and online/offline events
- [ ] Show offline indicator in UI
- [ ] Queue actions for when back online

```tsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
```

**Day 25-27: Offline Data Persistence**

- [ ] Use IndexedDB for offline data storage
- [ ] Sync queued mutations when back online
- [ ] Handle conflict resolution

**Day 28-30: Final Integration & Documentation**

- [ ] Combine all patterns into your project
- [ ] Create error handling documentation
- [ ] Write monthly reflection in `docs/monthly-progress/june.md`

---

### June Deliverables

- [ ] App with TanStack Query integration
- [ ] Comprehensive error boundary system
- [ ] Offline indicator and basic offline support
- [ ] API patterns documentation

---

## Q2 Project Structure

By end of June, your `projects/02-architecture-performance/` should contain:

```
02-architecture-performance/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.tsx
│   │   ├── Skeleton/
│   │   └── OfflineIndicator.tsx
│   ├── hooks/
│   │   ├── useOnlineStatus.ts
│   │   └── queries/
│   ├── pages/
│   │   ├── csr-demo/
│   │   ├── ssr-demo/
│   │   ├── ssg-demo/
│   │   └── isr-demo/
│   └── lib/
│       └── queryClient.ts
├── docs/
│   ├── rendering-strategies.md
│   ├── performance-report.md
│   └── error-handling-guide.md
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Success Criteria

At the end of Q2, you should be able to answer YES to all:

- [ ] Can you explain CSR vs SSR vs SSG vs ISR to a colleague?
- [ ] Can you achieve a Lighthouse performance score > 90?
- [ ] Do you know your app's Core Web Vitals metrics?
- [ ] Can you implement TanStack Query from scratch?
- [ ] Does your app handle errors gracefully at every level?
- [ ] Can you explain your caching strategy?

---

## Recommended Resources

### Documentation

- [Next.js Data Fetching](https://nextjs.org/docs/basic-features/data-fetching)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)

### Tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [Bundle Analyzer](https://www.npmjs.com/package/rollup-plugin-visualizer)

### Video Courses

- Web Performance Fundamentals (Frontend Masters)
- React Query/TanStack Query courses (any platform)

---

## Commands Cheat Sheet

### Performance Testing

```bash
# Run Lighthouse in CLI
npx lighthouse https://localhost:3000 --view

# Analyze bundle size
npx vite-bundle-visualizer

# Check Core Web Vitals in Chrome
# DevTools → Lighthouse → Generate Report
```

### TanStack Query

```bash
# Install
npm install @tanstack/react-query

# DevTools (optional but recommended)
npm install @tanstack/react-query-devtools
```
