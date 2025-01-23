import "./GoogleAuth.scss";
import { useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { errorContext } from "../../../CustomContexts/Contexts";

const ClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API = import.meta.env.VITE_API_URL;

export const GoogleAuth = () => {
  const { error, setError } = useContext(errorContext);

  const handleGoogleLogin = GoogleLogin({
    onSuccess: async (tokenRes) => {
      try {
        const idToken = tokenRes.credential;

        await axios
          .post(`${API}/auth/google`, {
            token: idToken,
          })
          .then((res) => {
            console.log(`User authenticated successfully: ${res.data}`);
          });
      } catch (err) {
        console.error("Error during authentication:", err);
        setError("Failed to authenticate with Google");
      }
    },
    onError: (err) => {
      console.error("Google login failed:", err);
      setError("Login failed. Please try again.");
    },
  });

  return (
    <GoogleOAuthProvider clientId={ClientID}>
      <div className="google-auth-button">
        <GoogleLogin onSuccess={handleGoogleLogin} />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </GoogleOAuthProvider>
  );
};
