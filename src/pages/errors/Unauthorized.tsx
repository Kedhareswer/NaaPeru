import { ErrorTemplate } from "./ErrorTemplate";

const Unauthorized = () => (
  <ErrorTemplate
    statusCode="401"
    statusLabel="Unauthorized"
    title="You need the right clearance."
    description="It looks like you’re signed out or missing credentials. Log in and try the request again."
    callToAction={{ to: "/", label: "Head to Home" }}
    patternWords={["AUTH", "CHECK LOGIN", "401", "×"]}
    logMessagePrefix="401 Error"
  />
);

export default Unauthorized;
