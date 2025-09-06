"use client";

import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github } from "lucide-react";
import { SignInSchema } from "@workspace/types";

type FormValues = z.infer<typeof SignInSchema>;

export const SignInForm = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.ok) {
        router.push("/dashboard");
      } else {
        console.error(res?.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-[700px] h-screen mx-auto px-4 space-y-2 pt-40 pb-30 flex flex-col items-center">
      <div className="text-center text-3xl font-bold">Log in</div>
      <div className="w-full max-w-[400px]">
        <div className="flex flex-col items-center">
          <div className="flex flex-col my-8 space-y-4 w-full">
            <Button
              variant={"outline"}
              className="cursor-pointer w-full min-w-[280px] max-w-[350px] mx-auto"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <Image
                src={"/google-logo.svg"}
                alt="google_icon"
                width={15}
                height={15}
                className="translate-x-0.5"
              />
              <span className="ml-0.5">Continue with Google</span>
            </Button>
            <Button
              variant={"outline"}
              className="cursor-pointer w-full min-w-[280px] max-w-[350px] mx-auto"
              onClick={() => {
                signIn("github", { callbackUrl: "/dashboard" });
              }}
            >
              <Github />
              <span>Continue with Github</span>
            </Button>
          </div>
          <div className="relative mb-10 w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-500"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-[#0a0a0a] text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"default"}
              className="cursor-pointer h-8 w-full min-w-[280px] mx-auto mt-4.5"
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
      <p className="text-sm mt-4 text-center px-4">
        Don't have an account?
        <br />
        <Button
          variant={"link"}
          className="cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          Create an account
        </Button>
      </p>
    </div>
  );
};
