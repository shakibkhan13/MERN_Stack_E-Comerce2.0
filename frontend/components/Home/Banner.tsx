"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/lib/api";
import { Banners } from "@/types/type";

const Banner = () => {
  const [banners, setBanners] = useState<Banners[]>([]);
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData<Banners[]>("/banners");
        setBanners(res || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      setNext((current + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current, banners]);

  if (!banners.length) return null;

  const currentBanner = banners[current];
  const nextBanner = next !== null ? banners[next] : null;

  return (
    <div className="relative w-full h-105 md:h-140 overflow-hidden rounded-3xl shadow-lg bg-black">

      {/* Current Image */}
      <Image
        src={currentBanner.image}
        alt={currentBanner.name}
        fill
        priority
        className="object-cover"
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="px-6 md:px-14 max-w-2xl text-white space-y-5">
          <p className="uppercase tracking-widest text-sm">
            {currentBanner.name}
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {currentBanner.title}
          </h1>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-black px-7 py-3 
                       rounded-full font-medium hover:bg-gray-200 transition"
          >
            Shop Now →
          </Link>
        </div>
      </div>

      {/* Next Image slides over */}
      {nextBanner && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 z-30"
          onAnimationComplete={() => {
            setCurrent(next);
            setNext(null);
          }}
        >
          <Image
            src={nextBanner.image}
            alt={nextBanner.name}
            fill
            className="object-cover"
          />
        </motion.div>
      )}
    </div>
  );
};

export default Banner;
