import React from "react";
import PostCard from "../components/PostCard";
import { usePosts } from "../hooks/useHome";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { posts, loading, error } = usePosts();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-xl">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Welcome to Blogify
      </h1>

      {posts.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No posts yet.</p>
          <Link
            to="/create"
            className="text-blue-600 hover:underline font-medium"
          >
            Create the first post
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
