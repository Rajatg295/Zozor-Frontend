// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// const Reviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });
//   const [showReviews, setShowReviews] = useState(false);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get('/api/reviews');
//         setReviews(response.data);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//       }
//     };

//     fetchReviews();
//   }, []);

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/reviews', newReview);
//       setReviews([...reviews, response.data]);
//       setNewReview({ name: '', rating: 0, comment: '' });
//     } catch (error) {
//       console.error('Error submitting review:', error);
//     }
//   };

//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const halfStar = rating - fullStars >= 0.5;
//     const stars = [];

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<FaStar key={i} className="text-yellow-500" />);
//     }
//     if (halfStar) {
//       stars.push(<FaStarHalfAlt key={fullStars} className="text-yellow-500" />);
//     }
//     while (stars.length < 5) {
//       stars.push(<FaRegStar key={stars.length} className="text-yellow-500" />);
//     }

//     return stars;
//   };

//   return (
//     <div>
//       <button
//         onClick={() => setShowReviews(!showReviews)}
//         className="border-[1px] border-primary/80 text-primary bg-primary/20 py-0.5 px-2 rounded-[5px] font-semibold text-md"
//       >
//         {showReviews ? 'Hide Reviews' : 'Show Reviews'}
//       </button>
//       {showReviews && (
//         <div className="mt-[100px] p-6 max-w-4xl bg-blue-100 shadow-md rounded-lg">
//           <h2 className="text-2xl font-bold mb-4">Reviews</h2>
//           <div className="mb-6">
//             <h3 className="text-xl font-semibold mb-2">Average Rating: 4.2</h3>
//             {renderStars(4.2)}
//           </div>
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
//             <ul>
//               {reviews.map((review) => (
//                 <li key={review._id} className="mb-4 p-4 border-b border-gray-200">
//                   <div className="flex items-center mb-2">
//                     {renderStars(review.rating)}
//                     <span className="ml-2 font-semibold">{review.name}</span>
//                   </div>
//                   <p className="text-gray-700">{review.comment}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Add Your Review</h3>
//             <form onSubmit={handleReviewSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium mb-1">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={newReview.name}
//                   onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
//                   className="w-full border border-gray-300 p-2 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="rating" className="block text-sm font-medium mb-1">
//                   Rating
//                 </label>
//                 <select
//                   id="rating"
//                   value={newReview.rating}
//                   onChange={(e) =>
//                     setNewReview({ ...newReview, rating: parseFloat(e.target.value) })
//                   }
//                   className="w-full border border-gray-300 p-2 rounded"
//                   required
//                 >
//                   <option value="0">Select rating</option>
//                   <option value="1">1 Star</option>
//                   <option value="2">2 Stars</option>
//                   <option value="3">3 Stars</option>
//                   <option value="4">4 Stars</option>
//                   <option value="5">5 Stars</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="comment" className="block text-sm font-medium mb-1">
//                   Your Review
//                 </label>
//                 <textarea
//                   id="comment"
//                   value={newReview.comment}
//                   onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//                   className="w-full border border-gray-300 p-2 rounded"
//                   rows={4}
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//               >
//                 Submit Review
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reviews;
