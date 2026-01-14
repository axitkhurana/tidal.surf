export default function PrivacyPage() {
  return (
    <div className="min-h-screen beach-gradient relative overflow-hidden">
      <main className="max-w-2xl mx-auto px-6 py-20">
        <div className="bg-white/90 backdrop-blur-sm border border-white/60 rounded-3xl shadow-xl shadow-sky-200/40 p-10">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-600 font-semibold">TidalGuide</p>
          <h1 className="text-4xl font-serif font-normal text-neutral-800 mt-3 mb-2">Privacy Policy</h1>
          <p className="text-sm text-neutral-500 mb-6">Effective date: 2026-01-13</p>
          <p className="text-base text-neutral-600 leading-relaxed mb-6">
            TidalGuide ("we", "our", or "us") provides a location-based audio tour experience. This Privacy Policy explains
            how we collect, use, and share information when you use the TidalGuide app (the "App").
          </p>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-serif text-neutral-800">Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-3 text-neutral-600">
              <li>
                <span className="font-semibold text-neutral-800">Location data</span>: When you grant location permission, the App uses your approximate or precise location to show nearby points of interest and generate tour descriptions.
              </li>
              <li>
                <span className="font-semibold text-neutral-800">Usage data</span>: We may collect basic diagnostics (such as app errors or crashes) to improve reliability.
              </li>
              <li>
                <span className="font-semibold text-neutral-800">User content</span>: If you enter an API key, it is stored locally on your device using system storage.
              </li>
            </ul>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-serif text-neutral-800">How We Use Information</h2>
            <ul className="list-disc pl-5 space-y-2 text-neutral-600">
              <li>Provide location-based tours and map experiences.</li>
              <li>Generate AI descriptions using your selected provider.</li>
              <li>Improve performance and fix bugs.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-serif text-neutral-800">Sharing of Information</h2>
            <ul className="list-disc pl-5 space-y-2 text-neutral-600">
              <li>
                <span className="font-semibold text-neutral-800">Service providers</span>: The App may send location context and prompts to AI providers to generate descriptions. These providers process data under their own terms.
              </li>
              <li>
                <span className="font-semibold text-neutral-800">Legal</span>: We may disclose information if required by law.
              </li>
            </ul>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-serif text-neutral-800">Data Retention</h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              We retain data only as long as necessary to provide the App&apos;s features. API keys and settings are stored locally on your device and can be removed by clearing app data or uninstalling the App.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-serif text-neutral-800">Your Choices</h2>
            <ul className="list-disc pl-5 space-y-2 text-neutral-600">
              <li>You can deny location permission in system settings; the App will limit features accordingly.</li>
              <li>You can remove your API key at any time in Settings.</li>
            </ul>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-serif text-neutral-800">Children's Privacy</h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              The App is not intended for children under 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-serif text-neutral-800">International Users</h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              If you use the App outside your country of residence, your information may be processed in other jurisdictions.
            </p>
          </section>

          <section className="space-y-4 mb-8">
            <h2 className="text-xl font-serif text-neutral-800">Changes to This Policy</h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will update the effective date above.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-serif text-neutral-800">Contact</h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              If you have questions, contact us at: <a href="mailto:hi@tidal.surf" className="text-cyan-600 hover:text-cyan-700">hi@tidal.surf</a>
            </p>
          </section>
        </div>
      </main>
      <div className="surf-footer" aria-hidden="true">
        <svg viewBox="0 0 1200 220" preserveAspectRatio="none" role="presentation">
          <defs>
            <linearGradient id="waveBack" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#bfe9ff" />
              <stop offset="100%" stopColor="#8ad3ff" />
            </linearGradient>
            <linearGradient id="waveFront" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#6dd5ff" />
              <stop offset="100%" stopColor="#4fb3e8" />
            </linearGradient>
          </defs>
          <path
            className="wave wave-back"
            d="M-40 150 C 120 120, 240 185, 360 155 C 520 120, 640 185, 760 155 C 920 120, 1040 185, 1160 155 L 1200 220 L -40 220 Z"
            fill="url(#waveBack)"
          />
          <path
            className="wave wave-front"
            d="M-60 175 C 120 145, 300 210, 480 175 C 640 150, 820 205, 980 175 C 1080 160, 1160 190, 1260 175 L 1260 220 L -60 220 Z"
            fill="url(#waveFront)"
          />
          <g className="surfboard">
            <path
              d="M820 120 C 840 110, 865 112, 878 125 C 888 136, 880 155, 860 160 C 840 165, 820 150, 815 136 C 812 129, 814 123, 820 120 Z"
              fill="#ffb36b"
            />
            <path
              d="M832 132 C 846 126, 860 128, 868 136"
              stroke="#f47b20"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
          <circle className="spray" cx="860" cy="105" r="3" />
          <circle className="spray" cx="872" cy="98" r="2" />
          <circle className="spray" cx="882" cy="108" r="2.5" />
        </svg>
      </div>
    </div>
  );
}
