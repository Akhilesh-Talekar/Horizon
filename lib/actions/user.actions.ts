"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({email, password}:signInProps) => {
  try {
    //Mutation / Database / Make fetch
    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", response.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(response);
  } catch (err) {
    console.log("Error", err);
  }
};

export const signUp = async (userData: SignUpParams) => {
    const {email, password, firstName, lastName} = userData;
  try {
    // Create a user account
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (err) {
    console.log("Error", err);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user =  await account.get();
    return parseStringify(user);
  } catch (err) {
    return null;
  }
}

export async function logOut() {
  try{
    const {account} = await createSessionClient();
    (await cookies()).delete("appwrite-session");
    await account.deleteSession("current");
  }
  catch(err){
    console.log("Error", err);
  }
}