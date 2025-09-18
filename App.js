import React, { useEffect, useState } from "react";
import './index.css'

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      
      {/* Loader */}
      {loading ? (
        <div className="flex space-x-2 mt-10">
          <span className="w-3 h-3 bg-gray-600 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
          <span className="w-3 h-3 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-lg rounded-2xl p-6 mb-4 border border-gray-200 hover:shadow-2xl transition-shadow"
            >
              {/* DiceBear Avatar */}
              <div className="flex justify-center mb-4">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                    user.name + user.id
                  )}`}
                  alt={user.name}
                  style={{ width: "70px", height: "70px" }}
                  className="rounded-full border-2 border-gray-300 shadow-md"
                />
              </div>

              {/* User Info */}
              <h2 className="text-lg font-bold text-gray-800 text-center">
                {user.name}
              </h2>
              <div className="mt-3 text-gray-700 text-sm space-y-1">
                <p>
                  <span className="font-semibold text-black">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-semibold text-black">Phone:</span> {user.phone}
                </p>
                <p>
                  <span className="font-semibold text-black">Company:</span>{" "}
                  {user.company?.name}
                </p>
                <p>
                  <span className="font-semibold text-black">Website:</span>{" "}
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {user.website}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-black">Address:</span>{" "}
                  {user.address?.street}, {user.address?.suite},
                  {" "}
                  {user.address?.city}, {user.address?.zipcode}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
