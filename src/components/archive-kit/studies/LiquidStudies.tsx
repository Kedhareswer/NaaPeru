import { LiquidContactSheet } from "@/components/ui/gooey/LiquidContactSheet";
import { LiquidPolyglot } from "@/components/ui/gooey/LiquidPolyglot";
import { LiquidGradeRack } from "@/components/ui/gooey/LiquidGradeRack";
import { LiquidNeedleGraph } from "@/components/ui/gooey/LiquidNeedleGraph";
import { LiquidApertureDial } from "@/components/ui/gooey/LiquidApertureDial";

/*
 * Exhibit wrappers for the liquid-gooey instruments: each centres its
 * instrument in the archive's exhibit frame at the library's tuned defaults.
 */

const Stage = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-full w-full items-center justify-center overflow-hidden p-6">
    {children}
  </div>
);

export const SelectionMatStudy = () => (
  <Stage>
    <LiquidContactSheet />
  </Stage>
);

export const PolyglotPillStudy = () => (
  <Stage>
    <LiquidPolyglot />
  </Stage>
);

export const GradeRackStudy = () => (
  <Stage>
    <LiquidGradeRack />
  </Stage>
);

export const NeedlePipelineStudy = () => (
  <Stage>
    <LiquidNeedleGraph />
  </Stage>
);

export const ApertureDialStudy = () => (
  <Stage>
    <LiquidApertureDial />
  </Stage>
);
