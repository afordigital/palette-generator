import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const CardComponent = ({ color }: { color: string }) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Create your account to try the project.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            className="rounded-[4px]"
            placeholder="Enter your email address..."
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            className="rounded-[4px]"
            placeholder="Enter your password..."
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          style={{ "--color": color }}
          variant="default"
          className="w-full bg-[var(--color)] rounded-[4px]"
        >
          Create account
        </Button>
        <hr className="h-[2px] w-full text-black" />
        <Button variant="secondary" className="w-full rounded-[4px]">
          Continue with Github
        </Button>
      </CardFooter>
    </Card>
  );
};
