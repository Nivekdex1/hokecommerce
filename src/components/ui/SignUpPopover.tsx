"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Checkbox,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPopover() {
  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");

  return (
    <Popover>
      <PopoverButton className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gold text-white transition-colors duration-200 ease-in-out"
        >
          <UserRound className="h-5 w-5" />
          <span className="sr-only">Account</span>
        </Button>
      </PopoverButton>

      <PopoverPanel className="absolute right-0 z-50 mt-4 w-full max-w-md transform sm:right-10">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div className="relative">
            {/* Blurred background image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/corsx-image.png"
                alt="Background"
                fill

                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-30 blur-sm"
              />
            </div>

            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700"
              onClick={() => document.body.click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content container */}
            <div className="relative z-10 bg-white p-8">
              {/* Tabs */}
              <div className="mb-6 grid grid-cols-2 gap-0">
                <button
                  className={`font-montserrat rounded-tl-xl rounded-bl-xl py-3 text-center transition-colors ${
                    activeTab === "signup"
                      ? "bg-burntOrange text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveTab("signup")}
                >
                  Sign up
                </button>
                <button
                  className={`font-montserrat rounded-tr-xl rounded-br-xl py-3 text-center transition-colors ${
                    activeTab === "login"
                      ? "bg-burntOrange text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveTab("login")}
                >
                  Log in
                </button>
              </div>

              {activeTab === "signup" ? (
                <div className="space-y-6">
                  {/* Social login buttons */}
                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white py-6 font-medium text-[#333333] transition-colors hover:bg-gray-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Sign up with Google
                    </Button>
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 flex-shrink text-gray-600">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  {/* Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-1 block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <Input
                          id="firstName"
                          type="text"
                          className="w-full text-black"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="mb-1 block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <Input
                          id="lastName"
                          type="text"
                          className="w-full text-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        className="w-full text-black"
                      />
                    </div>

                    <Button className="font-montserrat w-full rounded-full bg-gray-300 py-6 font-medium text-gray-800 transition-colors hover:bg-burntOrange hover:text-white">
                      Sign up
                    </Button>

                    <div className="flex items-center">
                      <Checkbox
                        id="terms"
                        className="size-5 rounded-sm border-2 text-black"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        agree to the{" "}
                        <Link
                          href="#"
                          className="text-blue-600 hover:underline"
                        >
                          Wholesaler Terms
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="#"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Social login buttons */}
                  <div className="space-y-3">
                    <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-3 font-medium transition-colors hover:bg-gray-50 text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Log in with Google
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 flex-shrink text-gray-600">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  {/* Form */}
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="login-email"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <Input id="login-email" type="email" className="w-full" />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <Input id="password" type="password" className="w-full" />
                    </div>

                    <div className="text-right">
                      <Link
                        href="#"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>

                    <Button className="font-montserrat w-full rounded-full bg-gray-300 py-6 font-medium text-gray-800 transition-colors hover:bg-burntOrange hover:text-white">
                      Log in
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
