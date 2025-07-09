import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../axiosConfig";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    api.post("login/", form).then((r) => {
      login(r.data.user, r.data.token);
      nav("/");
    });
  };

  return (
    <form onSubmit={submit} className="p-6 max-w-sm mx-auto space-y-4">
      <input
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        placeholder="Username"
        className="w-full p-2 bg-yt-darker rounded"
        required
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="Password"
        className="w-full p-2 bg-yt-darker rounded"
        required
      />
      <button className="w-full py-2 bg-yt-blue rounded">Sign In</button>
      <Link to="/register" className="block text-center text-yt-blue">
        Create account
      </Link>
    </form>
  );
};
export default Login;
