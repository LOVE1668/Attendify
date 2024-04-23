import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase'; // Assuming db is your Firebase database reference

const ViewProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if there's a logged-in user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, fetch user data from Firebase
        const userId = user.uid;
        const userRef = db.ref(`users/${userId}`);

        userRef.once('value', (snapshot) => {
          const data = snapshot.val();
          setUserData(data);
        });
      } else {
        // No user is signed in, handle this case if needed
      }
    });

    // Unsubscribe from auth state changes when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>View Profile</h2>
      {userData && (
        <div>
          <p>Name: {userData.NAME}</p>
          <p>Last Name: {userData.LASTNAME}</p>
          <p>Middle Name: {userData.MIDDLENAME}</p>
          <p>ID: {userData.ID}</p>
          <p>Email: {userData.EMAIL}</p>
          <p>Year: {userData.YEAR}</p>
          <p>Stream: {userData.STREAM}</p>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
