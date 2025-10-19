import { ErrorTemplate } from "./ErrorTemplate";

const Forbidden = () => (
  <ErrorTemplate
    statusCode="403"
    statusLabel="Forbidden"
    title="That area is locked down."
    description="Your account doesn’t have access to this resource. Request permissions or head back to safer ground."
    callToAction={{ to: "/", label: "Return to Home" }}
    patternWords={["ACCESS DENIED", "403", "FORBIDDEN", "×"]}
    logMessagePrefix="403 Error"
  />
);

export default Forbidden;
