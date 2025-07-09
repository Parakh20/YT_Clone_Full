import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("video_file", file);
    api.post("videos/", form).then(() => nav("/"));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto space-y-4">
      <input
        required
        className="w-full p-2 bg-yt-darker rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 bg-yt-darker rounded"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        required
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full"
      />
      <button className="px-4 py-2 bg-yt-blue rounded">Upload</button>
    </form>
  );
};
export default Upload;
