import React, { useState } from "react";
import axios from "axios";

const SecretForm = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/secrets/post-secret", {
        message,
      });
      setMessage("");
    } catch (error) {
      console.error(
        "Error posting secret:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h2>Post a Secret</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Share your secret..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Post Secret</button>
      </form>
    </div>
  );
};

export default SecretForm;
