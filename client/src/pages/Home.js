import React, { useState, useEffect } from "react";
import SecretForm from "../components/SecretForm";
import SecretList from "../components/SecretList";
import axios from "axios";

const Home = () => {
  const [secrets, setSecrets] = useState([]);

  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/secrets/get-secrets"
        );
        setSecrets(response.data);
      } catch (error) {
        console.error(
          "Error fetching secrets:",
          error.response?.data || error.message
        );
      }
    };

    fetchSecrets();
  }, []);

  return (
    <div>
      <SecretForm />
      <SecretList secrets={secrets} />
    </div>
  );
};

export default Home;
