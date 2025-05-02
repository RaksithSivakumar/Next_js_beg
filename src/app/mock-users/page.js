'use client';

import { useState, useEffect } from 'react';

export default function MockUsers() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch initial users correctly using useEffect
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('https://6814c29c225ff1af162a00c8.mockapi.io/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  async function addUser(e) {
    e.preventDefault();
    if (!name || !email) return;

    try {
      const response = await fetch('https://6814c29c225ff1af162a00c8.mockapi.io/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) throw new Error('Failed to add user');

      const newUser = await response.json();
      setUsers([...users, newUser]);
      setName('');
      setEmail('');
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="py-10">
      <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-8 sm:p-20">
        <h1 className="text-4xl font-bold">Mock Users</h1>

        {/* Add User Form */}
        <form onSubmit={addUser} className="w-full max-w-2xl flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-2 border rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add User
          </button>
        </form>

        {/* Users List */}
        <ul className="w-full max-w-2xl space-y-4">
          {users.map((user) => (
            <li key={user.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">{user.phone || 'No phone provided'}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
