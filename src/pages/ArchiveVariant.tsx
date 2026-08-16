import { useParams, Navigate } from "react-router-dom";
import { ChronicleArchive } from "@/components/archive/ChronicleArchive";
import { ReelArchive } from "@/components/archive/ReelArchive";
import { SignalArchive } from "@/components/archive/SignalArchive";
import { AutopsyArchive } from "@/components/archive/AutopsyArchive";
import { GitBlameArchive } from "@/components/archive/GitBlameArchive";
import { ShutterActsArchive } from "@/components/archive/ShutterActsArchive";
import { OracleArchive } from "@/components/archive/OracleArchive";

const VALID = new Set(["a", "b", "c", "d", "e", "f", "g"]);

const VARIANTS = {
  a: ChronicleArchive,
  b: ReelArchive,
  c: SignalArchive,
  d: AutopsyArchive,
  e: GitBlameArchive,
  f: ShutterActsArchive,
  g: OracleArchive,
} as const;

const ArchiveVariant = () => {
  const { variant } = useParams<{ variant: string }>();

  if (!variant || !VALID.has(variant)) {
    return <Navigate to="/archive" replace />;
  }

  const Experience = VARIANTS[variant as keyof typeof VARIANTS];
  return <Experience />;
};

export default ArchiveVariant;
