import { ErrorTemplate } from "./errors/ErrorTemplate";

const NotFound = () => (
  <ErrorTemplate
    statusCode="404"
    statusLabel="Page Not Found"
    title="You wandered into uncharted space."
    renderDescription={(pathname) => (
      <>
        The path <span className="text-primary">{pathname}</span> doesn&apos;t exist on this grid. Plot a new course or sync with mission
        control.
      </>
    )}
    callToAction={{ to: "/", label: "Return Home" }}
    patternWords={["PAGE", "+", "NOT FOUND", "×"]}
    logMessagePrefix="404 Error"
  />
);

export default NotFound;
