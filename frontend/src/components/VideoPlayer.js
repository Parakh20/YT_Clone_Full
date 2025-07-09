import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../axiosConfig";
import AuthContext from "../contexts/AuthContext";

const VideoPlayer = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    api.get(`videos/${id}/`).then((res) => setVideo(res.data));
  }, [id]);

  const handleLike = () => api.post(`videos/${id}/like/`).then((r) =>
    setVideo({ ...video, likes_count: r.data.likes_count })
  );

  const handleWatchLater = () => api.post(`videos/${id}/watch-later/`);

  const postComment = () =>
    commentText &&
    api
      .post(`videos/${id}/comments/`, { text: commentText })
      .then(() => {
        setCommentText("");
        api.get(`videos/${id}/`).then((res) => setVideo(res.data));
      });

  if (!video) return null;

  return (
    <div className="p-6 space-y-4">
      <video src={video.video_file} controls className="w-full max-h-[60vh]" />
      <h1 className="text-xl font-semibold">{video.title}</h1>
      <div className="flex items-center space-x-4">
        <button onClick={handleLike}>👍 {video.likes_count}</button>
        <button onClick={handleWatchLater}>⏰ Watch later</button>
      </div>

      <section>
        <h2 className="mb-2 font-semibold">{video.comments_count} Comments</h2>
        {user && (
          <div className="flex mb-4 space-x-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a public comment..."
              className="flex-1 px-3 py-2 bg-yt-darker rounded"
            />
            <button onClick={postComment} className="text-yt-blue">
              Comment
            </button>
          </div>
        )}
        {(video.comments || []).map((c) => (
          <div key={c.id} className="mb-3">
            <span className="font-semibold">{c.user.username}</span>{" "}
            <span className="text-sm text-yt-light-gray">
              {new Date(c.created_at).toLocaleDateString()}
            </span>
            <p>{c.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
export default VideoPlayer;
