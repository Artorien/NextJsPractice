import Header from "@/components/header-component/Header";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  return <>{redirect("/library")}</>;
}
