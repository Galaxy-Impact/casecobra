"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, Label, toast } from "@casecobra/ui";
import FormItem from "./FormItem";
import { SignUpFormData, SignUpSchema } from "@/types";
import { signUp } from "@/services/auth";
import GoogleSignIn from "./GoogleSignIn";

const SignupForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [isLoading, startTransition] = useTransition();

  const onSubmit = (data: SignUpFormData) => {
    startTransition(async () => {
      const res = await signUp(data);
      if (res && res.message) {
        toast.error(res.message);

        if (res.message === "Email is in use")
          setError("email", { message: res.message }, { shouldFocus: true });
      }
    });
  };

  return (
    <form
      className="p-2 flex flex-col gap-6 my-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormItem error={errors.name?.message}>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: true,
          })}
          autoFocus
          error={!!errors.name}
        />
      </FormItem>

      <FormItem error={errors.email?.message}>
        <Label htmlFor="email">Email address</Label>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: true,
          })}
          error={!!errors.email}
        />
      </FormItem>

      <FormItem error={errors.password?.message}>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: true,
          })}
          error={!!errors.password}
        />
      </FormItem>

      <Button type="submit" size="lg" className="mt-4" isLoading={isLoading}>
        Continue
      </Button>

      <div className="my-3 relative">
        <span className="block p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 bg-white">
          or
        </span>
        <hr className="-z-0" />
      </div>

      <GoogleSignIn />
    </form>
  );
};

export default SignupForm;
