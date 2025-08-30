export default function LoadingProject() {
  return (
    <section className="py-10 md:py-14 px-4">
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="h-8 w-2/3 bg-neutral-200 rounded mb-6" />
        <div className="flex gap-3 mb-8">
          <div className="h-6 w-24 bg-neutral-200 rounded" />
          <div className="h-6 w-28 bg-neutral-200 rounded" />
        </div>
        <div className="h-72 md:h-96 w-full bg-neutral-200 rounded-2xl mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="h-5 w-1/2 bg-neutral-200 rounded" />
            <div className="h-4 w-full bg-neutral-200 rounded" />
            <div className="h-4 w-5/6 bg-neutral-200 rounded" />
            <div className="h-4 w-4/6 bg-neutral-200 rounded" />
          </div>
          <div className="space-y-3">
            <div className="h-5 w-1/3 bg-neutral-200 rounded" />
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-7 w-20 bg-neutral-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
