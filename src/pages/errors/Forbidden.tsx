import { ErrorTemplate } from "./ErrorTemplate";

const Forbidden = () => (
  <ErrorTemplate
    statusCode="403"
    statusLabel="Forbidden"
    title="Access denied."
    description="You don't have permission to access this resource. Contact support if you believe this is an error."
    callToAction={{ to: "/", label: "Back to Home" }}
    patternWords={["403", "×", "FORBIDDEN", "×", "ACCESS DENIED"]}
    logMessagePrefix="403 Error"
  />
);

export default Forbidden;
