export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-[#0F1117] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button Skeleton */}
        <div className="mb-8 flex items-center justify-between">
          <div className="w-40 h-10 bg-white dark:bg-black border-2 border-black dark:border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.5)] animate-pulse" />
          <div className="w-32 h-7 bg-[#CCFF00] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] animate-pulse" />
        </div>

        {/* Card Skeleton */}
        <div className="border-4 border-black dark:border-white bg-white dark:bg-[#1a1c23] shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.2)] overflow-hidden">
          {/* Header Image Skeleton */}
          <div className="h-72 sm:h-96 md:h-[450px] w-full bg-gray-300 dark:bg-gray-800 border-b-4 border-black dark:border-white animate-pulse" />

          {/* Header Info Skeleton */}
          <div className="p-6 sm:p-8 md:p-12 border-b-4 border-black dark:border-white bg-[#F5F0E8] dark:bg-[#14161f] space-y-4">
            <div className="w-48 h-4 bg-gray-300 dark:bg-gray-700 border border-black animate-pulse" />
            <div className="w-3/4 h-12 bg-gray-400 dark:bg-gray-600 border-2 border-black animate-pulse" />
            <div className="w-full max-w-xl h-5 bg-gray-300 dark:bg-gray-700 border border-black animate-pulse" />
          </div>

          {/* Content Grid Skeleton */}
          <div className="p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
              <div className="lg:col-span-2 space-y-8">
                <div className="w-36 h-4 bg-gray-300 dark:bg-gray-700 border border-black animate-pulse" />
                <div className="space-y-3">
                  <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  <div className="w-4/5 h-4 bg-gray-200 dark:bg-gray-800 animate-pulse" />
                </div>
                <div className="h-28 bg-[#FF4D00]/40 border-2 border-black animate-pulse" />
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="h-44 border-2 border-black dark:border-white bg-[#F5F0E8] dark:bg-black p-6 animate-pulse" />
                <div className="h-36 border-2 border-black dark:border-white bg-white dark:bg-[#1a1c23] p-6 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
