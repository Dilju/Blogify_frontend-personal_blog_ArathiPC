import { Link } from "react-router-dom";

export interface PostCardProps {
  post: {
    _id: string;
    title: string;
    content?: string;        // backend may provide content
    excerpt?: string;        // optional
    author: { username: string };
    createdAt: string;
    imageUrl?: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  // ✅ Use excerpt if available, otherwise generate one from content
  const excerpt = post.excerpt
    ? post.excerpt
    : post.content
    ? post.content.slice(0, 120).trim() + (post.content.length > 120 ? "..." : "")
    : "";

  // ✅ Use environment variable for image base URL
  const mediaBase = import.meta.env.VITE_MEDIA_URL || "http://localhost:5000";

  // ✅ Build full image URL safely
  const imageSrc = post.imageUrl
    ? `${mediaBase}${post.imageUrl.startsWith("/") ? post.imageUrl : `/${post.imageUrl}`}`
    : null;

  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden border border-gray-200">
      {imageSrc && (
        <img
          src={imageSrc}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition">
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h2>

        <p className="text-gray-600 line-clamp-3 mb-4">{excerpt}</p>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="mt-4">
          <Link
            to={`/post/${post._id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
