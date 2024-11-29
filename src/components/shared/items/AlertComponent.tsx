import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export const AlertComponent = () => {
  return (
    <Alert>
      <Terminal className="w-4 h-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  );
};
