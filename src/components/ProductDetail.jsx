import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import API from '../api';
import EnquiryModal from './EnquiryModal';
import ImageModal from './ImageModal';
import 'swiper/css';
import 'swiper/css/navigation';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const fetchProduct = useCallback(async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const openImage = (img) => {
    setSelectedImage(img); // img is now the full Cloudinary URL
    setImageModalOpen(true);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  const images = product.images || [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Enquiry Button at Top Right */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setEnquiryOpen(true)}
          className="bg-gold text-deep-cobalt px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          Make Enquiry
        </button>
      </div>

      {/* Product Name */}
      <h1 className="text-4xl font-bold text-deep-cobalt mb-4">{product.name}</h1>

      {/* Description */}
      <div className="prose max-w-none mb-8">
        <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
      </div>

      {/* Gallery */}
      {images.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-deep-cobalt mb-4">Photo Gallery</h2>
          <Swiper modules={[Navigation]} navigation spaceBetween={20} slidesPerView={2} breakpoints={{ 640: { slidesPerView: 3 } }}>
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img} // full Cloudinary URL
                  alt={`${product.name} ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                  onClick={() => openImage(img)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        itemName={product.name}
        itemType="Product"
      />

      {/* Fullscreen Image Modal */}
      <ImageModal isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} imageUrl={selectedImage} />
    </div>
  );
}

export default ProductDetail;