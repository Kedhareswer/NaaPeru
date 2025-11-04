export const InfiniteMarquee = () => {
  const items = [
    "Data Products",
    "UI/UX",
    "Experimental",
    "Applied AI",
    "Data Products",
    "UI/UX",
    "Experimental",
  ];

  return (
    <div className="relative w-full overflow-hidden bg-background border-y border-border/10 py-6">
      <div className="flex animate-marquee-infinite whitespace-nowrap">
        {/* First set */}
        {items.map((item, index) => (
          <div key={`first-${index}`} className="inline-flex items-center mx-8">
            <span className="font-heading text-2xl md:text-3xl text-foreground/70">
              {item}
            </span>
            <span className="ml-8 inline-block h-1.5 w-1.5 rounded-full bg-primary/60" />
          </div>
        ))}
        {/* Second set for seamless loop */}
        {items.map((item, index) => (
          <div key={`second-${index}`} className="inline-flex items-center mx-8">
            <span className="font-heading text-2xl md:text-3xl text-foreground/70">
              {item}
            </span>
            <span className="ml-8 inline-block h-1.5 w-1.5 rounded-full bg-primary/60" />
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes marquee-infinite {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-marquee-infinite {
            animation: marquee-infinite 30s linear infinite;
          }
        `}
      </style>
    </div>
  );
};
