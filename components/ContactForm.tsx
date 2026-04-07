"use client";

import { useState, type FormEvent } from "react";

// Posts to Web3Forms. No server-side code lives in this template; the access
// key is injected via NEXT_PUBLIC_CONTACT_ACCESS_KEY on the Vercel project
// (shared across all free-site clients) or via site.config.contact.web3formsAccessKey
// if a client needs their own inbox.
//
// A bot honeypot field ("botcheck") is included per Web3Forms convention.
type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  accessKey,
  endpoint,
}: {
  accessKey?: string;
  endpoint?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const url = endpoint ?? "https://api.web3forms.com/submit";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    if (accessKey) {
      formData.set("access_key", accessKey);
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success !== false) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(
          typeof json.message === "string"
            ? json.message
            : "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach the form service. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
        <p className="font-display text-lg font-bold">Thanks - message received.</p>
        <p className="text-sm mt-1">
          We&apos;ll reply by email the same working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
      {/* Honeypot: real users won't fill this; bots often do. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-900">Name</span>
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          className="border border-slate-300 px-3 py-2 focus:outline-none focus:border-slate-900"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-900">Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="border border-slate-300 px-3 py-2 focus:outline-none focus:border-slate-900"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-900">Phone (optional)</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          className="border border-slate-300 px-3 py-2 focus:outline-none focus:border-slate-900"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-900">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="border border-slate-300 px-3 py-2 focus:outline-none focus:border-slate-900"
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting" || !accessKey}
        className="bg-accent text-accent-foreground font-semibold px-6 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>

      {!accessKey && (
        <p className="text-xs text-amber-700">
          Contact form is not yet configured. Set <code>NEXT_PUBLIC_CONTACT_ACCESS_KEY</code> on the Vercel project to enable submissions.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-700">{errorMessage}</p>
      )}
    </form>
  );
}
