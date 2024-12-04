import React from 'react';
import HeaderBox from '@/components/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import RightSidebar from '@/components/RightSidebar';

const Page = () => {
    let LoggedIn = { firstName: "Akhilesh", lastName: "Talekar", email: "akhilesh.talekar21@gmail.com"};

  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox 
                type = "greeting"
                title = "Welcome"
                user = {LoggedIn?.firstName || "Guest"}
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

        <RightSidebar user={LoggedIn} transactions={[]} banks={[{currentBalance: 55000, name: "Akhilesh Talekar"}, {currentBalance: 45000, name: "Akhilesh Talekar"}]}/>
    </section>
  );
}

export default Page;
