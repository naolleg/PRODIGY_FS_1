import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8888/api/user/getAll')
      .then(response => response.json())
      .then(data => setData(data.data));
  }, []);

  const handleLogout = () => {
    // Add your logout logic here, e.g. remove token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="bg-white p-4">
      <div class="mt-20 ..."></div>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
        <button
          className="bg-white hover:bg-white text-red-500 font-bold py-2 px-4 rounded shadow"
          style={{
            border: '1px solid red',
            marginRight: 20,
            marginTop: 10,
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full shadow-md rounded border border-gray-200">
          <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-800">
            <tr>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">User ID</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">First Name</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Last Name</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Email</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-center">Deactivate</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.userId} className="hover:bg-gray-100">
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">{item.userId}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">{item.firstName}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">{item.lastName}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left">{item.userEmail}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-center">
                    {item.activeStatus === 1 ? (
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow"
                        onClick={() => deactivateUser(item.userId)}
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
                        onClick={() => activateUser(item.userId)}
                      >
                        Deactivate
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;