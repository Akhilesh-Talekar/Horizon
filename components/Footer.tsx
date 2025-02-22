import React from "react";
import Image from "next/image";
import { logOut } from "../lib/actions/user.actions";
import { useRouter } from "next/navigation";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const loggedOut = await logOut();

    router.push("/sign-in");
  };
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">
          {user ? `${user.firstName[0]}${user.lastName[0]}` : "G"}
        </p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate font-semibold text-gray-600">
          {user ? `${user.firstName} ${user.lastName}` : "Guest"}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user ? user.email : "guest@gmail.com"}
        </p>
      </div>
      <div className="footer_image" onClick={handleLogout}>
        <Image src="icons/logout.svg" alt="logout" width={25} height={25} />
      </div>
    </footer>
  );
};

export default Footer;
