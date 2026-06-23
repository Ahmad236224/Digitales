const TRUST_LOGOS = [
  {
    name: "African Relief Fund",
    logo: "/Images/WEB LOGO/AFRICAN RELIEF FUND.png",
  },
  {
    name: "AHF",
    logo: "/Images/WEB LOGO/AHF.png",
  },
  {
    name: "Alkhidmat Pakistan",
    logo: "/Images/WEB LOGO/ALKHIDMAT PAKISTAN.png",
  },
  {
    name: "Consultants Areena",
    logo: "/Images/WEB LOGO/CONSULTANTS AREENA.png",
  },
  {
    name: "GEEF",
    logo: "/Images/WEB LOGO/geef.png",
  },
  {
    name: "HU",
    logo: "/Images/WEB LOGO/HU Logo Png Formate Final.png",
  },
  {
    name: "Islamic Centre of Britain",
    logo: "/Images/WEB LOGO/ISLAMIC CENTRE OF BRITAIN.png",
  },
  {
    name: "Lahore Garrison University",
    logo: "/Images/WEB LOGO/LAHORE GARRISON UNIVERSITY.png",
  },
  {
    name: "Leads University",
    logo: "/Images/WEB LOGO/LEADS UNIVERSITY.png",
  },
  {
    name: "Neo Jeans",
    logo: "/Images/WEB LOGO/NEO JEANS.png",
  },
  {
    name: "TPS",
    logo: "/Images/WEB LOGO/TPS.png",
  },
  {
    name: "University of Lahore",
    logo: "/Images/WEB LOGO/UNIVERSITY OF LAHORE.png",
  },
] as const;

export default function TrustBar() {
  const row = [...TRUST_LOGOS, ...TRUST_LOGOS];
  return (
    <section className="border-y border-white/[0.06] bg-night py-10">
      <p className="container-d text-center font-body text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted/60">
        Trusted by organisations across three continents
      </p>
      <div className="group relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]">
          {row.map((item, i) => (
            <div
              key={i}
              className="flex h-28 w-56 shrink-0 items-center justify-center px-3 transition duration-300 hover:-translate-y-1"
            >
              <img
                src={item.logo}
                alt={`${item.name} logo`}
                className="h-20 w-full object-contain opacity-100 drop-shadow-[0_10px_22px_rgba(0,0,0,0.28)]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
