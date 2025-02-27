"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";

import { z } from "zod";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

// US states data
const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

// Sample postal codes by state (simplified - in a real app, you'd have a more complete dataset)
const POSTAL_CODES_BY_STATE = {
  AL: ["35004", "35005", "35006", "35007", "35010", "35011", "35013"],
  AK: ["99501", "99502", "99503", "99504", "99505", "99506", "99507"],
  AZ: ["85001", "85002", "85003", "85004", "85005", "85006", "85007"],
  AR: ["71601", "71602", "71603", "71611", "71612", "71613", "71630"],
  CA: ["90001", "90002", "90003", "90004", "90005", "90006", "90007"],
  CO: ["80001", "80002", "80003", "80004", "80005", "80006", "80007"],
  CT: ["06001", "06002", "06003", "06004", "06005", "06006", "06007"],
  DE: ["19701", "19702", "19703", "19704", "19705", "19706", "19707"],
  FL: ["32003", "32004", "32005", "32006", "32007", "32008", "32009"],
  GA: ["30002", "30003", "30004", "30005", "30006", "30007", "30008"],
  HI: ["96701", "96702", "96703", "96704", "96705", "96706", "96707"],
  ID: ["83201", "83202", "83203", "83204", "83205", "83206", "83207"],
  IL: ["60001", "60002", "60003", "60004", "60005", "60006", "60007"],
  IN: ["46001", "46002", "46003", "46004", "46005", "46006", "46007"],
  IA: ["50001", "50002", "50003", "50004", "50005", "50006", "50007"],
  KS: ["66002", "66003", "66004", "66005", "66006", "66007", "66008"],
  KY: ["40003", "40004", "40005", "40006", "40007", "40008", "40009"],
  LA: ["70001", "70002", "70003", "70004", "70005", "70006", "70007"],
  ME: ["04001", "04002", "04003", "04004", "04005", "04006", "04007"],
  MD: ["20601", "20602", "20603", "20604", "20605", "20606", "20607"],
  MA: ["01001", "01002", "01003", "01004", "01005", "01006", "01007"],
  MI: ["48001", "48002", "48003", "48004", "48005", "48006", "48007"],
  MN: ["55001", "55002", "55003", "55004", "55005", "55006", "55007"],
  MS: ["38601", "38602", "38603", "38604", "38605", "38606", "38607"],
  MO: ["63001", "63002", "63003", "63004", "63005", "63006", "63007"],
  MT: ["59001", "59002", "59003", "59004", "59005", "59006", "59007"],
  NE: ["68001", "68002", "68003", "68004", "68005", "68006", "68007"],
  NV: ["89001", "89002", "89003", "89004", "89005", "89006", "89007"],
  NH: ["03031", "03032", "03033", "03034", "03035", "03036", "03037"],
  NJ: ["07001", "07002", "07003", "07004", "07005", "07006", "07007"],
  NM: ["87001", "87002", "87003", "87004", "87005", "87006", "87007"],
  NY: ["10001", "10002", "10003", "10004", "10005", "10006", "10007"],
  NC: ["27006", "27007", "27008", "27009", "27010", "27011", "27012"],
  ND: ["58001", "58002", "58003", "58004", "58005", "58006", "58007"],
  OH: ["43001", "43002", "43003", "43004", "43005", "43006", "43007"],
  OK: ["73001", "73002", "73003", "73004", "73005", "73006", "73007"],
  OR: ["97001", "97002", "97003", "97004", "97005", "97006", "97007"],
  PA: ["15001", "15002", "15003", "15004", "15005", "15006", "15007"],
  RI: ["02801", "02802", "02803", "02804", "02805", "02806", "02807"],
  SC: ["29001", "29002", "29003", "29004", "29005", "29006", "29007"],
  SD: ["57001", "57002", "57003", "57004", "57005", "57006", "57007"],
  TN: ["37010", "37011", "37012", "37013", "37014", "37015", "37016"],
  TX: ["75001", "75002", "75003", "75004", "75005", "75006", "75007"],
  UT: ["84001", "84002", "84003", "84004", "84005", "84006", "84007"],
  VT: ["05001", "05002", "05003", "05004", "05005", "05006", "05007"],
  VA: ["20101", "20102", "20103", "20104", "20105", "20106", "20107"],
  WA: ["98001", "98002", "98003", "98004", "98005", "98006", "98007"],
  WV: ["24701", "24702", "24703", "24704", "24705", "24706", "24707"],
  WI: ["53001", "53002", "53003", "53004", "53005", "53006", "53007"],
  WY: ["82001", "82002", "82003", "82004", "82005", "82006", "82007"]
};


const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setuser] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [availablePostalCodes, setAvailablePostalCodes] = useState<string[]>(
    []
  );

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
  });

  // Update postal codes when state changes
  const selectedState = form.watch("state");

  useEffect(() => {
    if (selectedState) {
      const stateCodes =
        POSTAL_CODES_BY_STATE[
          selectedState as keyof typeof POSTAL_CODES_BY_STATE
        ] || [];
      setAvailablePostalCodes(stateCodes);
      // Reset postal code when state changes
      form.setValue("postalCode", "");
    }
  }, [selectedState, form]);

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setisLoading(true);

    try {
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };
        const newUser = await signUp(userData);
        setuser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) router.push("/");
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
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
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
                    placeholder={"Example: New York City"}
                  />

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>State</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select a state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white">
                              {US_STATES.map((state) => (
                                <SelectItem
                                  key={state.value}
                                  value={state.value}
                                >
                                  {state.label} ({state.value})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Postal Code</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={
                              !selectedState ||
                              availablePostalCodes.length === 0
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="bg-white">
                                <SelectValue
                                  placeholder={
                                    !selectedState
                                      ? "Select a state first"
                                      : availablePostalCodes.length === 0
                                      ? "No postal codes available"
                                      : "Select a postal code"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white">
                              {availablePostalCodes.map((code) => (
                                <SelectItem key={code} value={code}>
                                  {code}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"dateOfBirth"}
                      label={"Date of Birth"}
                      placeholder={"YYYY-MM-DD"}
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
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-grey-600">
              {type === "sign-in"
                ? "Don't have an account?"
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
