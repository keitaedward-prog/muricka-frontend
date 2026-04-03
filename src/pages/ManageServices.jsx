import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

function ManageServices() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    setFiltered(
      services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, services]);

  const fetchServices = async () => {
    try {
      const res = await API.get('/services');
      setServices(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await API.delete(`/services/${id}`);
      setServices(services.filter(s => s._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-deep-cobalt">Manage Services</h2>
        <Link
          to="/admin/services/add"
          className="bg-electric-blue text-white px-4 py-2 rounded"
        >
          Add Service
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search services by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded"
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white rounded shadow overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-4 text-gray-500">No services found.</div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Images</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(service => (
                  <tr key={service._id} className="border-t">
                    <td className="px-6 py-4">{service.name}</td>
                    <td className="px-6 py-4">{service.images?.length || 0}</td>
                    <td className="px-6 py-4 space-x-2">
                      <Link
                        to={`/admin/services/edit/${service._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default ManageServices;