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
    "mt-2 inline-flex items-center gap-1.5 font-body text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted transition hover:text-[#f0b428] focus:outline-none focus-visible:text-[#f0b428]";

  return (
    <div className="group relative isolate flex w-full min-w-0 flex-col overflow-hidden rounded-card border border-white/[0.06] bg-[#15101E] p-4 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:bg-transparent hover:backdrop-blur-sm hover:border-white/20 hover:shadow-card-hover">
      <div className="flex items-center gap-3">
        {/* Photo or Initials */}
        {hasImage ? (
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-[#f0b428] bg-purple/15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.image}
              alt={person.name}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-purple/15 font-display text-sm font-bold text-purple-link transition-transform duration-300 ease-in-out group-hover:scale-110">
            {initials(person.name)}
          </div>
        )}

        {/* Name and Title */}
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm font-semibold text-white break-words">{person.name}</p>
          <p className="font-body text-xs text-muted break-words">{person.title}</p>
          {hasBio && isExpanded && (
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className={toggleClassName}
              aria-expanded="true"
              aria-controls={bioId}
            >
              Read Bio
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
        </div>
      </div>

      {hasBio && (
        <div
          id={bioId}
          className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0">
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="text-left font-body text-xs font-bold italic leading-[1.75] tracking-[0.01em] text-slate-200 break-words">
                {person.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
