import { useState, type FormEvent } from "react";

interface PostCreationFormProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => void;
  isSubmitting?: boolean;
}

export default function PostCreationForm({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  isSubmitting = false,
}: PostCreationFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }

    onSubmit(title.trim(), content.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Create a New Post</h2>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <div className="mb-6">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
          Content
        </label>
        <textarea
          id="content"
          className="w-full h-48 border border-gray-300 rounded px-4 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 text-white rounded ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} transition`}
      >
        {isSubmitting ? "Submitting..." : "Submit Post"}
      </button>
    </form>
  );
}
