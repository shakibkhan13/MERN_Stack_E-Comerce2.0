"use client"

import { fetchData } from '@/lib/api';
import { Product } from '@/types/type'
import React, { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton';
import { ArrowRight, MapPin, Plane } from 'lucide-react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import ProductCard from '../common/ProductCard';
import { Card, CardContent } from '../ui/card';


interface ProductProps {
    products: Product[];
    total: number;
}

const TravelSection = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response: ProductProps = await fetchData<ProductProps>(
                    '/products'
                )
                setProducts(response?.products?.slice(0, 8) || []);

            } catch (error) {
                console.error("Failed to travel products: ", error);
            } finally {
                setLoading(false);
            }
        }; 
        loadProducts(); 
    }, []);

    if (loading) {
        return (
            <div
                className='py-12'
            >
                <div
                    className='flex items-center justify-between mb-0'
                >
                    <div
                        className='space-y-2'
                    >
                        <Skeleton className='h-8 w-64' />
                        <Skeleton className='h-4 w-80' />
                    </div>
                    <Skeleton className='h-10 w-32' />
                </div>
                <div
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
                >
                    {
                        [...Array(8)].map((_, index) => (
                            <div
                                key={index}
                                className='space-y-4'
                            >
                                <Skeleton className='h-48 w-full rounded-lg' />
                                <Skeleton className='h-4 w-3/4' />
                                <Skeleton className='h-4 w-1/2' />
                                <Skeleton className='h-8 w-1/4' />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    return (
        <div
            className='py-12 bg-white p-5 mt-5 rounded-md border'
        >
            <div
                className='flex items-center justify-between mb-8'
            >
                <div
                    className='space-y-2'
                >
                    <div
                        className='flex items-center gap-2'
                    >
                        <Plane className='w-5 h-5 text-gray-500' />
                        <Badge
                            variant="outline"
                            className='text-gray-500 border-gray-400'
                        >
                            Travel Ready
                        </Badge>
                    </div>
                    <h2
                        className='text-2xl md:text-3xl font-bold text-gray-500'
                    >
                        Travel Essentials
                    </h2>
                    <p
                        className='text-gray-600'
                    >
                        Everything you need for safe and comfortable travels with your little one .
                    </p>
                </div>
                <Link
                    href={"/shop?category=travel"}
                >
                    <Button
                        variant="outline"
                        className='hidden md:flex items-center gap-2 hover:bg-gray-500 hover:text-white hover:border-gray-500 transition-colors'
                    >
                        Shop All Items
                    </Button>
                </Link>
            </div>

            <div 
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'
            >
                {
                    products?.length > 0 ? (
                        products?.map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                            />
                        ))
                    ) : (
                        <>
                            <Card
                                className='group hover:shadow-lg transition-all duration-300 cursor-pointer'
                            >
                                <CardContent
                                    className='p-6'
                                >
                                    <div
                                        className='bg-blue-50 rounded-lg p-4 mb-4'
                                    >
                                        <Plane className='w-8 h-8 text-blue-600 mx-auto' />
                                    </div>
                                    <h3 className='font-semibold text-lg mb-2'>
                                        Travel Strollers
                                    </h3>
                                    <p
                                        className='text-gray-600 text-sm mb-4'
                                    >
                                        Lightweight and compact strollers perfect for travel
                                    </p>
                                    <Link
                                        href="/shop?search=stroller"
                                    >
                                        <Button
                                            className='w-full bg-gray-500 hover:bg-gray-500/90'
                                        >
                                            Shop Now
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card
                                className='group hover:shadow-lg transition-all duration-300 cursor-pointer'
                            >
                                <CardContent
                                    className='p-6'
                                >
                                    <div
                                        className='bg-green-50 rounded-lg p-4 mb-4'
                                    >
                                        <MapPin className='w-8 h-8 text-green-600 mx-auto' />
                                    </div>
                                    <h3
                                        className='font-semibold text-lg mb-2'
                                    >
                                        Car seats
                                    </h3>
                                    <p
                                        className='text-gray-600 text-sm mb-4'
                                    >
                                        Safe and secure car seats for every journey
                                    </p>
                                    <Link
                                        href="/shop?search=car seat"
                                    >
                                        <Button 
                                            className='w-full bg-gray-500 hover:bg-gray-500/90'
                                        >
                                            Shop Now
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card
                                className='group hover:shadow-lg transition-all duration-300 cursor-pointer'
                            >
                                <CardContent
                                    className='p-6'
                                >
                                    <div
                                        className='bg-blue-50 rounded-lg p-4 mb-4'
                                    >
                                        <Plane className='w-8 h-8 text-blue-600 mx-auto' />
                                    </div>
                                    <h3
                                        className='font-semibold text-lg mb-2'
                                    >
                                        Travel Bags
                                    </h3>
                                    <p
                                        className='text-gray-600 text-sm mb-4'
                                    >
                                        Organized storage for all your baby&apos;s travel needs
                                    </p>
                                    <Link
                                        href="/shop?search=diaper bag"
                                    >
                                        <Button
                                            className='w-full bg-gray-500 hover:bg-gray-500/90'
                                        >
                                            Shop Now
                                        </Button>
                                    
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card
                                className='group hover:shadow-lg transition-all duration-300 cursor-pointer'
                            >
                                <CardContent
                                    className='p-6'
                                >
                                    <div
                                        className='bg-orange-50 rounded-lg p-4 mb-4'
                                    >
                                        <MapPin className='w-8 h-8 text-orange-600 mx-auto' />
                                    </div>
                                    <h3
                                        className='font-semibold text-lg mb-2'
                                    >
                                        Baby Carriers
                                    </h3>
                                    <p
                                        className='text-gray-600 text-sm mb-4'
                                    >
                                        Comfortable carriers for hands-free travel
                                    </p>
                                    <Link
                                        href="/shop?search=carrier"
                                    >
                                        <Button
                                            className='w-full bg-gray-500 hover:bg-gray-500/90'
                                        >
                                            Shop Now
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </>
                    )
                }
            </div>

            <div 
                className='bg-linear-to-r from-gray-500 to-blue-600 rounded-2xl p-8 text-white'
            >
                <div
                    className='flex flex-col md:flex-row items-center justify-between'
                >
                    <div
                        className='text-center md:text-left mb-4 md:mb-0'
                    >
                        <h3
                            className='text-2xl font-bold mb-2'
                        >Travel Smart</h3>
                        <p
                            className='text-blue-100'
                        >
                            Discover our curated collection of travel essentials for stress-free adventures
                        </p>
                    </div>
                    <Link
                        href="/shop?category=travel"
                    >
                        <Button
                            size='lg'
                            variant='outline'
                            className='bg-white text-gray-500 border-white hover:bg-gray-200'
                        >
                            Explore Collection
                            <ArrowRight className='w-4 h-4 ml-2' />
                        </Button>
                    </Link>
                </div>
            </div>

            <div
                className='mt-8 text-center md:hidden'
            >
                <Link
                    href="/shop?category=travel"
                >
                    <Button
                        className='w-full bg-gray-500 hover:bg-gray-500/90'
                    >
                        Shop All Travel Items
                        <ArrowRight className='w-4 h-4 ml-2' />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default TravelSection
