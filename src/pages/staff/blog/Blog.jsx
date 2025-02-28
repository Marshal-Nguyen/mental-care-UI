import React from 'react';

function Blog() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">My Blog</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
              <a href="/about" className="text-gray-600 hover:text-gray-800">About</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-800">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example blog post cards */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.  .com/600x400" alt="Blog Post" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">Sample Blog Post Title</h2>
              <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in libero in quam commodo tempus nec ut lorem.</p>
              <a href="/post/1" className="text-blue-500 mt-4 inline-block hover:underline">Read more</a>
            </div>
          </div>
          
          {/* Repeat the card for each blog post */}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 My Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Blog;
