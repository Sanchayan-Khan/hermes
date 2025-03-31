export default function LoadingScreen({ initialLoad = false }: { initialLoad?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2a2522]">
      <div className="text-center">
        {initialLoad ? (
          <div className="relative">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 rotate-12 bg-amber-500 rounded-sm animate-pulse shadow-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-white font-display text-5xl">
                H
              </div>
              <div className="absolute w-full h-full rounded-full bg-amber-200/20 animate-ping"></div>
            </div>
            <h1 className="text-2xl font-bold text-amber-300 font-display tracking-wider animate-pulse">HERMES</h1>
            <p className="mt-2 text-amber-200/80 font-handwriting text-lg">Your travel companion</p>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-300 animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-3 h-3 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        )}
      </div>
    </div>
  )
}

