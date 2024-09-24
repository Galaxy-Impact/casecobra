import React from "react";
import AuthFormHeader from "@/features/auth/AuthFormHeader";
import AuthFormFooter from "@/features/auth/AuthFormFooter";
import SigninForm from "@/features/auth/SigninForm";

const SignInPage = () => {
  return (
    <div className="max-w-[410px] w-full px-4 py-20 ">
      <AuthFormHeader
        title="Sign in Casecobra"
        subtitle=" Welcome back! Please sign in to continue."
      />
      <SigninForm />
      <AuthFormFooter
        text="Don't have an account?"
        url="/signup"
        label="Sign up"
      />
    </div>
  );
};

export default SignInPage;
