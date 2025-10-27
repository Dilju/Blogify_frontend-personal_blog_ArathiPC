import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-16">
      <div className="container mx-auto text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Blogify. All rights reserved.
        </p>
        <p className="mt-1">
          Built with MERN stack, TypeScript, and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
