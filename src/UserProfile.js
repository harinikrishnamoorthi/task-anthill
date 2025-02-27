import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>User Profile</h1>
      
      {user ? (
        <>
          {user.photoURL && (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              width="100" 
              height="100" 
              style={{ borderRadius: '50%', marginBottom: '10px' }} 
            />
          )}
          <h2>{user.displayName || "Anonymous User"}</h2>
          <p>Email: {user.email || "No Email Provided"}</p>
        </>
      ) : (
        <p>No user information available. Please log in.</p>
      )}
    </div>
  );
};

export default UserProfile;
