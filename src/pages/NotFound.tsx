import { ErrorTemplate } from "./errors/ErrorTemplate";

const NotFound = () => (
  <ErrorTemplate
    statusCode="404"
    statusLabel="Not Found"
    title="This page doesn't exist."
    renderDescription={(pathname) => (
      <>
        The path <span className="font-mono text-primary">{pathname}</span> doesn&apos;t exist. 
        Check the URL or return to the homepage.
      </>
    )}
    callToAction={{ to: "/", label: "Back to Home" }}
    patternWords={["404", "×", "NOT FOUND", "×", "ERROR"]}
    logMessagePrefix="404 Error"
  />
);

export default NotFound;
