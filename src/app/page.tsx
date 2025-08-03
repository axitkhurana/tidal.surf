
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-cyan-100 dark:from-purple-900 dark:via-blue-900 dark:to-teal-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent mb-4">
            🌊 TIDAL.SURF
          </h1>
          <h2 className="text-2xl font-medium text-cyan-700 dark:text-cyan-300 mb-6">
            MANIFESTO
          </h2>
          <p className="text-xl italic text-gray-700 dark:text-gray-300">
            A Future Club for the Leisurely-Minded Technologist
          </p>
        </header>

        <main className="prose prose-lg max-w-none">
          <div className="mb-12 text-center space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
              We are the sunburnt romantics of silicon.<br/>
              Surfers of the synthetic tide.<br/>
              Code cowboys in pastel polos.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We are <span className="font-semibold text-cyan-600 dark:text-cyan-400">tidal.surf</span>, a collective of wanderers, weirdos, and wireheads who build AI for no reason other than we can—and because it feels like magic every time.
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              No deadlines. No roadmaps. No pitch decks.<br/>
              Just vibes, breakthroughs, and browser tabs.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-cyan-700 dark:text-cyan-300">🎛️ We Believe:</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">In Play &gt; Productivity.</h4>
                <p className="text-gray-600 dark:text-gray-400">Our demos may never ship, and that&apos;s perfectly divine. We&apos;re not shipping, we&apos;re drifting.</p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">In Vintage Futures.</h4>
                <p className="text-gray-600 dark:text-gray-400">We like our tech futuristic, but make it 1987. Synths in the background. Gradient buttons. You know the look.</p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">In the Joy of Useless Tools.</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  A chatbot that only speaks like an 18th-century poet? Yes.<br/>
                  An AI that generates beach party invites in the style of Don Draper? Of course.
                </p>
                <p className="text-gray-600 dark:text-gray-400">We build what makes us laugh, gasp, or say &quot;wait, what?&quot;</p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">In Decentralized Delight.</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  No bosses. No KPIs. Just a group thread, late-night pushes, and someone saying:<br/>
                  <em>&quot;I hacked something dumb—wanna see?&quot;</em>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-100 to-pink-100 dark:from-cyan-900/30 dark:to-pink-900/30 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-cyan-700 dark:text-cyan-300">🌐 Our Stack Includes:</h3>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="flex items-center space-x-2">
                <span>•</span>
                <span className="text-gray-700 dark:text-gray-300">TypeScript & Campari</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>•</span>
                <span className="text-gray-700 dark:text-gray-300">Python & pool floats</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>•</span>
                <span className="text-gray-700 dark:text-gray-300">GPT & disco balls</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>•</span>
                <span className="text-gray-700 dark:text-gray-300">Webhooks & waterbeds</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-6 text-cyan-700 dark:text-cyan-300">🏄 Our Dream?</h3>
            <div className="space-y-4 text-lg">
              <p className="text-gray-700 dark:text-gray-300">
                To ride the wave of intelligence with our shades on,<br/>
                building toys that feel like the future and smell like sunscreen.
              </p>
              <p className="font-semibold text-cyan-600 dark:text-cyan-400">
                If it makes you smile, it&apos;s done.
              </p>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-6 text-cyan-700 dark:text-cyan-300">Join the tide.</h3>
            <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
              <p>Bring your weirdest repo.</p>
              <p>Your most beautiful idea with no market fit.</p>
              <p>No experience required, just a good attitude and an open terminal.</p>
            </div>
            <div className="mt-8 space-y-2">
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                We&apos;re not here to scale.<br/>
                We&apos;re here to surf.
              </p>
              <p className="text-lg text-cyan-600 dark:text-cyan-400 font-medium">
                — tidal.surf 🌴
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 italic">
                Fun-AI-for-no-reason-since-whenever
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
