"use client";

import { useId, useState } from "react";

interface Person {
  name: string;
  title: string;
  image?: string;
  bio?: string;
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((p) => p[0]).join("");
}

export default function TeamMemberCard({ person }: { person: Person }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const bioId = useId();
  const hasBio = !!person.bio;
  const hasImage = !!person.image;
  const toggleClassName =
    "mt-5 inline-flex items-center gap-1.5 font-body text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gold transition hover:text-white focus:outline-none focus-visible:text-white";

  return (
    <article className="group relative isolate flex min-h-[330px] w-full min-w-0 flex-col overflow-hidden rounded-card border border-white/[0.08] bg-[linear-gradient(145deg,#181020_0%,#100B17_100%)] p-6 transition-all duration-300 ease-out before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold/50 before:to-transparent hover:-translate-y-2 hover:border-gold/35 hover:shadow-[0_22px_55px_rgba(107,45,139,0.28)] sm:p-7">
      <div aria-hidden className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-purple/10 blur-3xl transition group-hover:bg-purple/25" />
      <div className="relative flex flex-1 flex-col items-center text-center">
        {/* Photo or Initials */}
        {hasImage ? (
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-gold bg-purple/15 shadow-[0_0_0_6px_rgba(240,180,40,0.08)] sm:h-32 sm:w-32">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.image}
              alt={person.name}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full border-2 border-purple/70 bg-purple/20 font-display text-2xl font-bold text-purple-link shadow-[0_0_0_6px_rgba(107,45,139,0.12)] transition-transform duration-300 group-hover:scale-105 sm:h-32 sm:w-32 sm:text-3xl">
            {initials(person.name)}
          </div>
        )}

        {/* Name and Title */}
        <div className="mt-6 min-w-0">
          <h4 className="font-display text-xl font-bold leading-tight text-white break-words sm:text-2xl">{person.name}</h4>
          <p className="mt-2 font-body text-sm font-medium leading-relaxed text-slate-300 break-words">{person.title}</p>
          {hasBio && !isExpanded && (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className={toggleClassName}
              aria-expanded="false"
              aria-controls={bioId}
            >
              Read Bio
              <svg
                className="h-3 w-3 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          {hasBio && isExpanded && (
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className={toggleClassName}
              aria-expanded="true"
              aria-controls={bioId}
            >
              Hide Bio
              <svg
                className="h-3 w-3 rotate-180 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
      </div>
      </div>

      {hasBio && (
        <div
          id={bioId}
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
            isExpanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-center font-body text-sm font-medium italic leading-[1.75] tracking-[0.01em] text-slate-200 break-words">
                {person.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
