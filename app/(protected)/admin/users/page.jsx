'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/components/ui/alert-dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/app/components/ui/sheet';
import { Building2, Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOfficeModal, setShowOfficeModal] = useState(false);
  const [offices, setOffices] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form state for Add User
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'OfficeUser',
    officeId: '',
  });

  // Form state for Edit User
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  // State for Office Allocation
  const [selectedOfficeIds, setSelectedOfficeIds] = useState([]);

  // State for Delete Confirmation
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowAddModal(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'OfficeUser',
          officeId: '',
        });
        fetchUsers();
        alert('User created successfully!');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Create user error:', error);
      alert('Error creating user');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });

      if (res.ok) {
        setShowEditModal(false);
        setSelectedUser(null);
        fetchUsers();
        alert('User updated successfully!');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to update user');
      }
    } catch (error) {
      console.error('Update user error:', error);
      alert('Error updating user');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOfficeSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedUser._id}/offices`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ officeIds: selectedOfficeIds }),
      });

      if (res.ok) {
        setShowOfficeModal(false);
        setSelectedUser(null);
        setSelectedOfficeIds([]);
        fetchUsers();
        alert('Office allocation updated successfully!');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to update office allocation');
      }
    } catch (error) {
      console.error('Office allocation error:', error);
      alert('Error updating office allocation');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const res = await fetch(`/api/admin/users/${userToDelete._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchUsers();
        alert('User deleted successfully!');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      alert('Error deleting user');
    } finally {
      setShowDeleteAlert(false);
      setUserToDelete(null);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.roles[0],
    });
    setShowEditModal(true);
  };

  const openOfficeModal = (user) => {
    setSelectedUser(user);
    setSelectedOfficeIds(user.officeIds || []);
    setShowOfficeModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const toggleOffice = (officeId) => {
    setSelectedOfficeIds((prev) =>
      prev.includes(officeId)
        ? prev.filter((id) => id !== officeId)
        : [...prev, officeId]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            User Management
          </h1>
          <p className="text-muted-foreground">
            Manage system access and roles
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>

      {/* User List */}
      <div className="card overflow-hidden border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="table w-full whitespace-nowrap">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Office</th>
                <th>Status</th>
                <th>Created</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {user.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info">{user.roles[0]}</span>
                  </td>
                  <td>
                    <span className="text-sm text-muted-foreground">
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
                    <span className="text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-3">
                      <button
                        className="p-2 hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-primary"
                        title="Edit User"
                        onClick={() => openEditModal(user)}>
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-blue-600"
                        title="Allocate Office"
                        onClick={() => openOfficeModal(user)}>
                        <Building2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-destructive/10 rounded-md transition-colors text-muted-foreground hover:text-destructive"
                        title="Delete User"
                        onClick={() => handleDelete(user)}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Sheet */}
      <Sheet open={showAddModal} onOpenChange={setShowAddModal}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New User</SheetTitle>
            <SheetDescription>
              Create a new user account. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Full Name
              </label>
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
              <label className="block text-sm font-medium text-foreground mb-1">
                Email Address
              </label>
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
              <label className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
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
              <label className="block text-sm font-medium text-foreground mb-1">
                Role
              </label>
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
                <label className="block text-sm font-medium text-foreground mb-1">
                  Assign Office
                </label>
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

            <SheetFooter className="pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="btn btn-ghost mr-2">
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
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Edit User Sheet */}
      <Sheet open={showEditModal} onOpenChange={setShowEditModal}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit User</SheetTitle>
            <SheetDescription>
              Make changes to the user profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          {selectedUser && (
            <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  className="input w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  className="input w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={editFormData.role}
                  onChange={handleEditChange}
                  className="input w-full">
                  <option value="OfficeUser">Office User</option>
                  <option value="DeliveryUser">Delivery User</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Admin">Admin</option>
                  <option value="AuditAdmin">Audit Admin</option>
                </select>
              </div>

              <SheetFooter className="pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn btn-ghost mr-2">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary">
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Update User'
                  )}
                </button>
              </SheetFooter>
            </form>
          )}
        </SheetContent>
      </Sheet>

      {/* Office Allocation Sheet */}
      <Sheet open={showOfficeModal} onOpenChange={setShowOfficeModal}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Allocate Offices</SheetTitle>
            <SheetDescription>
              Assign offices to this user. They will be able to access data for
              selected offices.
            </SheetDescription>
          </SheetHeader>
          {selectedUser && (
            <form onSubmit={handleOfficeSubmit} className="space-y-4 mt-4">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  User:{' '}
                  <span className="font-medium text-foreground">
                    {selectedUser.name}
                  </span>
                </p>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto border rounded-md p-2">
                  {offices.map((office) => (
                    <label
                      key={office._id}
                      className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedOfficeIds.includes(office.id)}
                        onChange={() => toggleOffice(office.id)}
                        className="w-4 h-4 text-primary"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">
                          {office.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ID: {office.id}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <SheetFooter className="pt-4">
                <button
                  type="button"
                  onClick={() => setShowOfficeModal(false)}
                  className="btn btn-ghost mr-2">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary">
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Update Allocation'
                  )}
                </button>
              </SheetFooter>
            </form>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user
              <span className="font-medium text-foreground">
                {' '}
                {userToDelete?.name}{' '}
              </span>
              and remove their data from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUserToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
