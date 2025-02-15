"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";

import { z } from "zod";
import { authformSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Signin from "@/app/(auth)/sign-in/page";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setuser] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const formSchema = authformSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      state: "",
      postalCode: "",
      dob: "",
      ssn: "",
      city: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true);

    try {
      //Sign up with Appwrite & create a plaid token

      if (type === "sign-up") {
        const newUser = await signUp(data);
        setuser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if(response) router.push('/');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className="cursor-pointer items-center gap-1 flex">
          <Image
            src={"../icons/logo.svg"}
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign-in" : "Sign-up"}
            <p className="text-16 font-normal text-grey-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">LINK COMPONENT</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"firstName"}
                      label={"First Name"}
                      placeholder={"Enter your first name"}
                    />

                    <CustomInput
                      control={form.control}
                      name={"lastName"}
                      label={"Last Name"}
                      placeholder={"Enter your last name"}
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    name={"address1"}
                    label={"Address"}
                    placeholder={"Enter your specific address"}
                  />

                  <CustomInput
                    control={form.control}
                    name={"city"}
                    label={"City"}
                    placeholder={"Example: Pune"}
                  />

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"state"}
                      label={"State"}
                      placeholder={"Example: Delhi"}
                    />

                    <CustomInput
                      control={form.control}
                      name={"postalCode"}
                      label={"Postal Code"}
                      placeholder={"Example: 110001"}
                    />
                  </div>

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"dob"}
                      label={"Date of Birth"}
                      placeholder={"DD-MM-YYYY"}
                    />

                    <CustomInput
                      control={form.control}
                      name={"ssn"}
                      label={"SSN"}
                      placeholder={"Example: 1234"}
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name={"email"}
                label={"Email"}
                placeholder={"Enter your Username..."}
              />

              <CustomInput
                control={form.control}
                name={"password"}
                label={"Password"}
                placeholder={"Enter your Password..."}
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "sign In"
                  ) : (
                    "sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-grey-600">
              {type === "sign-in"
                ? "Don't have a account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
