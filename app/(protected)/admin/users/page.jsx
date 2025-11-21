'use client';

import { Loader2, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [offices, setOffices] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'OfficeUser',
    officeId: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchOffices();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOffices = async () => {
    try {
      const res = await fetch('/api/admin/offices');
      if (res.ok) {
        const data = await res.json();
        setOffices(data.offices);
      }
    } catch (error) {
      console.error('Failed to fetch offices:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Backend expects officeId to be passed, which it converts to officeIds array
      // OR we can pass officeIds directly if we update backend.
      // Looking at backend route.js: const { name, email, password, role, officeId } = body;
      // It uses officeId to create [officeId]. So sending officeId is correct for the current backend.
      // However, let's ensure we are sending the correct field name.

      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'OfficeUser',
          officeId: '',
        });
        fetchUsers(); // Refresh list
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Create user error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage system access and roles</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>

      {/* User List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Office</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info">{user.roles[0]}</span>
                  </td>
                  <td>
                    <span className="text-sm text-gray-600">
                      {user.officeIds?.length > 0
                        ? user.officeIds.join(', ')
                        : '-'}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === 'active'
                          ? 'badge-success'
                          : 'badge-warning'
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <span className="text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input w-full">
                  <option value="OfficeUser">Office User</option>
                  <option value="DeliveryUser">Delivery User</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Admin">Admin</option>
                  <option value="AuditAdmin">Audit Admin</option>
                </select>
              </div>
              {formData.role !== 'Admin' && formData.role !== 'AuditAdmin' && (
                <div>
                  <label className="label">Assign Office</label>
                  <select
                    name="officeId"
                    value={formData.officeId}
                    onChange={handleChange}
                    className="input w-full"
                    required>
                    <option value="">Select Office</option>
                    {offices.map((office) => (
                      <option key={office._id} value={office.id}>
                        {office.name} ({office.id})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-ghost">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary">
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Create User'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
