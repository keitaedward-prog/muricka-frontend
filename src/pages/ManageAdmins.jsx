import React, { useState, useEffect } from 'react';
import API from '../api';

function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    setFiltered(
      admins.filter(admin =>
        admin.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, admins]);

  const fetchAdmins = async () => {
    try {
      const res = await API.get('/admin/admins');
      setAdmins(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await API.post('/admin/admins', formData);
      setAdmins([...admins, res.data]);
      setFormData({ email: '', password: '' });
      setShowForm(false);
      setSuccess('Admin created successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create admin');
    }
  };

  const handleDelete = async (id, email) => {
    if (!window.confirm(`Delete admin ${email}?`)) return;
    try {
      await API.delete(`/admin/admins/${id}`);
      setAdmins(admins.filter(admin => admin._id !== id));
      setSuccess('Admin deleted');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  // UPDATED: Added guard for missing ID
  const handleResetPassword = async (id, email) => {
    if (!id) {
      setError('Invalid admin ID');
      return;
    }
    const newPassword = prompt(`Enter new password for ${email}:`);
    if (!newPassword) return;
    try {
      await API.put(`/admin/admins/${id}`, { password: newPassword });
      setSuccess(`Password for ${email} reset`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-deep-cobalt">Manage Admins</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-electric-blue text-white px-4 py-2 rounded-lg hover:bg-deep-cobalt"
        >
          {showForm ? 'Cancel' : '+ Add Admin'}
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-3">Create New Admin</h3>
          <form onSubmit={handleCreate}>
            <div className="mb-3">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Create
            </button>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search admins by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded"
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-4 text-gray-500">No admins found.</div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(admin => (
                  <tr key={admin._id} className="border-t">
                    <td className="px-6 py-4">{admin.email}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleResetPassword(admin._id, admin.email)}
                        className="text-blue-600 hover:underline"
                      >
                        Reset Password
                      </button>
                      <button
                        onClick={() => handleDelete(admin._id, admin.email)}
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

export default ManageAdmins;