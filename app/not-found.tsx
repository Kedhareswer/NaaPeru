'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { FuzzyText } from '@/components/ui/fuzzy-text';

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-background text-foreground">
      <FuzzyText
        fontSize="8rem"
        fontWeight={900}
        color="hsl(var(--primary))"
        baseIntensity={0.2}
        hoverIntensity={0.5}
      >
        404
      </FuzzyText>
      <FuzzyText
        fontSize="2rem"
        fontWeight={600}
        color="hsl(var(--foreground))"
        baseIntensity={0.15}
        hoverIntensity={0.4}
      >
        Page Not Found
      </FuzzyText>
      <p className="text-muted-foreground text-center max-w-[500px] mt-2 mb-6">
        Sorry, we couldn't find the page you're looking for. Please check the URL or return to the homepage.
      </p>
      <Link href="/">
        <Button>
          <Home />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
