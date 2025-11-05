export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <main className="max-w-2xl px-8 py-16">
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              Tom Kremer
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Developer & Builder
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="https://www.linkedin.com/in/kremertom/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                    LinkedIn Profile
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Connect with me on LinkedIn
                  </p>
                </div>
              </div>
            </a>

            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
                Projects
              </h2>
              <a
                href="https://shit-green.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-slate-50 dark:bg-slate-700/50 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-50 mb-1">
                  C.F.I.T. | The Congressional & Federal Investment Tracker
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Track congressional and federal investment activities
                </p>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
