import { useChat } from "@/contexts/ChatContext";

interface FooterProps {
  quote?: string;
}

export const Footer = ({ quote }: FooterProps) => {
  const { openChat } = useChat();

  const content = quote?.trim()?.length
    ? quote
    : "";

  return (
    <footer className="relative border-t border-border/10 bg-background">
      <div className="container-portfolio py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-3xl text-left font-body text-sm italic text-foreground/60 md:text-base">
            {content}
          </p>
          <button
            onClick={openChat}
            className="font-sanchari text-2xl font-bold text-primary cursor-pointer hover:[text-shadow:0_0_24px_hsla(5,78%,42%,0.7)] transition-[text-shadow] duration-300"
          >
            సంచారి?
          </button>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
    </footer>
  );
};
