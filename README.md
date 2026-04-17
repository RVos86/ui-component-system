# 🎨 UI Component System

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Build](https://img.shields.io/github/actions/workflow/status/rvos86/ui-component-system/ci.yml?label=tests)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![Storybook](https://img.shields.io/badge/storybook-ready-ff4785)

A scalable **component-driven UI system** built with React, TypeScript, and production-grade tooling.

Designed as a portfolio project to demonstrate **frontend architecture, system thinking, and automation at scale**.

---

## ⚡ Key Highlights

- 🧱 Component-based architecture (Atomic Design inspired)
- 📚 Storybook as single source of truth
- 🧪 Automated unit + visual testing
- 👀 Playwright visual regression testing (Story-driven)
- ♿ Automated a11y audits on every story via axe + Playwright
- ⚙️ Fully automated CI pipeline (GitHub Actions)
- 🎨 Design tokens + Tailwind + CVA
- 🚀 Zero-maintenance test generation system

---

## 🔬 Why this project exists

> This repository is intentionally built as a portfolio project to demonstrate how I think about scalable frontend systems beyond isolated components.

This project explores:

- Treating UI as an **engineered system**
- Reducing **manual testing overhead** through automation
- **Scaling** component architecture in a predictable way
- Using **Storybook** as a **single source of truth** for development and testing

More importantly, it reflects how I approach:

- **System design over ad-hoc implementation**
- **Automation over manual processes**
- **Consistency through constraints (design tokens, CVA)**
- **Quality as a built-in concern (testing + CI), not an afterthought**

---

## 👀 What recruiters should look at

If you only have a few minutes, start here:

- 🧭 **Architecture Decisions** — how the system scales
- 🧪 **Testing Strategy** — automated visual + a11y testing via Storybook
- ⚙️ **CI Pipeline** — full quality automation on every PR
- 🎨 **Design System** — consistency via tokens + CVA

💡 This project is less about individual components, and more about **how everything fits together as a system**.

---

## 🧭 Architecture Decisions

This project is intentionally designed as a _system_, not a collection of components.

Key decisions:

- **Component-driven structure (Atomic Design inspired)**  
  Enforces scalability through clear composition layers.

- **Strong design system constraints**  
  UI consistency is enforced through CVA + design tokens rather than ad-hoc styling.

- **Type-safe component APIs (TypeScript)**  
  Prevents invalid usage and improves maintainability at scale.

- **Separation of concerns by composition layer**  
  Atoms, molecules, and organisms enforce predictable complexity growth.

- **Test-driven UI validation strategy**  
  Storybook acts as the source of truth for visual and accessibility testing.

- **Automation-first CI pipeline**  
  All quality checks (lint, types, unit, visual, a11y) run automatically on PRs.

---

## 🎨 Styling System

- Tailwind CSS (utility-first)
- Design tokens (consistency layer)
- class-variance-authority (CVA) for variants

Example:

```
buttonStyles({ variant: 'primary', size: 'md' })
```

---

## 📚 Storybook

Storybook is the source of truth for all components.

Used for:

- Component development
- Documentation (autodocs)
- Visual variant exploration
- Test data source for Playwright

As part of the testing strategy, each Storybook story automatically becomes:

- a visual regression test
- an accessibility audit

→ No manual test maintenance required

---

## 🧪 Testing Strategy

### Unit & Component Tests

- Vitest + Testing Library
- Focus on behavior + accessibility

```
npm run test
```

### Coverage

- v8 coverage provider via Vitest
- Scoped to `src/components/`
- Thresholds: 80% lines, 90% functions, 75% branches

```
npm run test:coverage
```

### Visual Regression Tests

- Playwright + Storybook
- Automatically discovers all stories via /index.json
- Generates tests dynamically per story

```
npx playwright test all.visual.spec.ts
```

### Accessibility Tests

- axe-core + Playwright
- Automatically audits every story for a11y violations
- Scoped to the component under test, not the Storybook chrome
- Components also have manual a11y assertions + jest-axe unit tests

```
npx playwright test all.a11y.spec.ts
```

## ⚙️ CI Pipeline

Automated GitHub Actions pipeline with four jobs:

- **Lint & Typecheck** — ESLint + TypeScript, gates all other jobs
- **Unit Tests** — Vitest + Testing Library, with coverage thresholds enforced
- **Visual Tests** — Playwright screenshot regression against a built Storybook
- **Accessibility Tests** — axe audit on every story via Playwright, automatically
- Fails fast on lint/type errors before running tests
- Coverage report uploaded as an artifact on every run
- Designed for PR-based workflows

---

## 🚀 Getting Started

### 1. Clone repo

```
git clone https://github.com/<your-username>/ui-component-system.git
cd ui-component-system
```

### 2. Install dependencies

```
npm install
```

> 💡 Requires Node.js 18+

### 3. Run project

```
npm run dev
```

### 4. Run Storybook

```
npm run storybook
```

### 5. Run tests

```
npm run test
```

### 6. Run visual tests

```
npx playwright test
```

---

## 🧠 Engineering Focus

This project demonstrates:

- System thinking over component thinking
- Scalable frontend architecture
- Automation-first testing strategy
- Real-world CI/CD workflows
- Thoughtful use of AI tools (e.g. Claude Code) to support productivity, while maintaining full ownership of architecture and design decisions

---

## 👨‍💻 Author

Richard Vos

---

## 📄 License

MIT
