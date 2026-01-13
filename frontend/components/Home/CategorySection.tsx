import { fetchData } from '@/lib/api';
import { Category } from '@/types/type'
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface CategoryProps {
    categories: Category[];
}

const CategorySection = async () => {

    let categories: Category[] = [];
    // let error: string | null = null; 

    try {
        const data = await fetchData<CategoryProps>("/category");
        categories = data?.categories;

    } catch (error) {
        error = error instanceof Error ? error.message : "An unknown error occurred";
        console.log("Category Error : ", error);
    }

    const featuredCategories = categories.filter(
        (cat) => cat.categoryType === "Featured"
    );

    const hotCategories = categories.filter(
        (cat) => cat.categoryType === "Hot Categories"
    );


    return (
        <div
            className='hidden md:inline-flex flex-col bg-white h-full p-5 border rounded-md'
        >
            <p
                className='font-semibold text-lg mb-3'
            >
                Featured
            </p>
            <div
                className='mb-6'
            >
                {
                    featuredCategories.length > 0 ? (
                        featuredCategories?.map((item, index) => (
                            <Link
                                key={index}
                                href={{
                                    pathname: "/shop",
                                    query: { category: item?._id }
                                }}
                                className='flex items-center gap-2 hover:text-gray-700 hover:bg-gray-500/10 p-3 rounded-md hoverEffect'
                            >
                                <Image
                                    src={item?.image}
                                    alt={item?._id}
                                    width={50}
                                    height={50}
                                    className='w-7'
                                />
                                <p>
                                    {item?.name}
                                </p>
                            </Link>
                        ))
                    ) : (
                        <p
                            className='text-gray-500'
                        >
                            No featured categories available
                        </p>

                    )
                }
            </div>
            <p
                className='font-semibold text-lg mb-3'
            >
                Hot Categories
            </p>
            <div>
                {hotCategories.length > 0 ? (
                    hotCategories.map((item) => (
                        <Link
                            href={{
                                pathname: "/shop",
                                query: { categories: item._id }
                            }}
                            key={item._id}
                            className='flex items-center gap-2 hover:text-gray-700 hover:bg-gray-500/10 p-3 rounded-md hoverEffect'
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                                className='w-7'
                            />
                            <p>{item.name}</p>
                        </Link>
                    ))
                ) : <p
                    className='text-gray-500'
                >
                    No hot categories available
                </p>
                }
            </div>

            <div
                className='mt-6 pt-6 border-t border-gray-200'
            >
                <p
                    className='font-semibold text-lg mb-3'
                >
                    Quick Links
                </p>
                <div
                    className='space-y-2'
                >
                    <Link
                        href="/shop"
                        className='flex items-center gap-2 hover:text-gray-500 hover:bg-gray-500/10 p-2 rounded-md hoverEffect text-sm'
                    >
                        <span className='text-gray-500'>🛍️</span>
                        <p>All Products</p>
                    </Link>
                    <Link
                        href="/shop?sortOrder=desc"
                        className='flex items-center gap-2 hover:text-gray-500 hover:bg-gray-500/10 p-2 rounded-md text-sm hoverEffect'
                    >
                        <span className="text-gray-500">🆕</span>
                        <p>New Arrivals</p>
                    </Link>
                    <Link
                        href="/shop?priceRange=0-50"
                        className='flex items-center gap-2 hover:text-gray-500 hover:bg-gray-500/10 p-2 rounded-md text-sm hoverEffect'
                    >
                        <span className='text-gray-500'>💰</span>
                        <p>Under $50</p>
                    </Link>
                    <Link
                        href="/user/orders"
                        className='flex items-center gap-2 hover:text-gray-500 hover:bg-gray-500/10 p-2 rounded-md text-sm hoverEffect'
                    >
                        <span>📦</span>
                        <p>My Orders</p>
                    </Link>
                </div>
            </div>


            <div
                className='mt-6 pt-6 border-t border-gray-200'
            >
                <p
                    className='font-semibold text-lg mb-3'
                >
                    Customer Support
                </p>

                <div
                    className='space-y-2'
                >
                    <Link
                        href='/help'
                        className='flex items-center gap-2 hover:text-gray-500 hover:bg-gray-500/10 p-2 rounded-md hoverEffect text-sm'

                    >
                        <span className='text-gray-500'>❓</span>
                        <p>Help Center</p>
                    </Link>

                    <Link
                        href="/help/shipping"
                        className='flex items-center gap-2 hover:text-gray-500 hover:bg-gray-500/10 p-2 rounded-md hoverEffect text-sm'
                    >
                        <span className='text-gray-500'>🚚</span>
                        <p>Shipping Info</p>
                    </Link>
                    <Link
                        href='/help/returns'
                        className='flex items-center gap-2 hover:text-gray-500 hover:bg-gray-500/10 p-2 rounded-md hoverEffect text-sm'
                    >
                        <span className='text-gray-500'>↩️</span>
                        <p>Returns & Exchange</p>
                    </Link>
                    <Link
                        href="/help/contact"
                        className='flex items-center gap-2 hover:text-gray-500 hover:bg-gray-500/10 p-2 rounded-md hoverEffect text-sm'
                    >
                        <span className='text-gray-500'>📞</span>
                        <p>Contact Us</p>
                    </Link>
                </div>
            </div>

            <div
                className='mt-6 pt-6 border-t border-gray-200'
            >
                <p
                    className='font-semibold text-lg mb-3'
                >
                    Special Offers
                </p>
                <div
                    className='bg-linear-to-r from-gray-500/10 to-gray-500/5 p-3 rounded-md'
                >
                    <div
                        className='flex items-center gap-2 mb-2'
                    >
                        <span className='text-gray-500'>🎉</span>
                        <p className='font-medium text-sm'>Free Shipping</p>
                    </div>
                    <p
                        className='text-xs text-gray-600 mb-2'
                    >
                        On orders over $75
                    </p>
                    <Link
                        href="/shop"
                        className='flex items-center gap-1 text-xs text-gray-500 hover:underline font-medium'
                    >
                        Shop <ArrowRight height={15} width={15} />
                    </Link>
                </div>
            </div>

            <div
                className="mt-6 pt-6 border-t border-gray-200"
            >
                <p
                    className="font-semibold text-lg mb-4 text-gray-800"
                >
                    Shop by Age
                </p>

                <div
                    className="grid grid-cols-2 gap-3"
                >
                    <Link
                        href="/shop?search=newborn"
                        className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 
                        hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                    >
                        <span
                            className="text-3xl group-hover:scale-110 transition-transform"
                        >
                            👶
                        </span>
                        <p
                            className="text-sm font-medium text-gray-700 group-hover:text-gray-900"
                        >
                            0–6 Months
                        </p>
                    </Link>

                    <Link
                        href="/shop?search=infant"
                        className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 
                         hover:border-gray-300 hover:bg-gray-300/10 transition-all duration-200"
                    >
                        <span
                            className="text-3xl group-hover:scale-110 transition-transform"
                        >
                            🍼
                        </span>
                        <p
                            className="text-sm font-medium text-gray-700 group-hover:text-gray-900"
                        >
                            6–12 Months
                        </p>
                    </Link>

                    <Link
                        href="/shop?search=toddler"
                        className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 
                        hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                    >
                        <span
                            className="text-3xl group-hover:scale-110 transition-transform"
                        >
                            🚼
                        </span>
                        <p
                            className="text-sm font-medium text-gray-700 group-hover:text-gray-900"
                        >
                            1–2 Years
                        </p>
                    </Link>

                    <Link
                        href="/shop?search=kids"
                        className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 
                            hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                    >
                        <span
                            className="text-3xl group-hover:scale-110 transition-transform"
                        >
                            👧
                        </span>
                        <p
                            className="text-sm font-medium text-gray-700 group-hover:text-gray-900"
                        >
                            2+ Years
                        </p>
                    </Link>
                </div>
            </div>


        </div>
    )
}

export default CategorySection