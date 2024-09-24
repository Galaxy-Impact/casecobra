import React from "react";
import SignupForm from "@/features/auth/SignupForm";
import AuthFormHeader from "@/features/auth/AuthFormHeader";
import AuthFormFooter from "@/features/auth/AuthFormFooter";

const SignUpPage = () => {
  return (
    <div className="max-w-[410px] w-full px-4 py-20 ">
      <AuthFormHeader
        title="Create your account"
        subtitle=" Welcome! Please fill in the details."
      />
      <SignupForm />
      <AuthFormFooter
        text="Already have an account?"
        url="/signin"
        label="Sign in"
      />
    </div>
  );
};

export default SignUpPage;
