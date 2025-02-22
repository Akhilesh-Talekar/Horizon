import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { CodeSquare } from "lucide-react";
import { Console } from "console";
import RecentTransactions from "@/components/RecentTransactions";

const Page = async ({ searchParams: {id, page}}: SearchParamProps) => {
  let currentPage = Number(page as string) || 1;

  let LoggedIn = await getLoggedInUser();
  if (!LoggedIn) return;
  let accounts = await getAccounts({ userId: LoggedIn?.$id });
  if (!accounts) return;

  const appwriteItemId = (id as string) || accounts.data[0]?.appwriteItemId;

  const account = await getAccount({appwriteItemId: appwriteItemId});

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={`${LoggedIn?.firstName} ${LoggedIn?.lastName}` || "Guest"}
            subtext="Access and manage your account and transactions efficiently"
          />

          <TotalBalanceBox
            accounts={accounts?.data}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions accounts={accounts.data} transactions={account?.transactions} appwriteItemId={appwriteItemId} page={currentPage}/>
      </div>

      <RightSidebar
        user={LoggedIn}
        transactions={account?.transactions}
        banks={accounts?.data.slice(0, 2)}
      />
    </section>
  );
};

export default Page;
