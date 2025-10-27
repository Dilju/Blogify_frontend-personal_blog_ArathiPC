import { useState, useEffect } from "react";
import api from "../../../lib/api"; // Your configured Axios instance

export interface PostItem {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author?: {
    name: string;
    email?: string;
  };
  createdAt?: string;
}

export function usePosts() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching posts from:", api.defaults.baseURL + "/posts");
      const res = await api.get<PostItem[]>("/posts");
      setPosts(res.data);
      console.log("Fetched posts:", res.data);
    } catch (err: any) {
      console.error("Error fetching posts:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (data: { title: string; content: string }) => {
    try {
      const res = await api.post<PostItem>("/posts", data);
      setPosts((prev) => [res.data, ...prev]);
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const updatePost = async (id: string, data: { title: string; content: string }) => {
    try {
      const res = await api.put<PostItem>(`/posts/${id}`, data);
      setPosts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
}
