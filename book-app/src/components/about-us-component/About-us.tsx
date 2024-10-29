"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function AboutUs() {
  const block1 = useRef(null);
  const block2 = useRef(null);
  const [visibleBlockOne, setVisibleBlockOne] = useState(false);
  const [visibleBlockTwo, setVisibleBlockTwo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleBlockOne(true);
        }
      },
      {
        threshold: 0.1,
      }
    );
    if (block1.current) {
      observer.observe(block1.current);
    }

    return () => {
      if (block1.current) {
        observer.unobserve(block1.current);
      }
    };
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleBlockTwo(true);
        }
      },
      {
        threshold: 0.5,
      }
    );
    if (block2.current) {
      observer.observe(block2.current);
    }

    return () => {
      if (block2.current) {
        observer.unobserve(block2.current);
      }
    };
  });

  return (
    <>
      <div className="flex items-center flex-col p-[90px]">
        <h1 className="text-[3rem] mb-[40px]">Welcome to MyBook</h1>
        <div className="flex justify-center items-center">
          <p className="w-[50%] text-[1.3rem] pr-[100px]">
            Our application allows you to comfortably buy an online book of any
            kind! From intriguing drama to calculus or engineering
          </p>
          <div className="w-[50%] flex justify-end">
            <img src="/images/pile-of-books.webp" alt="books"></img>
          </div>
        </div>
        <motion.div
          className="flex justify-center items-center"
          transition={{ type: "spring", damping: 18, mass: 0.75 }}
          initial={{ opacity: 0, y: 100 }}
          animate={
            visibleBlockOne ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
          }
          ref={block1}
        >
          <div className="w-[50%] flex justify-start">
            <img src="/images/reading-changed.webp" alt="books"></img>
          </div>
          <p className="w-[50%] text-[1.3rem] pl-[68px]">
            We've collected more than 30.000 books around the world so you would
            never face a problem of not finding a book of your liking!
          </p>
        </motion.div>
        <motion.div
          className="flex justify-center items-center"
          transition={{ type: "spring", damping: 18, mass: 0.75 }}
          initial={{ opacity: 0, y: 100 }}
          animate={
            visibleBlockTwo ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
          }
          ref={block2}
        >
          <p className="w-[50%] text-[1.3rem] pr-[68px]">
            You can edit your book! If you need to highlight something important
            or to leave a note for yourself - MyBook will provide you with
            everything needed.
          </p>
          <div className="w-[50%] flex justify-end">
            <img src="/images/ok.webp" alt="books"></img>
          </div>
        </motion.div>
      </div>
    </>
  );
}
