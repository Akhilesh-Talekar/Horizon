import React from 'react';
import HeaderBox from '@/components/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import RightSidebar from '@/components/RightSidebar';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Page = async() => {
    let LoggedIn = await getLoggedInUser();
    console.log(LoggedIn);

  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox 
                type = "greeting"
                title = "Welcome"
                user = {LoggedIn?.name || "Guest"}
                subtext = "Access and manage your account and transactions efficiently"
                />

                <TotalBalanceBox
                accounts = {[]}
                totalBanks = {3}
                totalCurrentBalance = {125000}
                />
            </header>

            RECENT TRANSECTIONS
        </div>

        <RightSidebar user={LoggedIn} transactions={[]} banks={[{currentBalance: 55000}, {currentBalance: 45000}]}/>
    </section>
  );
}

export default Page;
