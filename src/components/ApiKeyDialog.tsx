import * as React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ApiKeyDialogProps {
  open: boolean;
  onSubmit: (apiKey: string) => void;
  onCancel: () => void;
  setShowPromptDialog: (show: boolean) => void;
}

export default function ApiKeyDialog({ 
  open, 
  onSubmit, 
  onCancel,
  setShowPromptDialog 
}: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = React.useState("");

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Google AI API Key Required</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter your Google AI API key to generate AI-powered color palettes.
            Your key will be stored locally in your browser.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Google AI API key..."
          className="my-4"
          autoFocus
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} className="rounded-[4px]">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={() => {
              onSubmit(apiKey);
              setApiKey("");
              setShowPromptDialog(true);
            }}
            className="rounded-[4px]"
          >
            Save Key
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 