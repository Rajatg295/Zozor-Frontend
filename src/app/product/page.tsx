"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineStar } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from "axios";

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
} from "react-icons/fa";

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

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

const ProductPage = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

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
    const query = new URLSearchParams(window.location.search);
    const productData = query.get("product");

    if (productData) {
      setProduct(JSON.parse(decodeURIComponent(productData)));
    }
  }, []);

  useEffect(() => {
    if (product) {
      axios
        .get(`http://localhost:8080/api/reviews?productId=${product._id}`)
        .then((response) => {
          setReviews(response.data);
        });
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

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

  const handleBuyNow = (product: Product) => {
    const productQueryString = encodeURIComponent(JSON.stringify(product));
    router.push(`/Buynowhomepage?product=${productQueryString}`);
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

  return (
    <div className="w-full flex justify-center px-4 mt-6">
      <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
        <div className="w-full grow">
          <div className="grid lg:grid-cols-2 gap-2">
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
        </div>

        <div className="h-max lg:w-80 md:w-80 w-full bg-whitelg:gap-4 md:gap-4 gap-2 rounded-[5px] z-40">
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
                <button
                  onClick={handleRemoveProduct}
                  className="ml-4 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
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

            <div className="flex flex-col mt-6">
              <span className="font-semibold text-md">Delivery Details</span>

              <div className="lg:w-72 md:w-72 w-full border-[1px] border-secondary p-1 flex mt-2">
                <input
                  type="text"
                  value="100605"
                  className="border-[0px] focus:outline-none px-4 w-58"
                />
                <button className="text-sm px-3 py-1.5 rounded-[10px] bg-primary/30 font-semibold text-primary border-[1px] border-primary/30 w-max">
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
                  <span className="font-semibold text-sm text-green">
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
                  <span className="font-semibold text-sm text-green">
                    Prepaid Payment Only
                  </span>
                  <span className="font-normal text-sm">
                    Pay on placing the order
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 max-w-4xl bg-blue-100 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Average Rating: 4.2
              </h3>
              {renderStars(4.2)}
            </div>
            <div className="mb-6">
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
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Add Your Review</h3>
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
                    type="number"
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
                      setNewReview({ ...newReview, comment: e.target.value })
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
