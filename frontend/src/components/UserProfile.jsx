import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const token = Cookies.get('jwt_token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://manushi1224.pythonanywhere.com/api/user/', {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        console.log(response)
        setUserProfile(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [token]);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {userProfile.username}</p>
      <p>Email: {userProfile.email}</p>
      {/* Add more profile information here */}
    </div>
  );
};

export default UserProfile;
