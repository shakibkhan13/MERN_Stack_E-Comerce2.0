import { cn } from "@/lib/utils";
import React from "react";
interface Props {
    discountPercentage: number;
    className?: string;
}
const DiscountBadge = ({ discountPercentage, className }: Props) => {
    return (
        <span
            className={cn(
                "block bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold",
                className
            )}
        >
            -{discountPercentage}%
        </span>
    );
};

export default DiscountBadge;