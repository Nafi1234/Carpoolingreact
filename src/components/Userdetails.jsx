import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { userid } = useParams();
  const [userData, setUserData] = useState(null);
  console.log("print", userid);
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/publish/user/${userid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, [userid]);

  return (
    <div>
      <h2>User Details</h2>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>First Name: {userData.first_name}</p>
          {/* Add other user details here */}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
