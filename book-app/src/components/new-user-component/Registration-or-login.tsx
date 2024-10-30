import Link from "next/link";
import "./style.scss";

export default function Choice() {
  return (
    <div className="flex justify-center items-center my-[50px] flex-col">
      <h1 className="text-[2rem]">Welcome to MyBook</h1>
      <div className="mt-[25px]">
        <Link href={"/registration"}>
          <button className="border rounded-2xl py-[5px] px-[15px] text-[1.3rem] signup mr-[25px]">
            Sign Up
          </button>
        </Link>
        <Link href={"/login"}>
          <button className="border rounded-2xl py-[5px] px-[15px] text-[1.3rem] signin">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
