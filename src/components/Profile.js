import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setRefreshtoken } from "../store/authslice";
import { useNewtokenMutation } from "../store/Registerapisilice";
import axios from "axios";

function UserProfile() {
  const token = localStorage.getItem("access_token");
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const refresh = useSelector((state) => state.auth.refreshtoken);
  const [newtoken] = useNewtokenMutation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/user/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            console.log("here refersh", refresh);
            const response = await newtoken(refresh);
            setRefreshtoken(response.refresh);
            console("Here the response", response);
            // Retry fetching user profile after token refresh
            const updatedResponse = await axios.get(
              "http://127.0.0.1:8000/user/details",
              {
                headers: {
                  Authorization: `Bearer ${response.access}`, // Use the new access token
                },
              }
            );
            setUserData(updatedResponse.data);
          } catch (refreshError) {
            console.error("Error refreshing token: ", refreshError);
          }
        } else {
          console.error("Error fetching user profile data: ", error);
        }
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/user/update",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User data updated:", response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold">
          First Name
        </label>
        {isEditing ? (
          <input
            type="text"
            value={userData.first_name}
            onChange={(e) =>
              setUserData({ ...userData, first_name: e.target.value })
            }
          />
        ) : (
          <p className="p-2 border rounded-md">{userData.first_name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold">
          Last Name
        </label>
        {isEditing ? (
          <input
            type="text"
            value={userData.last_name}
            onChange={(e) =>
              setUserData({ ...userData, last_name: e.target.value })
            }
          />
        ) : (
          <p className="p-2 border rounded-md">{userData.last_name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold">
          Email
        </label>
        <p className="p-2 border rounded-md">{userData.email}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold">
          Phone Number
        </label>
        {isEditing ? (
          <input
            type="text"
            value={userData.phone_number}
            onChange={(e) =>
              setUserData({ ...userData, phone_number: e.target.value })
            }
          />
        ) : (
          <p className="p-2 border rounded-md">{userData.phone_number}</p>
        )}
      </div>
      {isEditing ? (
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
      )}
    </div>
  );
}

export default UserProfile;
