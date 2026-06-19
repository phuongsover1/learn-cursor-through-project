"use client";

import { useState } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-4">
        <Button onClick={() => setShowAlert(true)}>Show Alert</Button>

        {showAlert ? (
          <Alert>
            <AlertTitle>Hello from shadcn/ui!</AlertTitle>
            <AlertDescription>
              This alert is rendered with the shadcn UI Alert component.
            </AlertDescription>
          </Alert>
        ) : null}
      </div>
    </div>
  );
}
