import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Custom404() {
  return (
    <div className="flex min-h-screen  w-full items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold">404</h1>

        <h2 className="mt-4 text-3xl font-semibold">
          Page Not Found
        </h2>

        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Button asChild className="mt-8">
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}