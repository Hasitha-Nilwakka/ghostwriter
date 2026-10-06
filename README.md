# 👻 Ghostwriter

> **An intelligent, responsive content generation studio powered by serverless AI.** Ghostwriter transforms raw user preferences into publication-ready copy across multiple formats with sub-60-second generation times, real-time in-place editing, automated quality assurance, and multi-format exports.

---

## 📑 Table of Contents

- [Tester & Evaluator Guide (Rubric Mapping)](./TESTING_GUIDE.md)
- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Architecture & Processing Pipeline](#-architecture--processing-pipeline)
- [Quick Start](#-quick-start)
  - [Run with Docker (Single Command)](#1-run-with-docker-single-command)
  - [Run Locally](#2-run-locally)
- [Supported Content Types](#-supported-content-types)
  - [1. Email Generator](#1-email-generator)
  - [2. Social Media Post Generator](#2-social-media-post-generator)
  - [3. Short Story Generator](#3-short-story-generator)
- [Input Validation & Normalization](#-input-validation--normalization)
- [Quality Assurance & Automated Retry](#-quality-assurance--automated-retry)
- [In-Place Editing & Multi-Format Export](#-in-place-editing--multi-format-export)
- [Oral Defense & Architectural Decisions](#-oral-defense--architectural-decisions)
- [Bonus & Beyond-Core Enhancements](#-bonus--beyond-core-enhancements)

---

## 🎯 Project Overview

Ghostwriter was built to address the friction of repetitive drafting and formatting. Unlike generic chat interfaces, Ghostwriter treats generation as a **deterministic content pipeline**:
1. It validates and normalizes raw user inputs into structured schemas.
2. It executes content-specific zero-shot prompt templates enforcing clear Markdown headers and section boundaries.
3. It validates outputs against strict word-count tolerance ranges ($\pm 10\%$), character bounds, and required elements.
4. It programmatically sanitizes AI artifacts and rogue formatting.
5. It empowers users to preview, edit in-place, and export the final copy into **Plain Text (`.txt`)**, **Markdown (`.md`)**, **HTML (`.html`)**, or **PDF (`.pdf`)**.

---

## 🛠 Tech Stack

Ghostwriter leverages a modern, full-stack TypeScript architecture designed for rapid generation, strict type safety, and an intuitive user experience:

| Layer | Technologies & Libraries | Purpose & Highlights |
| :--- | :--- | :--- |
| **Core Framework** | **Next.js 16** (App Router, Turbopack) | Server & client components, API route handlers, and standalone production build. |
| **UI & Styling** | **React 19**, **Tailwind CSS v4** | Modern component architecture with responsive mobile-to-desktop containment. |
| **Component Primitives** | **Base UI** (`@base-ui/react`), **Shadcn UI** | Accessible, unstyled UI primitives customized for Ghostwriter. |
| **Theming & Motion** | **next-themes**, **motion** | Smooth dark/light mode toggle with `duration-200` color transitions and fluid UI animations. |
| **Form Management** | **React Hook Form**, **@hookform/resolvers** | High-performance uncontrolled form handling with real-time field validation. |
| **Schema Validation** | **Zod 4** | End-to-end schema validation: client inputs, API route contracts, and LLM output parsing. |
| **State Management** | **Zustand 5** | Lightweight client stores for step transitions and asynchronous generation polling jobs. |
| **Data Fetching** | **TanStack React Query 5**, **Axios** | Mutation lifecycles, HTTP client requests, and automated status polling. |
| **AI Inference** | **RunPod Serverless AI** (vLLM Endpoint) | High-throughput GPU inference delivering sub-60-second generation times. |
| **Prompt Engineering & Parsing** | Custom Template & Structure Engine (`lib/ghostwriter/prompts.ts`, `lib/ghostwriter/structureParser.ts`) | Content-type specific prompt templates with Markdown header enforcement and section boundary parsing. |
| **Quality & QA** | Custom Validation Layer (`lib/ghostwriter/qualityValidation.ts`) | Automated $\pm 10\%$ word-count tolerance verification and feedback-augmented retry loop. |
| **Sanitization Engine** | Custom Sanitizer (`lib/ghostwriter/sanitize.ts`) | Programmatic removal of conversational AI preambles and line-break normalization. |
| **Multi-Format Export** | Custom Native Exporter (`lib/export/exportContent.ts`) | Client-side export to Plain Text (`.txt`), Markdown (`.md`), HTML (`.html`), and standard PDF 1.4 (`.pdf`). |
| **DevOps & Containers** | **Docker**, **Docker Compose** | Multi-stage Alpine containerization enabling single-command startup without manual dependencies. |

---

## 🏗 Architecture & Processing Pipeline

```
[ User Input ]
      │
      ▼
[ Client-Side Validation (Zod) ]
      │
      ▼
[ Input Normalization & Payload Assembly ]
      │
      ▼
[ POST /api/start ] ──▶ [ RunPod Serverless vLLM Endpoint ]
      │                          │ (Async Job ID)
      ▼                          ▼
[ Zustand Polling Store ] ──▶ [ POST /api/status/:jobId ]
      │
      ▼
[ Quality Validation (±10% Word Count, Character Limits, Missing Entities) ]
      │
      ├──▶ Failed? ──▶ [ Automated Single Corrective Retry: POST /api/retry ]
      │
      ▼ Passed
[ Content Sanitization (Strip AI artifacts, standard line breaks) ]
      │
      ▼
[ Result Screen: Preview Mode ⟷ In-Place Edit Mode ]
      │
      ▼
[ Multi-Format Exporter: .txt | .md | .html | .pdf ]
```

---

## 🚀 Quick Start

### 1. Run with Docker (Single Command)

Docker is the only requirement. No manual dependency installation or local setup is needed.

```bash
# Clone the repository
git clone https://gitea.kood.tech/hasithanilwakka/ghostwriter.git
cd ghostwriter

# Copy environment template and enter your RunPod credentials
cp .env.example .env.local

# Run the single startup command
docker compose up --build
```
Alternatively, execute the startup script:
```bash
./run.sh
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

### 2. Run Locally

Ensure you have **Node.js 20+** and **pnpm** installed:

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
cp .env.example .env.local
# Set RUNPOD_API_KEY and RUNPOD_ENDPOINT_ID in .env.local

# 3. Start development server
pnpm dev
```
Open **[http://localhost:3000](http://localhost:3000)**.

---

## 📝 Supported Content Types

Ghostwriter supports **3 content types** (exceeding the minimum requirement of 2):

### 1. Email Generator
- **Inputs Collected**: Purpose, Recipient Name & Background, Key Points (interactive tag list), Tone, Urgency Level, Call-to-Action (CTA).
- **Output Structure**: Strict JSON with `subject` and `body`.
- **Generation Settings**: `temperature: 0`, `max_tokens: 600`.
- **Special Directives**: Covers every supplied key point, omits unsupplied sign-offs, and weaves the CTA naturally.

### 2. Social Media Post Generator
- **Inputs Collected**: Product/Service Name & Context, Platform (`X / Twitter`, `LinkedIn`, `Instagram`, `Facebook`), Goal, Tone, CTA.
- **Output Structure**: Strict JSON with `post_body` and an array of `hashtags`.
- **Generation Settings**: `temperature: 0`, `max_tokens: 300`.
- **Special Directives**: Enforces the 280-character limit for X (body + hashtags), isolates hashtags to prevent duplication inside the body.

### 3. Short Story Generator
- **Inputs Collected**: Genre, Setting, Characters (1–4 characters with name, role, and description), Length (300 to 1,000 words), Style, Target Audience, Mood.
- **Output Structure**: Strict JSON with `title` and `story`.
- **Generation Settings**: `temperature: 0.3`, dynamic `max_tokens` ($2 \times \text{length\_words} + 300$, capped at 2,500).
- **Special Directives**: Narrative pacing with clear arc, incorporation of all specified characters, and adherence to target length within $\pm 10\%$.

---

## 🛡 Input Validation & Normalization

To prevent malformed prompts and API failures:
- **Zod Validation**: Enforces string length bounds, non-negative word counts, non-empty character arrays, and required enum parameters on both client and API boundaries.
- **Input Normalization**:
  - Trims all user-entered strings.
  - Formats multi-select tags (genres, moods, tones) into uniform comma-separated strings.
  - Aggregates recipient background and name into a unified `recipient_context` string.
  - Normalizes character entity objects into consistent schema models before prompt serialization.

---

## 🔍 Quality Assurance & Automated Retry

Ghostwriter includes an automated post-generation validation layer (`lib/ghostwriter/qualityValidation.ts`):
1. **$\pm 10\%$ Word Count Tolerance**: Verifies that generated stories fall strictly between $\lfloor \text{length\_words} \times 0.9 \rfloor$ and $\lceil \text{length\_words} \times 1.1 \rceil$.
2. **Entity Consistency**: Confirms every user-specified character appears in the generated narrative.
3. **Platform Constraints**: Ensures X posts (body + space-separated hashtags) do not exceed 280 characters.
4. **Hashtag Boundary Enforcement**: Guarantees hashtags do not leak into the post body.
5. **Automated Corrective Retry**: If validation fails on the initial attempt (`attempt: 0`), the system automatically synthesizes a corrective feedback prompt (`buildRunpodRetryInput`) explaining the exact discrepancies to the model and retries once (`attempt: 1`) without user intervention.
6. **Artifact Sanitization**: Programmatically strips conversational preambles (e.g. *"Here is your story..."*, *"As an AI assistant..."*), unclosed markdown fences, and excessive whitespace.

---

## ✏️ In-Place Editing & Multi-Format Export

Once generation completes, the user is not locked into static text:
- **In-Place Editing**: Toggle between **Preview** and **Edit** mode with a single click.
  - Edit subject line and email body.
  - Edit social media post body and hashtags (with live character counter).
  - Edit story title and narrative prose (with live word counter and reading time estimation).
  - **Revert to Original**: One-click restore to reset all manual edits back to the AI output.
- **Multi-Format Export**: Export either the original or user-edited content in 4 distinct formats:
  - 📄 **Plain Text (`.txt`)**: Clean, formatted text with metadata header.
  - 📝 **Markdown (`.md`)**: GitHub-flavored markdown with structured headers and blockquotes.
  - 🌐 **Web Page (`.html`)**: Standalone, responsive HTML document with modern typography and dark/light system adaptation.
  - 📑 **PDF Document (`.pdf`)**: Native PDF 1.4 document with Helvetica typography, section headings, and dynamic multi-page pagination.

---

## 🎓 Oral Defense & Architectural Decisions

### 1. Why Zero-Shot Prompting instead of Few-Shot?
Ghostwriter uses structured zero-shot system prompts with strict JSON output schemas.
- **Token Efficiency & Speed**: Few-shot examples increase prompt token size, which slows down generation times and increases latency. Zero-shot prompts keep payload sizes tiny, ensuring generations complete in **under 20 seconds**.
- **Model Bias Prevention**: In open-ended writing tasks (stories and emails), few-shot examples often lead models to copy the style, characters, or cadence of the example rather than following the user's specific parameters.
- **Model Instruction Following**: Instruction-tuned models on vLLM endpoints follow role definitions and schema constraints reliably without needing few-shot demonstration.

### 2. Why Temperature Settings Differ by Content Type?
- **Email & Social Media (`temperature: 0`)**:
  - Deterministic consistency is critical. The model must strictly cover supplied key points, avoid inventing facts or details, respect the 280-character limit, and guarantee valid JSON syntax.
- **Short Story (`temperature: 0.3`)**:
  - A modest temperature introduces vocabulary diversity, engaging figurative language, and fluid narrative transitions, while keeping plot hallucinations and character omissions suppressed.

### 3. How Input Normalization Prevents API Errors
Raw user inputs often contain leading/trailing whitespace, inconsistent array structures, or irregular casing. Normalizing these values client-side into standardized primitives ensures that:
- Prompts constructed from templates never contain broken formatting or double spaces.
- Numerical limits (e.g. word targets) are guaranteed to be positive integers within valid bounds.
- Schema parsing on both server and LLM output boundaries remains predictable and reliable.

### 4. Choice of AI Model & Serverless Infrastructure
- **RunPod Serverless vLLM Endpoint**: Provides high-throughput, low-latency GPU inference with sub-60-second completion times.
- **Asynchronous Polling Architecture**: Rather than keeping HTTP connections open (which time out on serverless platforms), requests are dispatched via `/api/start` (receiving a job ID) and polled via `/api/status`, giving resilient status updates and failure recovery.

### 5. Strategy for Incomplete Responses & Timeouts
- **Token Limits**: Story token limits are calculated dynamically based on target word count ($2 \times \text{words} + 300$) so the model never runs out of tokens mid-sentence.
- **Finish Reason Detection**: `parseGeneratedContent` inspects `choice.finish_reason`. If it equals `"length"`, an explicit truncation error is thrown, prompting automated retry.
- **Network Resilience**: 15-second timeout on individual API calls and user-friendly error banners that allow instant parameter adjustment or retry without page reload.

---

## 🎁 Bonus & Beyond-Core Enhancements

1. **Self-Contained Native PDF Generator**: Generates standard PDF 1.4 documents client-side with zero heavy external libraries.
2. **Automated Corrective Retry Loop**: Automatically inspects output quality and re-queries the model with natural language feedback if bounds are breached.
3. **Adaptive Dark / Light UI**: Smooth `duration-200` color transitions, high-contrast accessible typography, and responsive mobile-to-desktop viewports.
4. **Live Reactive Metrics**: Real-time word count, character count, and estimated reading time recalculations as the user edits generated drafts.
5. **Multi-Stage Standalone Docker Build**: Minimal production Docker image footprint powered by Next.js standalone tracing and Alpine Linux.

