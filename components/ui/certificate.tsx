import { Awards } from "@/components/ui/award"

export function Component() {
  return (
    <Awards
      variant="certificate"
      title="Appreciation"
      subtitle="has successfully completed the mastry of design."
      recipient="Kedhareswer"
      date="June 2025"  
    />
  )
}

export default function DemoOne() {
  return <Component />;
} 