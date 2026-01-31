# January 2026: Docker Fundamentals - Detailed Plan

This is your first month of the growth plan. By the end of January, you'll have a working Docker-based local development environment for a frontend project.

---

## Week 1: Docker Core Concepts (Days 1-7)

### Learning Goals

- Understand what Docker is and why it's used
- Learn key terminology: images, containers, volumes, networks
- Install and run your first containers

### Daily Tasks

**Day 1-2: Theory and Setup**

- [ ] Read Docker official docs: [Get Started](https://docs.docker.com/get-started/)
- [ ] Install Docker Desktop on your machine
- [ ] Run `docker run hello-world` to verify installation
- [ ] Understand the difference between images and containers

**Day 3-4: Working with Images**

- [ ] Learn `docker pull`, `docker images`, `docker rmi` commands
- [ ] Pull and inspect `node:20-alpine` image
- [ ] Understand image layers and caching
- [ ] Explore Docker Hub for popular images

**Day 5-7: Working with Containers**

- [ ] Learn `docker run`, `docker ps`, `docker stop`, `docker rm`
- [ ] Run a Node.js container interactively: `docker run -it node:20-alpine sh`
- [ ] Understand port mapping: `-p 3000:3000`
- [ ] Understand volume mounting: `-v $(pwd):/app`

### Week 1 Checkpoint

You should be able to:

- Run any Docker image from Docker Hub
- List, stop, and remove containers
- Understand basic Docker CLI commands

---

## Week 2: Dockerfile Mastery (Days 8-14)

### Learning Goals

- Write your own Dockerfiles
- Understand build context and layer optimization
- Create a production-ready frontend image

### Daily Tasks

**Day 8-9: Dockerfile Basics**

- [ ] Learn Dockerfile instructions: `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`
- [ ] Create a simple Dockerfile for a static HTML page
- [ ] Build your first image: `docker build -t my-app .`

**Day 10-11: Multi-stage Builds**

- [ ] Learn why multi-stage builds matter (smaller images)
- [ ] Create a multi-stage Dockerfile for a React/Vue app:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

**Day 12-14: Optimization**

- [ ] Learn `.dockerignore` file (exclude node_modules, .git)
- [ ] Understand layer caching - order matters!
- [ ] Compare image sizes: regular vs multi-stage vs alpine

### Week 2 Checkpoint

You should be able to:

- Write Dockerfiles for frontend projects
- Build optimized production images
- Explain why layer order matters

---

## Week 3: Docker Compose for Development (Days 15-21)

### Learning Goals

- Use docker-compose for local development
- Set up hot-reload with volume mounts
- Manage multiple services

### Daily Tasks

**Day 15-16: Docker Compose Basics**

- [ ] Read docker-compose documentation
- [ ] Understand `docker-compose.yml` structure
- [ ] Learn commands: `docker-compose up`, `down`, `logs`, `exec`

**Day 17-19: Development Environment Setup**

- [ ] Create a `docker-compose.yml` for frontend development:

```yaml
version: "3.8"

services:
  frontend:
    image: node:20-alpine
    working_dir: /app
    volumes:
      - .:/app
      - node_modules:/app/node_modules
    ports:
      - "5173:5173"
    command: sh -c "npm install && npm run dev -- --host"
    environment:
      - NODE_ENV=development

volumes:
  node_modules:
```

**Day 20-21: Adding Services**

- [ ] Add a mock API service (json-server or similar)
- [ ] Learn service networking (services communicate by name)
- [ ] Add health checks to services

### Week 3 Checkpoint

You should be able to:

- Start your entire dev environment with one command
- Have hot-reload working inside Docker
- Add and connect multiple services

---

## Week 4: Project Integration (Days 22-31)

### Learning Goals

- Apply everything to a real project
- Document your setup for team onboarding
- Troubleshoot common issues

### Daily Tasks

**Day 22-24: Create the CI/CD Project**

- [ ] Initialize a new Vite + React/Vue project
- [ ] Add Dockerfile (multi-stage for production)
- [ ] Add docker-compose.yml (for development)
- [ ] Add .dockerignore file

**Day 25-27: Documentation**

- [ ] Write README with setup instructions
- [ ] Document all docker commands needed
- [ ] Create troubleshooting section for common issues

**Day 28-31: Practice and Review**

- [ ] Practice rebuilding environment from scratch
- [ ] Time yourself: can you set up in under 5 minutes?
- [ ] Write monthly reflection in `docs/monthly-progress/january.md`

---

## Project Deliverables

By end of January, your `projects/01-cicd-environment/` should contain:

```
01-cicd-environment/
├── Dockerfile              # Multi-stage production build
├── docker-compose.yml      # Development environment
├── docker-compose.prod.yml # Production-like local testing
├── .dockerignore           # Exclude unnecessary files
├── README.md               # Setup and usage documentation
├── src/                    # Your frontend app
└── package.json
```

---

## Recommended Resources

### Documentation

- [Docker Get Started Guide](https://docs.docker.com/get-started/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

### Video Courses (Pick One)

- Docker Crash Course (Traversy Media - YouTube, free)
- Docker for Frontend Developers (any Udemy/Pluralsight course)

### Practice

- [Play with Docker](https://labs.play-with-docker.com/) - browser-based Docker playground

---

## Success Criteria

At the end of January, you should be able to answer YES to all:

- [ ] Can you explain Docker images vs containers to a colleague?
- [ ] Can you write a Dockerfile from scratch without looking up syntax?
- [ ] Can you set up a new frontend project with Docker in under 10 minutes?
- [ ] Does your hot-reload work inside Docker containers?
- [ ] Is your setup documented well enough for a new team member?

---

## Commands Cheat Sheet

### Docker Basics

```bash
# Images
docker pull node:20-alpine      # Download image
docker images                   # List images
docker rmi <image>              # Remove image

# Containers
docker run -it node:20-alpine sh    # Run interactive
docker run -d -p 3000:3000 my-app   # Run detached with port
docker ps                           # List running containers
docker ps -a                        # List all containers
docker stop <container>             # Stop container
docker rm <container>               # Remove container
docker logs <container>             # View logs

# Build
docker build -t my-app .            # Build image
docker build -t my-app:v1 .         # Build with tag
```

### Docker Compose

```bash
docker-compose up                   # Start services
docker-compose up -d                # Start detached
docker-compose down                 # Stop and remove
docker-compose logs -f              # Follow logs
docker-compose exec frontend sh     # Shell into service
docker-compose build                # Rebuild images
```
