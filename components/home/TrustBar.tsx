const TRUST_LOGOS = [
  {
    name: "African Relief Fund",
    logo: "/Images/WEB LOGO/African_Relief_Fund.png",
    featured: true,
  },
  {
    name: "AHF",
    logo: "/Images/WEB LOGO/AHF.png",
  },
  {
    name: "Alkhidmat Pakistan",
    logo: "/Images/WEB LOGO/ALKHIDMAT PAKISTAN.png",
    featured: true,
  },
  {
    name: "Consultants Areena",
    logo: "/Images/WEB LOGO/CONSULTANTS AREENA.png",
    featured: true,
  },
  {
    name: "GEEF",
    logo: "/Images/WEB LOGO/geef.png",
    featured: true,
  },
  {
    name: "Humanity Aux",
    logo: "/Images/WEB LOGO/Humanity-aux.png",
    featured: true,
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
          className="mr-10 flex h-20 w-56 shrink-0 items-center justify-center sm:mr-12"
        >
          <img
            src={item.logo}
            alt={`${item.name} logo`}
            className={
              "bg-transparent object-contain transition duration-300 " +
              ("featured" in item && item.featured
                ? "h-16 w-52"
                : "h-14 w-44")
            }
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
