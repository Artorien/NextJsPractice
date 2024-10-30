import { useAuth } from "@/contexts/Auth-context";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function VerificationProcess() {
  const { verification, verificationMessage } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = router.query;
    verification(token);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <p>{verificationMessage}</p>
    </div>
  );
}
