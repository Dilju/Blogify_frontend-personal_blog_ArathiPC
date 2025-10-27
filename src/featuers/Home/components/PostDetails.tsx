import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../../Post/hooks/usePost";
import Placeholder from "../../../assets/fake.png";


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

const PostDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, loading } = usePosts(); 
  const [post, setPost] = useState<PostItem | null>(null);

  useEffect(() => {
    if (posts?.length && id) {
      const foundPost = posts.find((p) => String(p._id) === id);
      setPost(foundPost || null);
    }
  }, [posts, id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        loading...
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">No post found</p>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">{post.title}</h1>

        {/* Post Image */}
        <div className="flex flex-col items-center gap-4 mb-6">
          {post.imageUrl ? (
            <img
              src={`http://localhost:5000${post.imageUrl}`} 
              alt="Post Image"
              className="w-full max-w-xl rounded shadow-lg object-cover"
            />
          ) : (
            <img
              src={Placeholder}
              alt="Placeholder"
              className="w-full max-w-xl rounded shadow-lg object-cover"
            />
          )}
        </div>

        {/* Post Content */}
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          {post.content || "No content available."}
        </p>

        <p className="text-gray-600 text-sm">
          Author: {post.author?.name || "Unknown"}
        </p>

        <p className="text-gray-500 text-sm">
          Published on:{" "}
          {new Date(post.createdAt || "").toLocaleDateString() || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default PostDetailsPage;
