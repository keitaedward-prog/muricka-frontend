import React, { useState } from 'react';
import Modal from 'react-modal';
import API from '../api';

Modal.setAppElement('#root');

function EnquiryModal({ isOpen, onClose, itemName, itemType, isGeneral = false }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isGeneral) {
        await API.post('/enquiries/general', formData);
      } else {
        await API.post('/enquiries/item', { ...formData, itemName, itemType });
      }
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 2000);
    } catch (error) {
      alert('Failed to send enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-md mx-auto mt-20 bg-white rounded-xl p-6 shadow-xl relative z-[60]"
      overlayClassName="fixed inset-0 bg-black/50 z-50"
    >
      {success ? (
        <div className="text-center py-8">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold">Enquiry Sent!</h2>
          <p>We'll get back to you soon.</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-deep-cobalt mb-4">
            {isGeneral ? 'General Enquiry' : `Enquire about ${itemName}`}
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
            ></textarea>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-electric-blue text-white py-2 rounded hover:bg-deep-cobalt"
              >
                {submitting ? 'Sending...' : 'Send Enquiry'}
              </button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
}

export default EnquiryModal;