import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

type TransitionState = "idle" | "closing" | "hold" | "opening";

interface TransitionContextValue {
  state: TransitionState;
  targetLabel: string;
  navigateTo: (path: string, label?: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  state: "idle",
  targetLabel: "",
  navigateTo: () => {},
});

const ROUTE_LABELS: Record<string, string> = {
  "/": "WORK",
  "/fun": "EXPERIMENTOS",
  "/about": "ABOUT",
  "/poreia": "\u03A0\u039F\u03A1\u0395\u0399\u0391",
  "/case-study/thesisflow": "THESISFLOW",
  "/case-study/quantumpdf": "QUANTUMPDF",
  "/case-study/data-notebook": "DATA NOTEBOOK",
};

/** Duration config (ms) — cinematic pacing */
const TIMING = {
  barsClose: 800,
  hold: 500,
  barsOpen: 800,
} as const;

export const TRANSITION_TIMING = TIMING;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TransitionState>("idle");
  const [targetLabel, setTargetLabel] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const lockRef = useRef(false);

  const navigateTo = useCallback(
    (path: string, label?: string) => {
      if (lockRef.current) return;
      if (path === location.pathname) return;

      lockRef.current = true;
      setTargetLabel(label || ROUTE_LABELS[path] || "");

      // Stagger adds ~70ms * 7 bars = ~490ms on top of base duration
      const STAGGER_TOTAL = 490;

      // Phase 1: Bars close
      setState("closing");

      setTimeout(() => {
        // Phase 2: Hold — swap the route while bars cover screen
        setState("hold");
        navigate(path);
        window.scrollTo(0, 0);

        setTimeout(() => {
          // Phase 3: Bars open to reveal new page
          setState("opening");

          setTimeout(() => {
            // Done
            setState("idle");
            setTargetLabel("");
            lockRef.current = false;
          }, TIMING.barsOpen + STAGGER_TOTAL + 150);
        }, TIMING.hold);
      }, TIMING.barsClose + STAGGER_TOTAL);
    },
    [location.pathname, navigate],
  );

  return (
    <TransitionContext.Provider value={{ state, targetLabel, navigateTo }}>
      {children}
    </TransitionContext.Provider>
  );
}

export const useTransition = () => useContext(TransitionContext);
