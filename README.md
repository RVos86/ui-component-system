# 🎨 UI Component System

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Build](https://img.shields.io/github/actions/workflow/status/rvos86/ui-component-system/visual-tests.yml?label=tests)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![Storybook](https://img.shields.io/badge/storybook-ready-ff4785)

A scalable, production-ready **component-driven UI system** built with React, TypeScript, and modern frontend tooling.

This project demonstrates how to design **frontend architecture, testing strategy, and design systems at scale**.

---

## ⚡ Key Highlights

- 🧱 Component-based architecture (Atomic Design inspired)
- 📚 Storybook as single source of truth
- 🧪 Automated unit + visual testing
- 👀 Playwright visual regression testing (Story-driven)
- ⚙️ Fully automated CI pipeline (GitHub Actions)
- 🎨 Design tokens + Tailwind + CVA
- 🚀 Zero-maintenance test generation system

---

## 🧠 Why this project exists

This project focuses on:

> Building a scalable UI system, not just components.

It demonstrates how to:

- Treat UI as an **engineered system**
- Avoid manual test maintenance
- Use Storybook as a **testing data source**
- Automate visual regression at scale

---

## 🧱 Architecture

- `src/components/`
  - `atoms/`
  - `molecules/`
  - `organisms/`

### Principles:

- Reusable & composable components
- Strong separation of concerns
- Fully typed APIs (TypeScript)
- Consistent design via tokens

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

---

## 🧪 Testing Strategy

### Unit & Component Tests

- Vitest + Testing Library
- Focus on behavior + accessibility

```
npm run test
```

### Visual Regression Tests

- Playwright + Storybook
- Automatically discovers all stories via /index.json
- Generates tests dynamically per story

```
npx playwright test
```

## ⚙️ CI Pipeline

Automated GitHub Actions pipeline:

- Builds Storybook
- Runs Playwright visual tests
- Fails on visual regressions
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

---

## 👨‍💻 Author

Richard Vos

---

## 📄 License

MIT
