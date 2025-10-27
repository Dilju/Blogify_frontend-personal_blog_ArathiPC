import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../lib/api";
import { useAuth } from "../../../store/useAuthStore";
import type { AxiosResponse } from "axios";

type Post = {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};

const AdminPostDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  // Fetch posts for logged-in user
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts/my");
      setPosts(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to fetch posts");
      console.error("Fetch posts error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create or Update Post
  const createOrUpdatePost = async () => {
    if (!title.trim() || !content.trim()) return setError("Fill title and content");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      let res: AxiosResponse<any, any, {}>;

      if (editingPost) {
        console.log("Updating post:", editingPost._id);

        // PUT request for update
        res = await api.put(`/posts/${editingPost._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Update posts state with functional updater
        setPosts(prevPosts => [
          ...prevPosts.map(p => (p._id === editingPost._id ? res.data : p))
        ]);

      } else {
        // POST request for new post
        res = await api.post("/posts", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setPosts(prevPosts => [res.data, ...prevPosts]);
      }

      // Reset form and editing state
      setTitle("");
      setContent("");
      setImage(null);
      setEditingPost(null);
      setError(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save post");
      console.error("Create/Update post error:", err);
    }
  };

  // Start editing a post
  const startEditing = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const cancelEditing = () => {
    setEditingPost(null);
    setTitle("");
    setContent("");
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  };

  const deletePost = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(prevPosts => prevPosts.filter(p => p._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete post");
      console.error("Delete post error:", err);
    }
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Your Posts</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600"> Welcome, {(user as any)?.name || (user as any)?.email || "User"}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Post Form */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editingPost ? "Edit Post" : "Create New Post"}
        </h2>
        <input
          className="border p-2 rounded w-full mb-2"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 rounded w-full mb-2"
          placeholder="Content"
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded w-full mb-2"
        />
        {image && <p className="text-sm text-green-600">Selected: {image.name}</p>}
        <div className="flex gap-2">
          <button
            onClick={createOrUpdatePost}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingPost ? "Update Post" : "Create Post"}
          </button>
          {editingPost && (
            <button
              onClick={cancelEditing}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(post)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePost(post._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            {post.imageUrl && (
              <img
                src={`http://localhost:5000${post.imageUrl}`}
                alt="Post"
                className="mt-2 max-w-full h-auto rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPostDashboard;
