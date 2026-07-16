const TRUST_LOGOS = [
  {
    name: "African Relief Fund",
    logo: "/Images/WEB LOGO/African_Relief_Fund.png",
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
  const renderLogoRow = (ariaHidden = false) => (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden}
    >
      {TRUST_LOGOS.map((item) => (
        <div
          key={item.name}
          className="mr-12 flex h-16 w-40 shrink-0 items-center justify-center sm:mr-16 sm:w-52 lg:mr-20 lg:w-60"
        >
          <img
            src={item.logo}
            alt={`${item.name} logo`}
            className="h-12 w-full bg-transparent object-contain transition duration-300 sm:h-14"
            loading="lazy"
            style={{
              filter: "brightness(1.5) contrast(1.2) drop-shadow(0 0 5px rgba(255, 255, 255, 0.1))",
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="bg-[linear-gradient(180deg,#0A0610_0%,#12081A_52%,#281033_100%)] py-8">
      <p className="container-d text-center font-body text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold/90">
        Trusted by organisations across three continents
      </p>
      <div className="mt-4">
        <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]">
          <div className="flex w-max animate-marquee items-center will-change-transform group-hover:[animation-play-state:paused]">
            {renderLogoRow()}
            {renderLogoRow(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
