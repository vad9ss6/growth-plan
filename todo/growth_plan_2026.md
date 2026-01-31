# Vadim Nesterovich - 2026 Growth Study Plan

A structured 12-month learning journey with hands-on projects aligned to your growth focus areas.

---

## Repository Structure

```
growth_plan_2026/
├── todo/                              # Detailed monthly/quarterly plans
│   ├── growth_plan_2026.md            # This file - main roadmap
│   ├── january_docker_fundamentals.md # January detailed plan
│   └── q2_architecture_performance.md # Q2 detailed plan
├── backlog/                           # Daily progress tracking
│   ├── daily-log.md                   # Quick daily entries
│   ├── february-sprint.md             # Current month tasks
│   └── weekly-review.md               # Weekly reflection
├── projects/
│   └── cms-react/                     # Unified CMS project (evolves all year)
├── docs/
│   ├── monthly-progress/              # Monthly reflection logs
│   └── learning-notes/                # Notes from courses, articles, videos
└── resources/
    └── bookmarks.md                   # Curated learning resources
```

> **Daily Tracking:** See [backlog/daily-log.md](../backlog/daily-log.md) for daily progress  
> **Current Sprint:** See [backlog/february-sprint.md](../backlog/february-sprint.md) for this month's tasks

---

## Timeline Overview

### Gantt Chart

```
2026 Growth Plan Timeline

Q1 (Jan-Mar): CI/CD & Local Environment Ownership
  ├── January:   Docker Fundamentals
  ├── February:  CI Pipeline Setup
  └── March:     Testing Integration

Q2 (Apr-Jun): Architecture & Performance
  ├── April:     Rendering Strategies
  ├── May:       Performance Optimization
  └── June:      Error Handling & Resilience

Q3 (Jul-Sep): Framework Comparison (React vs Vue)
  ├── July:      React CMS Build
  ├── August:    Vue CMS Build
  └── September: Analysis Document

Q4 (Oct-Dec): AI-Driven Development
  ├── October:   AI Tools Integration
  ├── November:  AI Features Building
  └── December:  Lunch & Learn Prep
```

---

## Phase 1: CI/CD and Local Environment Ownership (January - March)

### January: Docker Fundamentals

- [x] Study Docker concepts: images, containers, volumes, networks *(Week 1 complete)*
- [x] Learn Dockerfile and multi-stage builds *(Week 2 complete)*
- [ ] Create `docker-compose.yml` for local frontend development *(in progress)*
- [ ] Set up hot-reload development environment
- **Deliverable:** Working local dev environment with Docker
- **Status:** 50% complete (Weeks 1-2 done, Weeks 3-4 carried to February)

### February: CI Pipeline Setup

- [ ] Study GitHub Actions / GitLab CI fundamentals
- [ ] Implement pipeline stages: lint, build, test
- [ ] Configure caching strategies for node_modules
- **Deliverable:** Working CI pipeline with automated checks

### March: Testing and Documentation

- [ ] Add unit tests (Vitest/Jest) and E2E tests (Playwright)
- [ ] Write comprehensive README with setup instructions
- [ ] Create onboarding documentation
- **Deliverable:** Complete project with tests and docs

---

## Phase 2: Architecture and Performance-Focused Web App (April - June)

### April: Rendering Strategies Deep Dive

- [ ] Study CSR vs SSR vs SSG vs ISR trade-offs
- [ ] Build same component with different rendering approaches
- [ ] Document when to use each strategy
- **Deliverable:** Rendering strategy comparison document

### May: Performance Optimization

- [ ] Implement code splitting and lazy loading
- [ ] Set up proper caching headers and strategies
- [ ] Configure bundle analysis and optimization
- [ ] Study Core Web Vitals (LCP, FID, CLS)
- **Deliverable:** Performance-optimized app with metrics

### June: API Patterns and Error Handling

- [ ] Implement data fetching patterns (SWR, TanStack Query)
- [ ] Build error boundaries and fallback UIs
- [ ] Add retry logic and offline handling
- **Deliverable:** Resilient app with proper error handling

---

## Phase 3: Frontend Framework Comparison - Content Management Platform (July - September)

### July: React CMS Enhancement (TanStack Start)

- [ ] Enhance CMS built with TanStack Start
- [ ] Implement advanced features: rich text editor, media handling
- [ ] Add authentication with middleware
- [ ] Optimize with ISR for content pages
- **Deliverable:** Full-featured React CMS with TanStack Start

### August: Vue CMS Implementation (Nuxt 3)

- [ ] Rebuild same CMS with Nuxt 3 (Vue's full-stack framework)
- [ ] Use Vue 3 Composition API, Pinia for state
- [ ] Mirror all features from TanStack Start version
- [ ] Compare DX: TanStack Start vs Nuxt 3
- **Deliverable:** Functional Vue CMS with Nuxt 3

### September: Analysis and Comparison Document

- [ ] Compare: DX, performance, bundle size, learning curve
- [ ] Document architectural decisions in each
- [ ] Create internal presentation/document
- **Deliverable:** Framework comparison report

---

## Phase 4: AI-Driven Development and Knowledge Sharing (October - December)

### October: AI Tools Integration

- [ ] Integrate AI tools into daily workflow (Cursor, Copilot)
- [ ] Document productivity improvements with examples
- [ ] Create AI prompt templates for common tasks
- **Deliverable:** Personal AI workflow guide

### November: Building AI-Powered Features

- [ ] Add AI features to one of your projects (search, summarization, etc.)
- [ ] Explore OpenAI/Anthropic APIs integration
- [ ] Document implementation patterns
- **Deliverable:** App with AI-powered feature

### December: Lunch and Learn Preparation

- [ ] Prepare presentation on "AI for Frontend Engineers"
- [ ] Include practical demos and workflows
- [ ] Deliver session to team
- **Deliverable:** Completed Lunch & Learn session

---

## Key Technologies to Master

| Area             | Technologies                                    |
| ---------------- | ----------------------------------------------- |
| Containerization | Docker, docker-compose                          |
| CI/CD            | GitHub Actions, GitLab CI                       |
| Testing          | Vitest, Playwright, Testing Library             |
| React Ecosystem  | **TanStack Start**, TanStack Router, TanStack Query |
| Vue Ecosystem    | Vue 3, Nuxt 3, Vue Router, Pinia                |
| Performance      | Lighthouse, Web Vitals, Bundle analyzers        |
| AI Tools         | Cursor AI, GitHub Copilot, OpenAI API           |

---

## Monthly Progress Tracking

Each month, create a reflection file in `docs/monthly-progress/` documenting:

- What was learned
- Challenges faced and how they were solved
- Key takeaways
- Links to commits/PRs demonstrating progress

---

## Progress Summary

| Phase                               | Status      | Start   | End       |
| ----------------------------------- | ----------- | ------- | --------- |
| Phase 1: CI/CD & Environment        | In Progress | January | March     |
| Phase 2: Architecture & Performance | Not Started | April   | June      |
| Phase 3: Framework Comparison       | Not Started | July    | September |
| Phase 4: AI-Driven Development      | Not Started | October | December  |

---

## Project Decision

**Unified CMS Project:** Instead of separate projects per quarter, building ONE CMS that evolves:
- Q1: Docker setup + CI/CD pipeline
- Q2: Add SSR/SSG + Performance optimization (built into TanStack Start)
- Q3: Rebuild in Vue (Nuxt 3) for comparison
- Q4: Add AI features (search, summarization)

**Framework Choice: TanStack Start**
- Full-stack React framework (currently RC, heading to v1)
- Built-in SSR, SSG, ISR support
- Type-safe routing with TanStack Router
- First-class TanStack Query integration
- Vite-powered for fast development
- Server Functions for type-safe backend calls

See [projects/cms-react/](../projects/cms-react/) for the project.
