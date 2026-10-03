"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  exportAsPlainText,
  exportAsMarkdown,
  exportAsHtml,
  exportAsPdf,
  type ExportPayload,
} from "@/lib/export/exportContent";
import {
  MdOutlineFileDownload,
  MdOutlineDescription,
  MdCode,
  MdPictureAsPdf,
  MdArrowDropDown,
} from "react-icons/md";
import { LuFileText } from "react-icons/lu";

interface ExportMenuProps {
  getPayload: () => ExportPayload;
}

export default function ExportMenu({ getPayload }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleExport = (format: "txt" | "md" | "html" | "pdf") => {
    setIsOpen(false);
    const payload = getPayload();
    switch (format) {
      case "txt":
        exportAsPlainText(payload);
        break;
      case "md":
        exportAsMarkdown(payload);
        break;
      case "html":
        exportAsHtml(payload);
        break;
      case "pdf":
        exportAsPdf(payload);
        break;
    }
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 h-8 px-2.5 sm:px-3 text-xs font-medium cursor-pointer transition-colors duration-200 bg-white/70 dark:bg-zinc-800/70 hover:bg-slate-100 dark:hover:bg-zinc-700/80 border-slate-200 dark:border-white/10"
        title="Export document in multiple formats"
      >
        <MdOutlineFileDownload size={16} className="text-primary" />
        <span className="font-semibold">Export</span>
        <MdArrowDropDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-52 origin-top-right rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-lg ring-1 ring-black/5 z-50 p-1.5 focus:outline-none transition-all duration-150 animate-in fade-in zoom-in-95">
          <div className="px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-slate-100 dark:border-white/5 mb-1">
            Export As
          </div>

          <button
            type="button"
            onClick={() => handleExport("pdf")}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs rounded-lg text-foreground hover:bg-slate-100 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-slate-100 dark:focus-visible:bg-zinc-800 transition-colors duration-150 cursor-pointer text-left"
          >
            <MdPictureAsPdf size={16} className="text-red-500 shrink-0" />
            <div className="flex flex-col">
              <span className="font-medium">PDF Document</span>
              <span className="text-[10px] text-muted-foreground">Standard printable .pdf</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleExport("md")}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs rounded-lg text-foreground hover:bg-slate-100 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-slate-100 dark:focus-visible:bg-zinc-800 transition-colors duration-150 cursor-pointer text-left"
          >
            <MdCode size={16} className="text-blue-500 shrink-0" />
            <div className="flex flex-col">
              <span className="font-medium">Markdown</span>
              <span className="text-[10px] text-muted-foreground">GitHub-ready .md</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleExport("html")}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs rounded-lg text-foreground hover:bg-slate-100 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-slate-100 dark:focus-visible:bg-zinc-800 transition-colors duration-150 cursor-pointer text-left"
          >
            <MdOutlineDescription size={16} className="text-amber-500 shrink-0" />
            <div className="flex flex-col">
              <span className="font-medium">Web Page</span>
              <span className="text-[10px] text-muted-foreground">Styled standalone .html</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleExport("txt")}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs rounded-lg text-foreground hover:bg-slate-100 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-slate-100 dark:focus-visible:bg-zinc-800 transition-colors duration-150 cursor-pointer text-left"
          >
            <LuFileText size={15} className="text-slate-500 shrink-0" />
            <div className="flex flex-col">
              <span className="font-medium">Plain Text</span>
              <span className="text-[10px] text-muted-foreground">Clean universal .txt</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
