import axios from "axios";
import { useEffect, useState } from "react";
import Messages from "./Messages";

function Auth({ onChange }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [form, setForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const tokenData = localStorage.getItem("token");
    setUser(userData);
    setToken(tokenData);
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email: email,
          password: password,
        }
      );

      // Assuming the response contains a token
      const token = response.data.token;

      // Save token to local storage
      localStorage.setItem("token", token);

      console.log("Token saved to local storage:", token);

      // Decode the token to extract user data
      const user = response.data.user;

      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify(user));

      console.log("User data saved to local storage:", user);
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }
    setForm(!form);
  };

  return (
    <div>
      {!form && (
        <button
          className="px-8 py-3 bg-fuchsia-500 rounded-md poppins semibold text-white rounded-"
          onClick={() => setForm(!form)}
        >
          {user ? `Schimba Contul ( ${user.name}  ) ` : "Intra in cont"}
        </button>
      )}
      {form && (
        <form
          className="popppins  bg-fuchsia-400 rounded-lg w-full md:w-1/2 p-8 mx-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl w-full text-center text-white semibold">
            Logare in cont
          </h2>
          <label className="mt-8 block text-white/80 semibold">Email</label>
          <input
            value={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="rounded-full mt-2 w-full bg-fuchsia-900/50  py-2 px-4 focus:outline-none  text-white placeholder:text-fuchsia-400/90"
            placeholder="e.g. john.doe@gmail.com"
          ></input>
          <label className="mt-8 block text-white/80 semibold">Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            required
            className="rounded-full mt-2 w-full bg-fuchsia-900/50  py-2 px-4 focus:outline-none  text-white placeholder:text-fuchsia-400/90"
            placeholder="e.g. john.doe@gmail.com"
          ></input>
          <button className="py-2 mt-16 w-full text-lg semibold rounded-md bg-white text-fuchsia-900">
            Intra in cont
          </button>
        </form>
      )}
      {user && !form && <Messages user={user} token={token} />}
    </div>
  );
}
export default Auth;
