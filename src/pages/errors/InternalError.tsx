import { ErrorTemplate } from "./ErrorTemplate";

const InternalError = () => (
  <ErrorTemplate
    statusCode="500"
    statusLabel="Internal Server Error"
    title="Something broke behind the scenes."
    description="Our system hit an unexpected glitch. We’re logging it now—give it a minute and try again."
    callToAction={{ to: "/", label: "Go to Home" }}
    patternWords={["SERVER ERROR", "500", "TRY AGAIN", "×"]}
    logMessagePrefix="500 Error"
  />
);

export default InternalError;
