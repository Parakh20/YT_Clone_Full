import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api.get("videos/").then((res) => setVideos(res.data));
  }, []);

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((v) => (
        <Link to={`/video/${v.id}`} key={v.id} className="group">
          <video
            src={v.video_file}
            className="w-full h-40 object-cover rounded-lg mb-2 bg-black"
            muted
            onMouseOver={(e) => e.currentTarget.play()}
            onMouseOut={(e) => e.currentTarget.pause()}
          />
          <h3 className="text-sm font-semibold group-hover:text-yt-blue">
            {v.title}
          </h3>
          <span className="text-xs text-yt-light-gray">
            {v.user.username} • {v.views} views
          </span>
        </Link>
      ))}
    </div>
  );
};
export default Home;
