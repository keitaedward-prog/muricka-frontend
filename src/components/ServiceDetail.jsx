import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import API from '../api';
import EnquiryModal from './EnquiryModal';
import ImageModal from './ImageModal';
import 'swiper/css';
import 'swiper/css/navigation';

function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    fetchService();
  }, [id, fetchService]); // Added fetchService to dependencies

  const fetchService = async () => {
    try {
      const res = await API.get(`/services/${id}`);
      setService(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openImage = (img) => {
    setSelectedImage(`http://localhost:5000/uploads/${img}`);
    setImageModalOpen(true);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!service) return <div className="text-center py-20">Service not found</div>;

  const images = service.images || [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setEnquiryOpen(true)}
          className="bg-gold text-deep-cobalt px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          Make Enquiry
        </button>
      </div>

      <h1 className="text-4xl font-bold text-deep-cobalt mb-4">{service.name}</h1>

      <div className="prose max-w-none mb-8">
        <p className="text-gray-700 whitespace-pre-line">{service.description}</p>
      </div>

      {images.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-deep-cobalt mb-4">Photo Gallery</h2>
          <Swiper modules={[Navigation]} navigation spaceBetween={20} slidesPerView={2} breakpoints={{ 640: { slidesPerView: 3 } }}>
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={`http://localhost:5000/uploads/${img}`}
                  alt={`${service.name} ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                  onClick={() => openImage(img)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        itemName={service.name}
        itemType="Service"
      />
      <ImageModal isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} imageUrl={selectedImage} />
    </div>
  );
}

export default ServiceDetail;