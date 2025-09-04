"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@workspace/types";
import z from "zod";
import useAxios from "@/hooks/use-axios";
import { toast } from "sonner";

export const SignUpForm = () => {
  const router = useRouter();
  const { instance } = useAxios({});

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    const res = await instance.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
      {
        email: values.email,
        password: values.password,
        accountType: "CREDENTIALS",
      }
    );

    if (res.status === 200) {
      toast.success("User signed up successfully");
      router.push("/sign-in");
    } else {
      toast.error("Error signing up user");
    }
  }
  return (
    <div className="w-full max-w-[700px] mx-auto px-4 min-h-screen space-y-16 pt-48 pb-30 flex flex-col items-center">
      <div className="text-center text-3xl font-bold">Join now</div>
      <div className="w-full max-w-[400px]">
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
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
              type="submit"
            >
              Create Account
            </Button>
          </form>
        </Form>
      </div>
      <p className="text-sm mt-1 text-center px-4">
        Already have an account?
        <br />
        <Button
          variant={"link"}
          className="cursor-pointer"
          onClick={() => router.push("/sign-in")}
        >
          Login now
        </Button>
      </p>
    </div>
  );
};
