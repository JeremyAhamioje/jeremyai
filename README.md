# AI Workspace

A chat assistant sitting next to the document tools people actually open a second tab for — merge a PDF, compress an image, convert a file, generate a Word document — with every one of those running in the browser.

Next.js · TypeScript · Google Gemini

---

## The idea

Chat assistants are good at producing text and bad at producing files. The usual workaround is a round trip through three other websites, each of which wants your document uploaded to a server you know nothing about.

This puts the tools in the same workspace as the conversation, and runs them client-side, so the files never leave the machine.

## The tools

| Tool | Does |
|---|---|
| **PDF Merger** | Combines PDFs in the browser via `pdf-lib` |
| **Image Compressor** | Resizes and compresses with `browser-image-compression` |
| **File Converter** | Reads `.docx` through `mammoth`, writes PDF through `jsPDF` |
| **DOCX Generator** | Builds Word documents from chat output using `docx` |

Every one is a client-side library by deliberate choice. A file-conversion tool that uploads your document is asking for more trust than the task is worth, and it is the reason most people will not use one for anything sensitive.

## Architecture

- `WorkspaceShell` holds the layout; chat and tools are peers inside it rather than the tools being nested in the conversation, so a tool keeps its state when the chat scrolls.
- **Zustand** for shared state — small enough that a context provider per tool would be more code than the store.
- The only server route is `/api/gemini`, which exists solely to keep the API key server-side.

## Stack

Next.js (App Router) · TypeScript · Zustand · `pdf-lib` · `mammoth` · `jsPDF` · `docx` · `browser-image-compression` · Framer Motion · Tailwind

## Running locally

```bash
npm install
# set your Gemini API key in .env.local
npm run dev
```

---

Built by [Jeremy Ahamioje](https://github.com/JeremyAhamioje).
