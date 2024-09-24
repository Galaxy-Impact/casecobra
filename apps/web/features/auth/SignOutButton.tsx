"use client";
import React, { useTransition } from "react";
import { Button } from "@casecobra/ui";
import { signOut } from "@/services/auth";

const SignOutButton = () => {
  const [isLoading, startTransition] = useTransition();
  const onClick = () => {
    startTransition(async () => {
      signOut();
    });
  };
  return (
    <Button size="sm" variant="ghost" onClick={onClick} isLoading={isLoading}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
