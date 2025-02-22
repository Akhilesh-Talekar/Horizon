import React from "react";
import Link from "next/link";
import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Copy from "./Copy";

const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* Single Card Container */}
      <Link href={`transaction-history/?id=${account.appwriteItemId}`} className="relative group w-[280px] h-[160px] rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          {/* Card Content */}
          <div>
            <h1 className="text-md font-semibold text-white truncate">
              {account.name || userName}
            </h1>
            
            <p className="text-l font-bold text-white mt-1">
              {formatAmount(account.currentBalance)}
            </p>
            
          </div>
          <article className="flex flex-col gap-1">
            <div className="flex justify-between text-xs">
              <h1 className="font-medium text-white truncate">{userName}</h1>
              <h2 className="font-medium text-white">●● / ●●</h2>
            </div>
            <p className="text-sm font-semibold tracking-widest text-white">
              ●●●● ●●●● ●●●● <span className="text-md">{account.mask}</span>
            </p>
          </article>
        </div>

        {/* Card Decorations */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <Image src={"/icons/Paypass.svg"} width={16} height={20} alt="Paypass logo"/>
          <Image
            src={"/icons/mastercard.svg"}
            width={36}
            height={28}
            alt="Mastercard logo"
            className="ml-2"
          />
        </div>

        <Image
          src={"/icons/lines.png"}
          width={280}
          height={160}
          alt="Decorative lines"
          className="absolute top-0 left-0 opacity-25"
        />
      </Link>
      {showBalance && <Copy title={account?.sharableId}/>}
    </div>
  );
};

export default BankCard;