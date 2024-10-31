"use client";

import { useAuth } from "@/contexts/Auth-context";
import Choice from "@/components/new-user-component/Registration-or-login";
import UserProfile from "@/components/profile-component/Profile";

export default function Profile() {
  const { user } = useAuth();

  console.log("User: " + user);

  return <>{user == null ? <Choice></Choice> : <UserProfile></UserProfile>}</>;
}
