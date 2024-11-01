"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/Auth-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginMessage, login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col pt-[50px]">
      <h2 className="text-[2rem] mb-[25px]">Sign In here</h2>
      <div className="bg-[#f7f7f7] rounded-xl p-[30px]">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          <div className="flex gap-8">
            <div className="flex flex-col">
              <p>{loginMessage}</p>
              <label htmlFor="email" className="mb-[5px]">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="rounded-xl py-[5px] px-[15px]"
                placeholder="example@email.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-[5px]">
                Password
              </label>
              <input
                type="text"
                className="rounded-xl py-[5px] px-[15px]"
                placeholder="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="py-[5px] px-[15px] bg-white rounded-xl w-[150px]"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
      <Link href={"/profile"}>
        <button className="py-[5px] px-[15px] border rounded-xl w-[150px] mt-[25px] goback">
          Go Back
        </button>
      </Link>
    </div>
  );
}
