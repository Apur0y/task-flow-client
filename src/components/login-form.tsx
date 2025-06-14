import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useUserCreationMutation } from "@/feature/auth/authCredentialSlice";

type Inputs = {
  email: string;
  password: string | number;
  exampleRequired: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [passwordShow, setPasswordShow] = useState(false);
  const [user, setUser] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setUser(data);
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-task-primary-dark">
          Login to your account
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email", { required: true })}
            className="py-5 rounded-sm"
            id="email"
            type="email"
            placeholder="m@example.com"
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className=" relative ">
            <Input
              {...register("password", { required: true })}
              className="py-5 rounded-sm w-full"
              id="password"
              type={passwordShow ? "text" : "password"}
              name="password"
            />
            <div className=" absolute top-3 right-5 ">
              {passwordShow ? (
                <button
                  onClick={() => setPasswordShow(!passwordShow)}
                  type="button"
                  className="text-xl text-task-primary cursor-pointer"
                >
                  <FaRegEyeSlash></FaRegEyeSlash>
                </button>
              ) : (
                <button
                  onClick={() => setPasswordShow(!passwordShow)}
                  type="button"
                  className="text-xl text-task-primary cursor-pointer"
                >
                  <FaRegEye></FaRegEye>
                </button>
              )}
            </div>
          </div>

          <Link
            href={"#"}
            className=" text-sm underline-offset-4 hover:underline hover:text-task-primary"
          >
            Forgot your password?
          </Link>
        </div>
        {errors.exampleRequired && <span>This field is required</span>}
        <Button
          type="submit"
          className="w-full  bg-task-primary py-5 rounded-sm cursor-pointer hover:bg-task-primary-dark"
        >
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        you have an account? Please Login.
      </div>
    </form>
  );
}
