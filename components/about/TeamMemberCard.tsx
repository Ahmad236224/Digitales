"use client";

import { useState } from "react";

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
  const hasBio = !!person.bio;
  const hasImage = !!person.image;

  return (
    <div
      onClick={() => hasBio && setIsExpanded(!isExpanded)}
      className={`relative flex flex-col rounded-card border bg-night-surface p-4 transition-all duration-300 ${
        hasBio ? "cursor-pointer hover:border-gold/50" : "border-white/[0.06]"
      } ${
        isExpanded ? "border-[#f0b428] bg-gradient-to-b from-night-surface to-[#3d1450]/20 shadow-lg" : "border-white/[0.06]"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Photo or Initials */}
        {hasImage ? (
          <div className="h-11 w-11 shrink-0 rounded-full border-2 border-[#f0b428] bg-purple/15 overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.image}
              alt={person.name}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-purple/15 font-display text-sm font-bold text-purple-link">
            {initials(person.name)}
          </div>
        )}

        {/* Name and Title */}
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm font-semibold text-white truncate">{person.name}</p>
          <p className="font-body text-xs text-muted truncate">{person.title}</p>
        </div>

        {/* Expand Indicator Icon */}
        {hasBio && (
          <div className="text-[#f0b428] shrink-0">
            <svg
              className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>

      {/* Expanded Bio Section */}
      {hasBio && (
        <div
          className="grid transition-all duration-300 ease-in-out overflow-hidden"
          style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
        >
          <div className="min-h-0">
            <div className="border-t border-white/10 mt-3 pt-3">
              <p className="font-body text-xs leading-relaxed text-[#F8F9FA] whitespace-pre-line">
                {person.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
