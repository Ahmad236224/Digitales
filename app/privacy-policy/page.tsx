import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <main className="bg-[#0a0a0c] text-gray-300">
      <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <p className="font-body text-xs font-bold uppercase tracking-[0.28em] text-[#F0B428]">
          Effective Date: June 2026
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">
          Privacy Policy
        </h1>

        <div className="mt-12 space-y-10 font-body text-base leading-8 text-gray-300">
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#F0B428]">1. Who We Are</h2>
            <p>
              Digitales (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is a digital agency with operations in the United States
              (New York), the United Kingdom (London), and Pakistan (Lahore). This Privacy Policy explains how we
              collect, use, and protect information when you visit www.digitales.com (the &quot;Site&quot;).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-[#F0B428]">2. Information We Collect</h2>
            <div className="space-y-3">
              <p className="font-semibold text-white">Information you provide directly:</p>
              <p>When you submit our Free Audit form or otherwise contact us through the Site, we may collect:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company/organization name</li>
                <li>Website URL</li>
                <li>Information about your business goals, budget, or marketing needs (as requested in the audit funnel)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="font-semibold text-white">Information collected automatically:</p>
              <p>We use Google Analytics to understand how visitors use our Site. This may collect:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>IP address (anonymized where applicable)</li>
                <li>Browser type and device information</li>
                <li>Pages visited and time spent on Site</li>
                <li>Referral source (how you found us)</li>
                <li>General geographic location (city/country level)</li>
              </ul>
              <p>We do not use live chat, and we do not process payments or checkout transactions on this Site.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#F0B428]">3. How We Use Your Information</h2>
            <p>We use the information collected to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Respond to your Free Audit request and follow up with relevant proposals or insights</li>
              <li>Improve our Site&apos;s content, performance, and user experience</li>
              <li>Understand aggregate traffic and visitor behavior through analytics</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#F0B428]">4. Cookies &amp; Tracking</h2>
            <p>
              Our Site uses cookies via Google Analytics to collect usage data. You can disable cookies through your
              browser settings; doing so may affect some Site functionality but will not prevent you from contacting us
              directly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#F0B428]">5. Data Sharing</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Service providers: Google Analytics (subject to Google&apos;s own privacy policy)</li>
              <li>Internal teams: Digitales staff across our US, UK, and Pakistan offices, for the purpose of responding to inquiries</li>
              <li>Legal authorities: where required by law, regulation, or valid legal process</li>
            </ul>
            <p>We do not share your data with third-party advertisers.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#F0B428]">6. International Data Transfers</h2>
            <p>
              Because Digitales operates across the US, UK, and Pakistan, information submitted through this Site may be
              accessed or processed by team members in any of these locations. By submitting information, you consent to
              this transfer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#F0B428]">7. Data Retention</h2>
            <p>
              We retain Free Audit submissions and related correspondence for as long as reasonably necessary to respond
              to your inquiry and for legitimate business record-keeping, unless you request earlier deletion.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-[#F0B428]">8. Your Rights</h2>
            <p>
              General rights: Depending on your location, you may have rights to access, correct, or delete the personal
              data we hold about you, and to object to or restrict certain processing.
            </p>
            <div className="space-y-3">
              <p className="font-semibold text-white">If you are in the UK/EU (GDPR):</p>
              <p>You have the right to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Access, correct, or erase your personal data</li>
                <li>Restrict or object to our processing of your data</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time where processing is based on consent</li>
                <li>Lodge a complaint with your local data protection authority</li>
              </ul>
              <p>
                Our legal basis for processing your data is your consent (when you submit the Free Audit form) and our
                legitimate interest in responding to business inquiries and improving our Site.
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-semibold text-white">If you are a California resident (CCPA):</p>
              <p>You have the right to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Know what personal information we collect and how it is used</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of the sale of personal information &mdash; note: Digitales does not sell personal information</li>
                <li>Not be discriminated against for exercising these rights</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at privacy@digitales.com. We will respond within the
                timeframe required by applicable law.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#F0B428]">9. Children&apos;s Privacy</h2>
            <p>This Site is not directed at individuals under 16, and we do not knowingly collect data from minors.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#F0B428]">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be posted on this page with a revised
              effective date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#F0B428]">11. Contact Us</h2>
            <p>Questions about this Privacy Policy? Reach us at privacy@digitales.com.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
