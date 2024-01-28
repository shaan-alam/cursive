'use client';
import { signIn } from "next-auth/react";
import { BackgroundBeams } from "../ui/background-beams";
import { Button } from "../ui/button";
import GoogleIcon from "@/icons/GoogleIcon";
import GithubIcon from "@/icons/GithubIcon";

const SignIn = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <BackgroundBeams />
      <div className="relative z-20 w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="">
              Don't have an account?{" "}
              <a
                href="javascript:void(0)"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
          <div className="grid grid-cols-2 gap-x-3">
            <Button
              variant="ghost"
              onClick={() =>
                signIn("google", { redirect: true, callbackUrl: "/app" })
              }
              className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
            >
              <GoogleIcon />
            </Button>
            <Button
              onClick={() =>
                signIn("github", { redirect: true, callbackUrl: "/app" })
              }
              variant="ghost"
              className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
            >
              <GithubIcon />
            </Button>
          </div>
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Or continue with
            </p>
          </div>
          <form className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <Button className="w-full px-4 py-2 text-white font-medium  rounded-lg duration-150">
              Sign in
            </Button>
          </form>
        </div>
        <div className="text-center">
          <a href="javascript:void(0)" className="hover:text-indigo-600">
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
