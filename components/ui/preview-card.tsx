import * as React from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

export default function ExamplePreviewCard() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-blue-800 no-underline decoration-blue-800/60 decoration-1 underline-offset-2 outline-none hover:underline focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 cursor-pointer">
          typography
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-[240px] p-4">
        <img
          width="448"
          height="300"
          className="block w-full rounded-sm mb-2"
          src="https://images.unsplash.com/photo-1619615391095-dfa29e1672ef?q=80&w=448&h=300"
          alt="Station Hofplein signage in Rotterdam, Netherlands"
        />
        <p className="text-sm text-pretty text-gray-900">
          <strong>Typography</strong> is the art and science of arranging type to
          make written language clear, visually appealing, and effective in
          communication.
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}

 