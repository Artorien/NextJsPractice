"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "./style.scss";

export default function Header() {
  return (
    <header className="flex py-[35px] px-[50px] justify-between overflow-hidden header-element mb-[50px]">
      <motion.div
        className="items-center flex w-[35px] justify-between col-start-2"
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-[2rem] p-0">MyBook</h1>
        <div className="relative">
          <motion.input
            type="text"
            placeholder="Search..."
            className="rounded-2xl border-[#9b9b9b] border px-[15px] py-[3px] ml-[100px] w-[350px] pl-[30px]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search absolute top-[5px] left-[106px] opacity-[0.8]"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </motion.div>
      <motion.div
        className="items-center flex"
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link href={"/profile"}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGnT4JDrTDMUXbVYJOcKk1Znmy_V-vck7Ng&s"
            alt="profile-image"
            className="w-[40px] h-[40px] rounded-[50%]"
          />
        </Link>
      </motion.div>
    </header>
  );
}
