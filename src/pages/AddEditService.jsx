import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function AddEditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: []
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchService = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get(`/services/${id}`);
      setFormData({
        name: res.data.name,
        description: res.data.description,
        images: res.data.images || []
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchService();
  }, [id, fetchService]); // Added fetchService to dependencies

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const form = new FormData();
    files.forEach(file => form.append('images', file));

    setUploading(true);
    try {
      const res = await API.post('/uploads', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const newImages = res.data.files;
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/services/${id}`, formData);
      } else {
        await API.post('/services', formData);
      }
      navigate('/admin/services');
    } catch (err) {
      alert('Save failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-deep-cobalt mb-6">{id ? 'Edit Service' : 'Add Service'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Description *</label>
          <textarea
            required
            rows="6"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Images (multiple allowed)</label>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={uploading} />
          {uploading && <p>Uploading...</p>}
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative">
                <img src={`http://localhost:5000/uploads/${img}`} alt="preview" className="w-20 h-20 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs"
                >×</button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <button type="submit" className="bg-electric-blue text-white px-6 py-2 rounded">Save</button>
          <button type="button" onClick={() => navigate('/admin/services')} className="bg-gray-300 px-6 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddEditService;