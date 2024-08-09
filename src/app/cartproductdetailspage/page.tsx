"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation'; // Adjust import according to your setup

import {
    FaRegStar,
    FaUserCircle,
    FaStarHalfAlt,
    FaThumbsDown,
    FaStar,
    FaCartPlus,
    FaBoxOpen,
    FaTruck,
    FaShare,
    FaBox,
    FaCreditCard,
    FaFile,
    FaHeadphones,
    FaQuestionCircle,
    FaTimesCircle,
    FaMoneyBill,
    FaHeart,
    FaMapMarkerAlt
} from "react-icons/fa";

interface Review {
    id: number;
    name: string;
    rating: number;
    comment: string;
}

interface Address {
    _id?: string;
    name: string;
    email: string;
    room: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
}

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    reviewCount: number;
    description: string;
    brand: string;
    originalPrice: number;
    discountPercentage: number;
    quantity: number;
    category?: string;
    stock?: number;
}

const CartProductDetailsPage = () => {
    const [quantity, setQuantity] = useState<number>(1);
    const [product, setProduct] = useState<Product | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [cart, setCart] = useState<Product[]>([]);
    const [coupon, setCoupon] = useState<string>("");
    const [discount, setDiscount] = useState<number>(0);
    const [shipping, setShipping] = useState<number>(0);
    const [requestGST, setRequestGST] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const router = useRouter(); // Initialize router
    const [location, setLocation] = useState('');
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const searchParams = useSearchParams(); // Initialize searchParams
    const coupons: { [key: string]: number } = {
        DISCOUNT100: 100,
        DISCOUNT150: 150,
    };

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState({
        name: "",
        rating: 0,
        comment: "",
    });
    const [showReviews, setShowReviews] = useState(false);

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };

    const calculateGST = (price: number, gstRate: number = 18) => {
        return price * (gstRate / 100);
    };


    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get("http://localhost:8080/address");
                setAddresses(response.data);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };

        fetchAddresses();
    }, []);




    useEffect(() => {
        // Get product data from URL parameters
        const productParam = searchParams.get("product");
        const couponParam = searchParams.get("coupon");

        if (productParam) {
            const decodedProduct = decodeURIComponent(productParam);
            const parsedProduct: Product = JSON.parse(decodedProduct);
            setProduct(parsedProduct);
        }

        if (couponParam) {
            setCoupon(couponParam);
        }
    }, [searchParams]);

    useEffect(() => {
        if (product) {
            axios
                .get(`http://localhost:8080/api/reviews?productId=${product._id}`)
                .then((response) => {
                    setReviews(response.data);
                });
        }
    }, [product]);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (product) {
            try {
                const response = await axios.post(`http://localhost:8080/api/reviews`, {
                    ...newReview,
                    productId: product._id,
                });
                setReviews([...reviews, response.data]);
                setNewReview({ name: "", rating: 0, comment: "" });
                setShowForm(false);
            } catch (error) {
                console.error("Error submitting review:", error);
            }
        }
    };


    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-500" />);
        }
        if (halfStar) {
            stars.push(<FaStarHalfAlt key={fullStars} className="text-yellow-500" />);
        }
        while (stars.length < 5) {
            stars.push(<FaRegStar key={stars.length} className="text-yellow-500" />);
        }

        return stars;
    };

    const handleRemoveProduct = () => {
        setProduct(null);
    };

    const handleAddToCart = (product: Product) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingProductIndex = cart.findIndex(
            (item: Product) => item._id === product._id
        );

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
    };

    const handleAddToWishlist = (product: Product) => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        const existingProduct = wishlist.find(
            (item: Product) => item._id === product._id
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
            alert("Product already exists in wishlist. Quantity updated!");
        } else {
            wishlist.push({ ...product, quantity: 1 });
            alert("Product added to wishlist!");
        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    };


    useEffect(() => {
        const totalPrice = getTotalPriceWithoutExtras();
        setShipping(totalPrice * 0.02);
    }, [cart]);

    const getTotalPriceWithoutExtras = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getTotalPrice = () => {
        const totalPrice = getTotalPriceWithoutExtras();
        const gstRate = 0.18;
        const gstAmount = totalPrice * gstRate;
        const totalWithGst = totalPrice + gstAmount;
        const totalWithShipping = totalWithGst + shipping;
        const totalWithDiscount = totalWithShipping - discount;
        return {
            totalPrice,
            gstAmount,
            totalWithGst,
            totalWithShipping,
            totalWithDiscount,
        };
    };

    const handleApplyCoupon = () => {
        if (coupons[coupon]) {
            setDiscount(coupons[coupon]);
        } else {
            alert("Invalid coupon code");
            setDiscount(0);
        }
    };

    const handleCartQuantityChange = (
        productId: string,
        action: "increase" | "decrease"
    ) => {
        const updatedCart = cart.map((item) => {
            if (item._id === productId) {
                return {
                    ...item,
                    quantity:
                        action === "increase"
                            ? item.quantity + 1
                            : Math.max(item.quantity - 1, 1),
                };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const handleCartRemove = (productId: string) => {
        const updatedCart = cart.filter((item) => item._id !== productId);
        setCart(updatedCart);
    };


    const {
        totalPrice,
        gstAmount,
        totalWithGst,
        totalWithShipping,
        totalWithDiscount,
    } = getTotalPrice();

    const handleCheckout = () => {
        const cartToCheckout = cart.length > 0 ? cart : [product]; // Include product if cart is empty
        const cartString = JSON.stringify(cartToCheckout);
        const encodedCart = encodeURIComponent(cartString);
        const couponQuery = coupon ? `&coupon=${coupon}` : "";
        router.push(`/checkout2?cart=${encodedCart}${couponQuery}`);
    };





    if (!product) {
        return <div>Loading...</div>;
    }

    const handleBuyNow = (product: Product) => {
        const productQueryString = encodeURIComponent(JSON.stringify(product));
        router.push(`/Buynowhomepage?product=${productQueryString}`);
    };

    return (
        <div className="px-4 mt-[90px] bg-gray-100">
            <div className="lg:w-[96%] md:w-[96%] w-full flex lg:flex-row ml-[65px] md:flex-row flex-col gap-4 relative">
                <div className="w-full grow">
                    <div className="grid mt-5 lg:grid-cols-2">
                        <div className="w-full flex flex-col bg-white p-4 rounded-[5px]">
                            <div className="w-full relative flex items-center justify-center">
                                <div className="absolute top-0 right-0 h-8 w-8 border-[1px] flex justify-center items-center border-primary/30 shadow-lg shadow-black/10">
                                    <FaShare className="text-blue-500 text-lg" />
                                </div>
                                <div className="absolute top-10 right-0 h-8 w-8 border-[1px] flex justify-center items-center border-primary/30 shadow-lg shadow-black/10">
                                    <FaHeart className="text-red-500 text-lg" />
                                </div>

                                <Image
                                    className="w-auto h-64"
                                    src={product.image}
                                    alt={product.name}
                                    width={500}
                                    height={400}
                                />
                            </div>

                            <div className="w-full flex overflow-x-auto justify-center gap-6 mt-4">
                                <Image
                                    className="h-24 w-24 rounded-[5px] shadow-lg shadow-black/20"
                                    src={product.image}
                                    alt="Product Thumbnail"
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    className="h-24 w-24 rounded-[5px] shadow-lg shadow-black/20"
                                    src={product.image}
                                    alt="Product Thumbnail"
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    className="h-24 w-24 rounded-[5px] shadow-lg shadow-black/20"
                                    src={product.image}
                                    alt="Product Thumbnail"
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    className="h-24 w-24 rounded-[5px] shadow-lg shadow-black/20"
                                    src={product.image}
                                    alt="Product Thumbnail"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-col bg-white p-4 rounded-[5px]">
                            <div className="px-2 py-2 border-[1px] border-primary/80 bg-primary/5 text-primary font-semibold text-sm rounded-[5px]">
                                <span>
                                    The same product has been ordered by you on 9 July 2024 at
                                    00:18 AM
                                </span>
                            </div>

                            <div className="flex mt-2 gap-2 mt-4">
                                <a
                                    href={`/product?id=${product._id}`}
                                    className="text-3xl font-bold text-black hover:underline"
                                >
                                    <span className="text-3xl font-bold">{product.name}</span>
                                </a>
                                <p className="text-gray-500">{product.description}</p>
                            </div>
                            <div className="flex mt-2 gap-2 mt-4">
                                <button className="bg-green-500 text-white font-bold text-xs px-1 rounded-[3px] flex items-center gap-1">
                                    {product.rating} <FaStar className="text-[10px]" />
                                </button>

                                <span className="text-[13px] text-black/70">
                                    ({product.reviewCount} Reviews)
                                </span>
                                <button
                                    onClick={() => handleAddToWishlist(product)}
                                    className="top-10 right-0 h-8 w-8 border-[1px] flex justify-center items-center border-primary/30 shadow-lg shadow-black/10"
                                >
                                    <FaHeart className="text-red-500 text-lg" />
                                </button>
                            </div>

                            <div className="flex mt-1 gap-2 mt-4">
                                <p className="text-sm font-normal text-lightText">
                                    ₹ {product.price.toLocaleString()} ( Inclusive of all taxes )
                                </p>
                            </div>
                            <div className="flex items-end mt-2">
                                <span className="text-3xl font-bold text-black mr-2">
                                    ₹ {product.originalPrice.toLocaleString()}
                                </span>
                                <div className="text-md font-semibold text-gray-500">
                                    (GST: ${calculateGST(product.price).toFixed(2)})
                                </div>
                            </div>
                            <p className="text-sm font-normal text-lightText">
                                MRP{" "}
                                <span className="line-through">
                                    ₹ {product.price.toLocaleString()}
                                </span>{" "}
                                <span className="font-semibold text-lg text-green ml-1">
                                    {product.discountPercentage}% OFF
                                </span>
                            </p>

                            <div className="mt-1 gap-2">
                                <span className="text-[14px] font-semibold text-black/50">
                                    By: {product.brand}
                                </span>

                                <div className="items-center gap-2">
                                    <div className="flex mt-2 gap-2 mt-6">
                                        <span className="text-md font-semibold">Normal Size</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <button className="border-[1px] border-primary/80 text-primary bg-primary/20 py-0.5 px-2 rounded-[5px] font-semibold text-md">
                                            2.5 Sqmm
                                        </button>
                                        <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">
                                            0.7 Sqmm
                                        </button>
                                        <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">
                                            1.5 Sqmm
                                        </button>
                                        <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">
                                            2.5 Sqmm
                                        </button>
                                        <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">
                                            4.5 Sqmm
                                        </button>
                                        <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">
                                            6.5 Sqmm
                                        </button>
                                    </div>

                                    <div className="flex mt-2 gap-2 mt-6">
                                        <span className="text-md font-semibold">Color</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <button className="border-[1px] border-primary/80 text-primary bg-primary/20 py-0.5 px-2 rounded-[5px] font-semibold text-md">
                                            Black
                                        </button>
                                        <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">
                                            Red
                                        </button>
                                        <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">
                                            Blue
                                        </button>
                                        <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">
                                            Green
                                        </button>
                                        <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">
                                            Yellow
                                        </button>
                                        <button className="border-[1px] border-black/60 text-black/60 py-0.5 px-2 rounded-[5px] font-semibold text-md">
                                            White
                                        </button>
                                    </div>

                                    <div className="mt-9 border border-green-500 bg-green-100 p-4 rounded-lg shadow-md">
                                        <h3 className="text-lg font-bold mb-4 text-green-800">Offers and Coupons</h3>

                                        <div className="flex flex-col gap-4">
                                            {/* Coupon 1 */}
                                            <div className="p-6 rounded-lg flex items-start gap-4">
                                                <i className="fa fa-money-bill text-2xl text-green-600"></i>
                                                <div className="flex flex-col flex-grow">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-grow">
                                                            <span className="font-normal text-sm text-gray-700 mt-1">
                                                                Get flat Rs 100 Off on Wires & Cables | Min cart value Rs 4,000
                                                            </span>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="ml-5 font-semibold text-lg text-green-800 border-2 border-green-500 border-dashed p-1">
                                                                <span className="font-semibold text-lg text-green-800 ml-4">DISCOUNT100</span>
                                                            </div>
                                                            <button
                                                                onClick={() => handleCopyToClipboard('DISCOUNT100')}
                                                                className="text-sm text-blue-500 hover:underline mt-2 ml-4"
                                                            >
                                                                Click to Copy
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            {/* Conditionally render additional coupons */}
                                            {showMore && (
                                                <>
                                                    <div className=" p-6 rounded-lg flex items-start gap-4">
                                                        <i className="fa fa-money-bill text-2xl text-green-600"></i>
                                                        <div className="flex flex-col flex-grow">
                                                            <div className="flex justify-between items-start">
                                                                <div className="flex-grow">
                                                                    <span className="font-normal text-sm text-gray-700 mt-1">
                                                                        Get flat Rs 100 Off on Wires & Cables | Min cart value Rs 4,000
                                                                    </span>
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="ml-5 font-semibold text-lg text-green-800 border-2 border-green-500 border-dashed p-1">
                                                                        <span className="font-semibold text-lg text-green-800 ml-4">DISCOUNT150</span>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleCopyToClipboard('DISCOUNT150')}
                                                                        className="text-sm text-blue-500 hover:underline mt-2 ml-4"
                                                                    >
                                                                        Click to Copy
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className=" p-6 rounded-lg flex items-start gap-4">
                                                        <i className="fa fa-money-bill text-2xl text-green-600"></i>
                                                        <div className="flex flex-col flex-grow">
                                                            <div className="flex justify-between items-start">
                                                                <div className="flex-grow">
                                                                    <span className="font-normal text-sm text-gray-700 mt-1">
                                                                        Get flat Rs 100 Off on Wires & Cables | Min cart value Rs 4,000
                                                                    </span>
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="ml-5 font-semibold text-lg text-green-800 border-2 border-green-500 border-dashed p-1">
                                                                        <span className="font-semibold text-lg text-green-800 ml-4">DISCOUNT200</span>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleCopyToClipboard('DISCOUNT200')}
                                                                        className="text-sm text-blue-500 hover:underline mt-2 ml-4"
                                                                    >
                                                                        Click to Copy
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className=" p-6  rounded-lg flex items-start gap-4">
                                                        <i className="fa fa-money-bill text-2xl text-green-600"></i>
                                                        <div className="flex flex-col flex-grow">
                                                            <div className="flex justify-between items-start">
                                                                <div className="flex-grow">
                                                                    <span className="font-normal text-sm text-gray-700 mt-1">
                                                                        Get flat Rs 100 Off on Wires & Cables | Min cart value Rs 4,000
                                                                    </span>
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="ml-5 font-semibold text-lg text-green-800 border-2 border-green-500 border-dashed p-1">
                                                                        <span className="font-semibold text-lg text-green-800 ml-4">DISCOUNT250</span>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleCopyToClipboard('DISCOUNT250')}
                                                                        className="text-sm text-blue-500 hover:underline mt-2 ml-4"
                                                                    >
                                                                        Click to Copy
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {/* Button to toggle additional coupons */}
                                            <button
                                                onClick={() => setShowMore(!showMore)}
                                                className="mt-4 py-2 px-4 rounded-lg text-blue-500 font-semibold transition ease-in-out duration-300"
                                            >
                                                {showMore ? 'Show Less' : 'Show More'}
                                                <div className="my-4 border-t border-gray-300"></div>
                                            </button>
                                        </div>
                                    </div>


                                    <div className="flex mt-2 gap-2 mt-6">
                                        <span className="text-md font-semibold">
                                            Buy More & Save More
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-semibold text-md flex gap-2 flex-col items-center">
                                            <span>Qty 2-4</span>
                                            <span>
                                                ₹1,663 <span className="font-normal text-xs">/pc</span>
                                            </span>
                                            <span className="text-green font-bold">77% OFF</span>
                                        </button>
                                        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-semibold text-md flex gap-2 flex-col items-center">
                                            <span>Qty 5-10</span>
                                            <span>
                                                ₹1,663 <span className="font-normal text-xs">/pc</span>
                                            </span>
                                            <span className="text-green font-bold">77% OFF</span>
                                        </button>
                                        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-semibold text-md flex gap-2 flex-col items-center">
                                            <span>Qty 11-20</span>
                                            <span>
                                                ₹1,663 <span className="font-normal text-xs">/pc</span>
                                            </span>
                                            <span className="text-green font-bold">77% OFF</span>
                                        </button>
                                        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-semibold text-md flex gap-2 flex-col items-center">
                                            <span>Qty 21-50</span>
                                            <span>
                                                ₹1,663 <span className="font-normal text-xs">/pc</span>
                                            </span>
                                            <span className="text-green font-bold">77% OFF</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="border-[1px] border-black/20 text-black p-4 shadow-lg shadow-black/10 mt-6">
                                    <div className="flex mt-2 gap-2">
                                        <span className="text-md font-semibold">
                                            Zoroz Benefits
                                        </span>
                                    </div>
                                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-3 grid-cols-1 gap-4 mt-2 border-b-[1px] border-black/20 pb-4">
                                        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
                                            <FaFile className="text-primary text-lg" />
                                            <span>GST Invoice available</span>
                                        </button>
                                        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
                                            <FaCreditCard className="text-primary text-lg" />
                                            <span>Secure Payment</span>
                                        </button>
                                        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
                                            <FaHeadphones className="text-primary text-lg" />
                                            <span>365 Days Help Desk</span>
                                        </button>
                                    </div>

                                    <div className="flex mt-2 gap-2 mt-6">
                                        <span className="text-md font-semibold">
                                            Return & Warranty Policy
                                        </span>
                                    </div>
                                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-3 grid-cols-1 gap-4 mt-2 border-bs-[1px] border-black/20">
                                        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
                                            <FaFile className="text-primary text-lg" />
                                            <span>Up to 7 Days Returnable</span>
                                        </button>
                                        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
                                            <FaQuestionCircle className="text-primary text-lg" />
                                            <span>Missing Products</span>
                                        </button>
                                        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
                                            <FaTimesCircle className="text-primary text-lg" />
                                            <span>Wrong Product</span>
                                        </button>
                                        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
                                            <FaBoxOpen className="text-primary text-lg" />
                                            <span>Damaged Product</span>
                                        </button>
                                        <button className="border-[1px] border-black/20 text-black py-4 px-6 shadow-lg shadow-black/10 rounded-[5px] font-medium text-md flex gap-2 items-center">
                                            <FaThumbsDown className="text-primary text-lg" />
                                            <span>Defective Product</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 mt-9 mb-5 bg-white shadow-md rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Average Rating: 4.2</h3>
                        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

                        {/* <div className="mb-6 flex">
              {renderStars(4.2)}
              <div>
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() => setShowForm(!showForm)}
                >
                  Write a Review
                </button>
                {showForm && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Add Your Review
                    </h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-1"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={newReview.name}
                          onChange={(e) =>
                            setNewReview({ ...newReview, name: e.target.value })
                          }
                          className="w-full border border-gray-300 p-2 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="rating"
                          className="block text-sm font-medium mb-1"
                        >
                          Rating
                        </label>
                        <select
                          value={newReview.rating}
                          onChange={(e) =>
                            setNewReview({
                              ...newReview,
                              rating: parseFloat(e.target.value),
                            })
                          }
                          className="w-full border border-gray-300 p-2 rounded"
                          required
                        >
                          <option value="0">Select rating</option>
                          <option value="1">1 Star</option>
                          <option value="2">2 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="5">5 Stars</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="comment"
                          className="block text-sm font-medium mb-1"
                        >
                          Your Review
                        </label>
                        <textarea
                          id="comment"
                          value={newReview.comment}
                          onChange={(e) =>
                            setNewReview({
                              ...newReview,
                              comment: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 p-2 rounded"
                          rows={4}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div> */}

                        <div className="mb-6 flex">
                            {renderStars(4.2)}
                            <div className="relative flex-grow">
                                <button
                                    className="absolute top-0 right-0 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                    onClick={() => setShowForm(!showForm)}
                                >
                                    Write a Review
                                </button>
                                {showForm && (
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold mb-2">
                                            Add Your Review
                                        </h3>
                                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium mb-1"
                                                >
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    value={newReview.name}
                                                    onChange={(e) =>
                                                        setNewReview({ ...newReview, name: e.target.value })
                                                    }
                                                    className="w-full border border-gray-300 p-2 rounded"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="rating"
                                                    className="block text-sm font-medium mb-1"
                                                >
                                                    Rating
                                                </label>
                                                <select
                                                    value={newReview.rating}
                                                    onChange={(e) =>
                                                        setNewReview({
                                                            ...newReview,
                                                            rating: parseFloat(e.target.value),
                                                        })
                                                    }
                                                    className="w-full border border-gray-300 p-2 rounded"
                                                    required
                                                >
                                                    <option value="0">Select rating</option>
                                                    <option value="1">1 Star</option>
                                                    <option value="2">2 Stars</option>
                                                    <option value="3">3 Stars</option>
                                                    <option value="4">4 Stars</option>
                                                    <option value="5">5 Stars</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="comment"
                                                    className="block text-sm font-medium mb-1"
                                                >
                                                    Your Review
                                                </label>
                                                <textarea
                                                    id="comment"
                                                    value={newReview.comment}
                                                    onChange={(e) =>
                                                        setNewReview({
                                                            ...newReview,
                                                            comment: e.target.value,
                                                        })
                                                    }
                                                    className="w-full border border-gray-300 p-2 rounded"
                                                    rows={4}
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                            >
                                                Submit Review
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
              <ul>
                {reviews.map((review) => (
                  <li
                    key={review.id}
                    className="mb-4 p-4 border-b border-gray-200"
                  >
                    <div className="flex items-center mb-2">
                      {renderStars(review.rating)}
                      <span className="ml-2 font-semibold">{review.name}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div> */}

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
                            <ul>
                                {reviews.slice(0, showAllReviews ? reviews.length : 1).map((review) => (
                                    <li key={review.id} className="mb-4 p-4 border-b border-gray-200">
                                        <div className="flex items-center mb-2">
                                            {renderStars(review.rating)}
                                            <span className="ml-2 font-semibold">{review.name}</span>
                                        </div>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </li>
                                ))}
                            </ul>
                            {reviews.length > 1 && (
                                <button
                                    className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                    onClick={() => setShowAllReviews(!showAllReviews)}
                                >
                                    {showAllReviews ? 'Show Less' : `View ${reviews.length - 1} More Helpful Reviews`}
                                </button>
                            )}
                        </div>

                    </div>
                </div>

                <div className="bg-white mr-[65px] mt-5 mb-5 lg:w-80 md:w-80 w-full min-h-screen bg-white lg:gap-4 md:gap-4 gap-2 rounded-[5px] z-40">
                    <div className="flex flex-col p-4">
                        <p className="text-sm font-normal text-lightText">
                            ₹ {product.price.toLocaleString()} (Inclusive of all taxes)
                        </p>
                        <div className="flex items-end mt-2">
                            <span className="text-3xl font-bold text-black mr-2">
                                ₹ {product.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-sm font-normal text-lightText">
                                (GST: ${calculateGST(product.price).toFixed(2)})
                            </span>
                        </div>
                        <p className="text-sm font-normal text-lightText">
                            MRP{" "}
                            <span className="line-through">
                                ₹ {product.originalPrice.toLocaleString()}
                            </span>{" "}
                            <span className="font-semibold text-lg text-green ml-1">
                                {product.discountPercentage}% OFF
                            </span>
                        </p>

                        <div className="flex gap-2 mt-4 justify-between">
                            <p className="text-md font-semibold">Update Qty.</p>
                            <div className="flex gap-2">
                                <button
                                    className="px-3 py-1 rounded-[5px] border-[1px] border-blue bg-blue-100 font-semibold"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="px-2 py-1 w-12 border-2 border-gray-300 focus:outline-none rounded-5 bg-white text-black text-center"
                                    value={quantity}
                                    readOnly
                                />

                                <button
                                    className="px-3 py-1 rounded-[5px] border-[1px] border-blue bg-blue-100 font-semibold"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                >
                                    +
                                </button>

                            </div><button
                                onClick={handleRemoveProduct}
                                className="ml-2 bg-red-500 text-white px-2 rounded hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>

                        <button
                            onClick={() => handleAddToCart(product)}
                            className="py-3 px-9 rounded-[10px] bg-blue-500 text-white border-[1px] border-blue transition ease-in duration-2000 mt-6 lg:w-72 md:w-72 w-full flex items-center justify-center gap-2"
                        >
                            <FaCartPlus className="text-[25px]" />
                            <span>ADD TO CART</span>
                        </button>

                        <button
                            onClick={() => handleBuyNow(product)}
                            className="py-3 px-5 rounded-[10px] bg-red-500 font-semibold text-white border-[1px] border-primary hover:text-primary transition ease-in duration-2000 mt-2 lg:w-72 md:w-72 w-full"
                        >
                            BUY NOW
                        </button>

                        {/* <div className="flex flex-col mt-6">
              <span className="font-semibold text-md">Delivery Details</span>

              <div className="lg:w-72 md:w-72 w-full border-[1px] border-secondary p-1 flex mt-2">
                <input
                  type="text"
                  value=""
                  className="border-[0px] focus:outline-none px-4 w-58"
                />
                <button className="text-sm px-3 py-1.5 rounded-[7px] bg-red-200 font-semibold text-red-500 w-max">
                  CHECK
                </button>
              </div>
              <span className="font-normal text-xs">
                Check serviceability at your location
              </span>
            </div> */}



                        <div className="flex flex-col mt-6">
                            <span className="font-semibold text-md">Delivery Details</span>

                            <div className="lg:w-72 md:w-72 w-full rounded-[7px] border-[1px] border-secondary p-1 flex mt-2">
                                <div className="flex items-center pl-2 pr-1">
                                    <FaMapMarkerAlt className="text-red-500" />
                                </div>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="border-[0px]  focus:outline-none px-2 w-full"
                                    placeholder="Enter your location"
                                />
                                <button className="text-sm px-3 py-1.5 rounded-[7px] bg-red-200 font-semibold text-red-500 w-max">
                                    CHECK
                                </button>
                            </div>
                            <span className="font-normal text-xs">
                                Check serviceability at your location
                            </span>
                        </div>



                        <div className="flex flex-col gap-4 mt-6">
                            <div className="flex gap-2">
                                <div>
                                    <FaTruck className="text-lg text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm text-green-600">
                                        Free Delivery
                                    </span>
                                    <span className="font-normal text-sm">
                                        No Shipping Charges on this order
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div>
                                    <FaBox className="text-lg text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">
                                        Delivery available at 700096 in 5 day(s)
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div>
                                    <FaCreditCard className="text-lg text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm text-green-600">
                                        Prepaid Payment Only
                                    </span>
                                    <span className="font-normal text-sm">
                                        Pay on placing the order
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




        </div>
    );
};


export default CartProductDetailsPage;
