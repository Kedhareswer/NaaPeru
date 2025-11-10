import { ErrorTemplate } from "./ErrorTemplate";

const Unauthorized = () => (
  <ErrorTemplate
    statusCode="401"
    statusLabel="Unauthorized"
    title="Authentication required."
    description="You need to be logged in to access this resource. Please sign in and try again."
    callToAction={{ to: "/", label: "Back to Home" }}
    patternWords={["401", "×", "UNAUTHORIZED", "×", "AUTH ERROR"]}
    logMessagePrefix="401 Error"
  />
);

export default Unauthorized;
