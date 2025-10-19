import { ErrorTemplate } from "./ErrorTemplate";

const BadRequest = () => (
  <ErrorTemplate
    statusCode="400"
    statusLabel="Bad Request"
    title="The request couldn’t be decoded."
    description="Something in the payload felt off. Double-check the link or refresh the page before trying again."
    callToAction={{ to: "/", label: "Back to Home" }}
    patternWords={["CLIENT ERROR", "400", "CHECK INPUT", "×"]}
    logMessagePrefix="400 Error"
  />
);

export default BadRequest;
