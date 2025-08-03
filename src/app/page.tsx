
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-lg mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-normal text-neutral-800 mb-8 leading-tight">
            The Tidal Surf Collective
          </h1>
          <div className="space-y-4">
            <p className="text-base text-neutral-600 leading-relaxed">
              We are the sunburnt romantics of silicon. Surfers of the synthetic tide. Code cowboys in pastel polos.
            </p>
            <p className="text-base text-neutral-600 leading-relaxed">
              We are <span className="text-blue-600">tidal.surf</span>, a collective of wanderers, weirdos, and wireheads who build AI for no reason other than we can—and because it feels like magic every time.
            </p>
            <p className="text-base text-neutral-600 leading-relaxed">
              No deadlines. No roadmaps. No pitch decks. Just vibes, breakthroughs, and browser tabs.
            </p>
          </div>
        </div>

        {/* Beliefs Section */}
        <div className="mb-12">
          <h2 className="text-xl font-serif font-normal text-neutral-800 mb-6">We Believe</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-base text-neutral-800 mb-2">In Play &gt; Productivity</h3>
              <p className="text-base text-neutral-600 leading-relaxed">Our demos may never ship, and that&apos;s perfectly divine. We&apos;re not shipping, we&apos;re drifting.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-base text-neutral-800 mb-2">In Vintage Futures</h3>
              <p className="text-base text-neutral-600 leading-relaxed">We like our tech futuristic, but make it 1987. Synths in the background. Gradient buttons. You know the look.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-base text-neutral-800 mb-2">In the Joy of Useless Tools</h3>
              <p className="text-base text-neutral-600 leading-relaxed mb-3">
                A chatbot that only speaks like an 18th-century poet? Yes. An AI that generates beach party invites in the style of Don Draper? Of course.
              </p>
              <p className="text-base text-neutral-600 leading-relaxed">We build what makes us laugh, gasp, or say &quot;wait, what?&quot;</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-base text-neutral-800 mb-2">In Decentralized Delight</h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                No bosses. No KPIs. Just a group thread, late-night pushes, and someone saying: <em>&quot;I hacked something dumb—wanna see?&quot;</em>
              </p>
            </div>
          </div>
        </div>

        {/* Stack Section */}
        <div className="mb-12">
          <h2 className="text-xl font-serif font-normal text-neutral-800 mb-6">Our Stack</h2>
          <div className="space-y-2">
            <div className="flex items-center text-base text-neutral-600">
              <span className="w-1 h-1 bg-neutral-400 rounded-full mr-3"></span>
              TypeScript & Campari
            </div>
            <div className="flex items-center text-base text-neutral-600">
              <span className="w-1 h-1 bg-neutral-400 rounded-full mr-3"></span>
              Python & pool floats
            </div>
            <div className="flex items-center text-base text-neutral-600">
              <span className="w-1 h-1 bg-neutral-400 rounded-full mr-3"></span>
              GPT & disco balls
            </div>
            <div className="flex items-center text-base text-neutral-600">
              <span className="w-1 h-1 bg-neutral-400 rounded-full mr-3"></span>
              Webhooks & waterbeds
            </div>
          </div>
        </div>

        {/* Dream Section */}
        <div className="mb-12">
          <h2 className="text-xl font-serif font-normal text-neutral-800 mb-6">Our Dream</h2>
          <p className="text-base text-neutral-600 leading-relaxed mb-4">
            To ride the wave of intelligence with our shades on, building toys that feel like the future and smell like sunscreen.
          </p>
          <p className="text-base text-blue-600 font-medium">
            If it makes you smile, it&apos;s done.
          </p>
        </div>

        {/* Join Section */}
        <div className="mb-12">
          <h2 className="text-xl font-serif font-normal text-neutral-800 mb-6">Join the tide</h2>
          <div className="space-y-2 mb-8">
            <p className="text-base text-neutral-600">Bring your weirdest repo.</p>
            <p className="text-base text-neutral-600">Your most beautiful idea with no market fit.</p>
            <p className="text-base text-neutral-600">No experience required, just a good attitude and an open terminal.</p>
          </div>
          <div className="pt-6 border-t border-neutral-200">
            <p className="text-base font-medium text-neutral-800 mb-1">
              We&apos;re not here to scale. We&apos;re here to surf.
            </p>
            <p className="text-base text-neutral-500">
              — tidal.surf
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
