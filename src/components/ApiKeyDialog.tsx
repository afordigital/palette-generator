import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ApiKeyDialogProps {
  open: boolean;
  onSubmit: (apiKey: string) => void;
  onCancel: () => void;
}

export function ApiKeyDialog({ open, onSubmit, onCancel }: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = useState("");

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>OpenAI API Key Required</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter your OpenAI API key to generate AI-powered color palettes.
            Your key will be stored locally in your browser.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="my-4"
          autoFocus
        />
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            className="rounded-[4px]"
          >
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={() => {
              onSubmit(apiKey);
              setApiKey("");
            }}
            className="rounded-[4px]"
            disabled={!apiKey.startsWith('sk-')}
          >
            Save Key
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 