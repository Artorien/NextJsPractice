"use client";

import { motion } from "framer-motion";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="w-full h-full childContainer rounded-2xl p-[30px] mr-[50px]"
      transition={{ type: "spring", damping: 18, mass: 0.75 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
