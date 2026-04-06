import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function ProductCard({ product }) {
  const images = product.images || [];
  const defaultImage = 'https://via.placeholder.com/300?text=No+Image';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      {/* Slideshow Container */}
      <div className="h-48 bg-gray-100">
        <Swiper
          modules={[Autoplay, Navigation]}
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={images.length > 1}
          className="h-full"
        >
          {images.length > 0 ? (
            images.map((img, idx) => (
              <SwiperSlide key={idx}>
                {/* img is now the full Cloudinary URL */}
                <img src={img} alt={product.name} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img src={defaultImage} alt="No image" className="w-full h-full object-cover" />
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-deep-cobalt truncate">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
        <Link
          to={`/product/${product._id}`}
          className="inline-block mt-3 bg-electric-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-deep-cobalt transition"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;