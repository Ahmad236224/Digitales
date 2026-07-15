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
    <section className="bg-[linear-gradient(180deg,#0A0610_0%,#12081A_52%,#281033_100%)] py-2">
      <p className="container-d text-center font-body text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
        Trusted by organisations across three continents
      </p>
      <div className="group relative mt-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-14 group-hover:[animation-play-state:paused]">
          {row.map((item, i) => (
            <div
              key={i}
              className="relative flex h-28 w-72 shrink-0 items-center justify-center px-6 py-2 transition duration-300 before:absolute before:inset-x-3 before:inset-y-4 before:rounded-full before:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.44)_42%,transparent_72%)] before:opacity-90 before:blur-sm hover:-translate-y-0.5"
            >
              <img
                src={item.logo}
                alt={`${item.name} logo`}
                className="relative z-10 h-20 w-full object-contain opacity-100 brightness-125 contrast-125 saturate-125 drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
