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
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface PromptDialogProps {
  open: boolean;
  onSubmit: (prompt: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function PromptDialog({ open, onSubmit, onCancel, isLoading }: PromptDialogProps) {
  const [prompt, setPrompt] = useState(
    "Generate a color that would work well for a modern software application, considering contrast ratios, accessibility, and current UI/UX trends."
  );

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Generate AI Color</AlertDialogTitle>
          <AlertDialogDescription>
            Describe the color you want to generate. Be specific about the use case, mood, or style you're looking for.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the color you want to generate..."
            className="flex min-h-[80px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 resize-none"
            rows={3}
            disabled={isLoading}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} className="rounded-[4px]" disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={() => onSubmit(prompt)}
            className="rounded-[4px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 