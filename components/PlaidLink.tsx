import { StyledString } from "next/dist/build/swc/types";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from "react-plaid-link";
import { Button } from "@/components/ui/button";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const [token, setToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchToken = async () => {
            const response = await createLinkToken(user);
            setToken(response?.linkToken);
        };
        fetchToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        const response = await exchangePublicToken({publicToken:public_token , user});
        console.log(response);
        router.push('/');
    }, [user]);

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    };

    const {open, ready} = usePlaidLink(config);
  return (
    <>
      {variant === "primary" ? (
        <Button className="plaidlink-primary" onClick={() => open()} disabled={!ready}>Link Bank Account</Button>
      ) : variant === "ghost" ? (
        <Button className="plaidlink-ghost" disabled={!ready}>Ok</Button>
      ) : (
        <Button className="plaidlink-ghost">Bye</Button>
      )}
    </>
  );
};

export default PlaidLink;
