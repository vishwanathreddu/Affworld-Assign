import React from "react";

const SecretList = ({ secrets }) => {
  return (
    <div>
      <h2>Secrets</h2>
      <ul>
        {secrets.map((secret) => (
          <li key={secret._id}>{secret.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default SecretList;
