import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import AuthContext from "../contexts/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    api.post("register/", form).then((r) => {
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
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
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
      <button className="w-full py-2 bg-yt-blue rounded">Sign Up</button>
    </form>
  );
};
export default Register;
