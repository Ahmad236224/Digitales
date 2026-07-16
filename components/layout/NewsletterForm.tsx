"use client";

import { useState } from "react";

function getSourceDomain() {
  if (typeof window === "undefined") {
    return "";
  }

  const testDomain = new URLSearchParams(window.location.search).get("domain");

  if (testDomain && ["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    return testDomain;
  }

  return window.location.hostname;
}

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          sourceDomain: getSourceDomain() || "unknown",
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "Newsletter signup failed");
      }

      setEmail("");
      setMessage("You're on the list.");
    } catch (err: any) {
      setError(err.message || "Could not join right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="mt-4 flex overflow-hidden rounded-full border border-white/15 bg-night">
        <label htmlFor="newsletter" className="sr-only">Email address</label>
        <input
          id="newsletter"
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="Email address"
          className="newsletter-input min-w-0 flex-1 bg-night px-4 py-2.5 font-body text-sm text-white placeholder:text-muted/60 focus:bg-night-surface focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gold px-5 py-2.5 font-body text-sm font-semibold text-purple-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Joining" : "Join"}
        </button>
      </form>

      {(message || error) && (
        <p className={`mt-3 font-body text-xs ${error ? "text-red-200" : "text-gold"}`}>
          {error || message}
        </p>
      )}
    </>
  );
}
