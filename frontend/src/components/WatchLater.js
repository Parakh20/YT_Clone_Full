import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";

const WatchLater = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("watch-later/").then((res) => {
      setItems(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Watch Later</h1>
      {items.length === 0 && <p>No videos saved.</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((v) => (
          <Link key={v.id} to={`/video/${v.id}`}>
            <video
              src={v.video_file}
              className="w-full h-40 object-cover rounded-lg mb-2 bg-black"
              muted
            />
            <h3>{v.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WatchLater;
