import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const WishlistIcon = () => {
    return (
        <Link
            href={"/user/wishlist"}
            className="relative hover:text-gray-400 hoverEffect"
        >
            <Heart size={24} />
            <span className="absolute -right-2 -top-2 bg-gray-400 text-white text-[11px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                0
            </span>
        </Link>
    );
};

export default WishlistIcon;