
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tidal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A modern static site built with Next.js and deployed on GitHub Pages
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Static Site Generation
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Built with Next.js static export for optimal performance and GitHub Pages compatibility.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Modern Stack
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                TypeScript, Tailwind CSS, and automated deployment with GitHub Actions.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Ready to Deploy
            </h3>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Push to main branch to automatically deploy to GitHub Pages
              </p>
              <div className="flex justify-center gap-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Next.js 15
                </span>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  TypeScript
                </span>
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Tailwind CSS
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
