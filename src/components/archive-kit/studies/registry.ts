import type { ComponentType } from "react";
import ApertureReveal from "./ApertureReveal";
import ShutterCut from "./ShutterCut";
import ContactSheet from "./ContactSheet";
import RackFocus from "./RackFocus";
import FilmStrip from "./FilmStrip";
import FocusPull from "./FocusPull";
import ExifInspector from "./ExifInspector";
import ExposureCurve from "./ExposureCurve";
import {
  SelectionMatStudy,
  PolyglotPillStudy,
  GradeRackStudy,
  NeedlePipelineStudy,
  ApertureDialStudy,
} from "./LiquidStudies";

export type StudyGroup = "Reveal" | "Browse" | "Focus" | "Inspect" | "Liquid";

export type Study = {
  id: string;
  slug: string;
  title: string;
  group: StudyGroup;
  /** What problem the motion solves. If this can't be stated, the study doesn't ship. */
  purpose: string;
  /** How it's built — the technique, named plainly. */
  technique: string;
  /** What the viewer should do to make it move. */
  invite: string;
  Component: ComponentType;
};

export const STUDIES: Study[] = [
  {
    id: "01",
    slug: "aperture-reveal",
    title: "Aperture reveal",
    group: "Reveal",
    purpose:
      "Paces a reveal to reading position. The caption only lands once the frame is fully open, so the image is never competing with the text for attention.",
    technique: "Scroll-linked hexagonal clip-path, blades unwinding as they retract",
    invite: "Scroll inside the frame",
    Component: ApertureReveal,
  },
  {
    id: "02",
    slug: "shutter-cut",
    title: "Shutter cut",
    group: "Reveal",
    purpose:
      "Marks a decisive state change. A cross-fade blurs the boundary between old and new and leaves you unsure anything happened; a shutter gives a clear before and after — and the held closure is where swap latency hides.",
    technique: "Staggered focal-plane blades, content swapped during full closure",
    invite: "Switch states",
    Component: ShutterCut,
  },
  {
    id: "03",
    slug: "contact-sheet",
    title: "Contact sheet",
    group: "Browse",
    purpose:
      "Scan many frames fast without losing your place. A lightbox replaces the whole view and costs you the grid; a loupe magnifies in situ, so context survives the inspection.",
    technique: "Pointer-tracked loupe with eased follow, promote-on-click",
    invite: "Move across the sheet",
    Component: ContactSheet,
  },
  {
    id: "04",
    slug: "rack-focus",
    title: "Rack focus",
    group: "Browse",
    purpose:
      "Browse a stack without losing the stack. A carousel shows one item and hides the pile; a depth gradient keeps your position and the remaining depth visible in both directions at once.",
    technique: "Drag-driven focal plane, depth expressed as blur, scale and offset",
    invite: "Drag through the pile",
    Component: RackFocus,
  },
  {
    id: "05",
    slug: "film-strip",
    title: "Film strip",
    group: "Browse",
    purpose:
      "Turns an awkward axis into the natural one. Horizontal scrollbars are hard to find and harder to drag; mapping vertical scroll onto horizontal travel makes a long chronology one-handed.",
    technique: "Internal scroll progress remapped to strip translateX, sprockets carried along",
    invite: "Scroll to advance",
    Component: FilmStrip,
  },
  {
    id: "06",
    slug: "focus-pull",
    title: "Focus pull",
    group: "Focus",
    purpose:
      "Attention guidance in dense lists. In forty near-identical rows the eye has no anchor; a depth-of-field falloff makes the active row unmissable and encodes near-vs-far as information, not decoration.",
    technique: "Distance-derived blur and contrast falloff, pointer and keyboard sharing one focus index",
    invite: "Move down the list",
    Component: FocusPull,
  },
  {
    id: "07",
    slug: "exif-inspector",
    title: "EXIF inspector",
    group: "Inspect",
    purpose:
      "Binds an explanation to the exact thing it explains. A numbered legend makes the reader do the matching; a drawn connector removes the ambiguity entirely.",
    technique: "SVG connectors animated by stroke-dashoffset, percentage-anchored hotspots",
    invite: "Hover a marker",
    Component: ExifInspector,
  },
  {
    id: "08",
    slug: "exposure-curve",
    title: "Exposure curve",
    group: "Inspect",
    purpose:
      "Shows the cost of an edit, not just the result. Most sliders hide what they destroy; pairing the image with a live histogram makes clipping visible at the moment it happens, so the control teaches while it works.",
    technique: "Native range inputs driving CSS filters and a recomputed luminance distribution",
    invite: "Drag the sliders",
    Component: ExposureCurve,
  },
  {
    id: "09",
    slug: "selection-mat",
    title: "Selection mat",
    group: "Liquid",
    purpose:
      "Selection that never teleports. A highlight that jumps between frames reads as one thing vanishing and another appearing; a liquid mat that stretches across the sheet reads as the same selection travelling.",
    technique: "SVG-silhouette goo layer under crisp DOM, spring-trailed indicator (liquid-gooey move)",
    invite: "Pick a frame",
    Component: SelectionMatStudy,
  },
  {
    id: "10",
    slug: "polyglot-pill",
    title: "Polyglot pill",
    group: "Liquid",
    purpose:
      "One label, three scripts, no jump-cut. Swapping text of a different width normally snaps the container; here the liquid mass flows toward the new word and re-forms around it, so the change reads as the same object re-shaping.",
    technique: "Liquid shape-change physics (morph.shape), content cross-blurred only while the surface moves",
    invite: "Tap the pill",
    Component: PolyglotPillStudy,
  },
  {
    id: "11",
    slug: "grade-rack",
    title: "Grade rack",
    group: "Liquid",
    purpose:
      "Hover feedback with material continuity. Buttons that scale independently float apart from their group; chips sharing one liquid surface swell into their neighbours, and the chosen grade re-develops the print beside them.",
    technique: "Hover-scaled blobs bridging through a shared goo filter, CSS-filter grade crossfade",
    invite: "Hover the chips, pick a grade",
    Component: GradeRackStudy,
  },
  {
    id: "12",
    slug: "needle-pipeline",
    title: "Needle pipeline",
    group: "Liquid",
    purpose:
      "Architecture you can watch run. The chatbot's offline brain — Needle 2, a 14 MB WASM LLM with 17 local tools — drawn as a draggable node canvas: ask, and the droplet of inference rides the wires while the tool trace lights up. Zero network.",
    technique: "Live-derived bezier wires, offset-path droplet with a liquid move-trail, observed gooey ports",
    invite: "Drag a card, then Ask",
    Component: NeedlePipelineStudy,
  },
  {
    id: "13",
    slug: "aperture-dial",
    title: "Aperture dial",
    group: "Liquid",
    purpose:
      "A control that shows its consequence. The stop you pick drives depth of field on the photograph beside it — the dial teaches exposure while it works instead of describing it.",
    technique: "Detent-snapped droplet thumb with move trail, two-layer sharp-subject mask for depth of field",
    invite: "Drag between stops",
    Component: ApertureDialStudy,
  },
];

export const STUDY_GROUPS: StudyGroup[] = ["Reveal", "Browse", "Focus", "Inspect", "Liquid"];

export const STUDY_COUNT = STUDIES.length;
