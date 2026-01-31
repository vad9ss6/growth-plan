# February 2026 Sprint

**Goal:** Complete Docker Compose catch-up + CI Pipeline Setup  
**Project:** CMS React with TanStack Start  
**Framework:** TanStack Start (full-stack React framework)

---

## Week 1 (Feb 1-7): Docker Compose Catch-up + TanStack Start Init

### Saturday Feb 1
- [ ] Read docker-compose documentation
- [ ] Learn commands: `docker-compose up`, `down`, `logs`, `exec`
- [ ] Understand docker-compose.yml structure

### Sunday Feb 2
- [ ] Create docker-compose.yml for frontend dev environment
- [ ] Configure volume mounts for hot-reload
- [ ] Test hot-reload is working

### Monday Feb 3
- [ ] Add mock API service (json-server) for initial testing
- [ ] Learn service networking (services communicate by name)
- [ ] Test API calls between services

### Tuesday Feb 4
- [ ] Initialize CMS with TanStack Start:
  ```bash
  cd projects/cms-react
  npx create-tanstack-app@latest . --template start-basic-react-query
  ```
- [ ] Explore generated project structure
- [ ] Understand TanStack Router file-based routing

### Wednesday Feb 5
- [ ] Create multi-stage Dockerfile for TanStack Start
- [ ] Configure for Node.js server (TanStack Start needs Node runtime)
- [ ] Create .dockerignore file
- [ ] Test production build: `npm run build && npm run start`

### Thursday Feb 6
- [ ] Add docker-compose.yml to CMS project
- [ ] Configure development environment with hot-reload
- [ ] Test full Docker setup with `docker-compose up`

### Friday Feb 7
- [ ] Update README with setup instructions
- [ ] Document all Docker commands
- [ ] Complete weekly review

---

## Week 2 (Feb 8-14): GitHub Actions + TanStack Router Deep Dive

### Saturday Feb 8
- [ ] Study GitHub Actions basics (workflows, jobs, steps)
- [ ] Read official documentation
- [ ] Study TanStack Router concepts (loaders, file-based routing)

### Sunday Feb 9
- [ ] Create `.github/workflows/` folder in CMS project
- [ ] Create basic CI workflow file
- [ ] Add first route: `/posts` with loader

### Monday Feb 10
- [ ] Add lint job to workflow
- [ ] Configure ESLint for TanStack Start
- [ ] Test workflow runs on push

### Tuesday Feb 11
- [ ] Add TypeScript type-check job
- [ ] Configure strict TypeScript settings
- [ ] Fix any type errors (TanStack is very type-safe)

### Wednesday Feb 12
- [ ] Add build job to workflow
- [ ] Verify build succeeds in CI
- [ ] Learn about job dependencies

### Thursday Feb 13
- [ ] Configure caching for node_modules
- [ ] Optimize workflow speed
- [ ] Learn about artifacts

### Friday Feb 14
- [ ] Test full CI pipeline
- [ ] Document CI workflow
- [ ] Complete weekly review

---

## Week 3 (Feb 15-21): Testing Setup

### Saturday Feb 15
- [ ] Study Vitest fundamentals
- [ ] Install Vitest in CMS project
- [ ] Configure vitest.config.ts for TanStack Start

### Sunday Feb 16
- [ ] Write first unit test
- [ ] Learn testing patterns (arrange-act-assert)
- [ ] Test a utility function in `app/lib/`

### Monday Feb 17
- [ ] Install React Testing Library
- [ ] Learn component testing basics
- [ ] Write first component test

### Tuesday Feb 18
- [ ] Test a form component
- [ ] Learn user-event library
- [ ] Practice async testing with loaders

### Wednesday Feb 19
- [ ] Add test job to CI workflow
- [ ] Configure test coverage
- [ ] Set coverage thresholds

### Thursday Feb 20
- [ ] Study Playwright basics
- [ ] Install Playwright
- [ ] Write first E2E test

### Friday Feb 21
- [ ] Add E2E tests to CI (optional)
- [ ] Document testing approach
- [ ] Complete weekly review

---

## Week 4 (Feb 22-28): CMS Features + Documentation

### Saturday Feb 22
- [ ] Review all Docker setup
- [ ] Ensure everything works from clean clone
- [ ] Fix any setup issues

### Sunday Feb 23
- [ ] Write comprehensive README
- [ ] Add setup instructions
- [ ] Add troubleshooting section

### Monday Feb 24
- [ ] Create CONTRIBUTING.md
- [ ] Document code style guidelines
- [ ] Add PR template

### Tuesday Feb 25
- [ ] Create `/posts` route with SSG (static list)
- [ ] Add TanStack Query for data fetching
- [ ] Create mock data for posts

### Wednesday Feb 26
- [ ] Create `/posts/$postId` route with SSR
- [ ] Implement loader for dynamic post fetching
- [ ] Add error handling with error boundaries

### Thursday Feb 27
- [ ] Add `/dashboard` route (client-side only)
- [ ] Style with Tailwind CSS
- [ ] Ensure responsive design

### Friday Feb 28
- [ ] Write February monthly reflection
- [ ] Update main growth_plan_2026.md
- [ ] Plan March priorities

---

## February Deliverables Checklist

- [ ] Working docker-compose.yml with hot-reload
- [ ] Multi-stage Dockerfile for TanStack Start production
- [ ] GitHub Actions CI pipeline (lint, typecheck, build, test)
- [ ] Vitest unit tests setup
- [ ] Basic Playwright E2E test
- [ ] Comprehensive README
- [ ] CMS with basic routes:
  - [ ] `/` - Home page
  - [ ] `/posts` - Posts list (SSG)
  - [ ] `/posts/:id` - Post detail (SSR)
  - [ ] `/dashboard` - Dashboard (CSR)

---

## TanStack Start Quick Reference

### Create Route
```tsx
// app/routes/posts/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/')({
  loader: async () => {
    // Runs on server
    return await fetchPosts()
  },
  component: PostsPage,
})

function PostsPage() {
  const posts = Route.useLoaderData()
  return <PostList posts={posts} />
}
```

### Server Function
```tsx
import { createServerFn } from '@tanstack/react-start'

export const createPost = createServerFn('POST', async (data: PostInput) => {
  // Runs only on server
  return await db.posts.create({ data })
})
```

### Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
```

---

## Notes & Learnings

_Add notes here as you learn new things throughout the month._
