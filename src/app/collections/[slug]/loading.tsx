export default function CollectionLoading() {
  return (
    <div aria-busy="true" aria-label="Loading collection" className="animate-pulse">
      <section className="h-[70vh] min-h-[420px] bg-ink" />

      <section className="px-4 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="h-4 w-full max-w-xl bg-line/70" />
          <div className="mt-3 h-4 w-2/3 max-w-md bg-line/70" />

          <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <div className="aspect-[4/5] bg-line/70" />
                <div className="mt-3 h-3 w-3/4 bg-line/70" />
                <div className="mt-2 h-3 w-1/2 bg-line/70" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
