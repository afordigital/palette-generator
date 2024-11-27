import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { colord } from "colord";

export const CardComponent = ({ color }: { color: string }) => {
  const _color = colord(color === "currentColor" ? "#7affa6" : color);

  const textColor = _color.isLight()
    ? _color.darken(0.75).toHex()
    : _color.lighten(0.75).toHex();

  return (
    <Card
      style={{ "--color": color, "--hoverColor": color + "99" }}
      className="h-fit"
    >
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
            className="rounded-[4px] focus:border-[var(--color)]"
            placeholder="Enter your email address..."
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            className="rounded-[4px] focus:border-[var(--color)]"
            placeholder="Enter your password..."
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          variant="default"
          style={{ color: textColor }}
          className="w-full bg-[var(--color)] hover:bg-[var(--hoverColor)] rounded-[4px]"
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
