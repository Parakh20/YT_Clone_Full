import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";
import AuthContext from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api.get("videos/").then((r) =>
      setVideos(r.data.filter((v) => v.user.id === user.id))
    );
  }, [user.id]);

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      api.delete(`videos/${id}/delete/`).then(() => {
        setVideos((prev) => prev.filter((v) => v.id !== id));
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Your videos</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <div key={v.id} className="relative group bg-yt-darker rounded-lg p-2">
            <Link to={`/video/${v.id}`}>
              <video
                src={v.video_file}
                className="w-full h-40 object-cover rounded-lg mb-2 bg-black"
                muted
              />
              <h3 className="truncate">{v.title}</h3>
            </Link>
            <button
              onClick={() => handleDelete(v.id)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs rounded opacity-80 hover:opacity-100"
              title="Delete video"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
