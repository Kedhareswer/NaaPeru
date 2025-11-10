import { ErrorTemplate } from "./ErrorTemplate";

const InternalError = () => (
  <ErrorTemplate
    statusCode="500"
    statusLabel="Internal Server Error"
    title="Something went wrong."
    description="An unexpected error occurred on our end. We're working to fix it. Please try again later."
    callToAction={{ to: "/", label: "Back to Home" }}
    patternWords={["500", "×", "SERVER ERROR", "×", "INTERNAL"]}
    logMessagePrefix="500 Error"
  />
);

export default InternalError;
