import { ErrorTemplate } from "./ErrorTemplate";

const BadRequest = () => (
  <ErrorTemplate
    statusCode="400"
    statusLabel="Bad Request"
    title="Invalid request."
    description="The request couldn't be processed. Check the URL or try again."
    callToAction={{ to: "/", label: "Back to Home" }}
    patternWords={["400", "×", "BAD REQUEST", "×", "ERROR"]}
    logMessagePrefix="400 Error"
  />
);

export default BadRequest;
