"use client";
import { LoginForm } from "@/components/login-form";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/lottieFile/login-animation.json";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <span className="text-task-primary text-2xl font-bold">
              {" "}
              Tash Flow
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-task-primary relative hidden lg:block ">
        <div className="max-w-xl flex justify-center items-center h-screen mx-auto ">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>
      </div>
    </div>
  );
}
