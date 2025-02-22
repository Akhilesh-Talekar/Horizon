import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const PaymentTransfer = async() => {
  let LoggedIn = await getLoggedInUser();
  if (!LoggedIn) return;
  let accounts = await getAccounts({ userId: LoggedIn?.$id });
  if (!accounts) return;

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details and notes related to the transfer"
      />
      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accounts.data}/>
      </section>
    </section>
  );
};

export default PaymentTransfer;
