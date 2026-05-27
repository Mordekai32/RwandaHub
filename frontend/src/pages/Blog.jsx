import { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaUser, FaTag, FaRegBookmark, FaShareAlt, FaArrowRight, FaBlog } from 'react-icons/fa';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Career Tips', 'Job Search', 'Interview Prep', 'Industry News', 'Remote Work'];

  const posts = [
    {
      id: 1,
      title: 'How to Prepare for a Remote Interview',
      excerpt: 'Tips on lighting, background, and using video conferencing tools effectively. Plus a checklist to avoid technical issues.',
      date: 'March 15, 2025',
      author: 'Mordekai Ukobukeye',
      category: 'Interview Prep',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=600&h=400&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Top In-Demand Skills in Rwanda 2025',
      excerpt: 'Discover which skills employers are looking for right now – from digital marketing to data analysis and soft skills.',
      date: 'February 28, 2025',
      author: 'Mordekai Ukobukeye',
      category: 'Career Tips',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 3,
      title: 'Top 10 Job Search Mistakes to Avoid',
      excerpt: 'Learn the most common pitfalls job seekers make and how to avoid them to land your dream job faster.',
      date: 'February 10, 2025',
      author: 'Mordekai Ukobukeye',
      category: 'Job Search',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 4,
      title: 'Networking in Kigali: Where to Start',
      excerpt: 'A guide to tech meetups, business events, and online communities that can boost your career.',
      date: 'January 25, 2025',
      author: 'Mordekai Ukobukeye',
      category: 'Career Tips',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 5,
      title: 'Remote Work Policies in Rwandan Companies',
      excerpt: 'Which companies offer remote or hybrid options? Here is what you need to know before applying.',
      date: 'January 12, 2025',
      author: 'Mordekai Ukobukeye',
      category: 'Remote Work',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 6,
      title: 'The Future of AI in Recruitment',
      excerpt: 'How artificial intelligence is changing hiring processes and what it means for job seekers.',
      date: 'December 20, 2024',
      author: 'Mordekai Ukobukeye',
      category: 'Industry News',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1488229297570-58520851e868?w=600&h=400&fit=crop',
      featured: false
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts.find(post => post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative">
        {/* Hero */}
        <div className="relative overflow-hidden pt-12 pb-16 px-4">
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-6 border border-white/10">
              <FaBlog className="text-emerald-400" />
              <span className="text-sm text-slate-300">Insights & Updates</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-emerald-300 to-white bg-clip-text text-transparent mb-4">
              JobFinder Blog
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Career advice, job search tips, and industry news to help you grow.
            </p>
            {/* Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder:text-slate-400 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post (if any) */}
        {featuredPost && selectedCategory === 'All' && !searchTerm && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-emerald-500/30 transition">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-64 md:h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-xs">
                    <span className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-3 py-1 rounded-full">Featured</span>
                    <span className="text-slate-400 flex items-center gap-1"><FaCalendarAlt size={12} /> {featuredPost.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-2">{featuredPost.title}</h2>
                  <p className="text-slate-300 mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><FaUser /> {featuredPost.author}</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <a href="#" className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:gap-3 transition-all hover:text-emerald-300">
                    Read Full Article <FaArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <FaRegBookmark className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No posts found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="group bg-white/5 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/10 hover:border-emerald-500/30 hover:-translate-y-1">
                  <div className="relative overflow-hidden h-48">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-slate-200 text-xs px-2 py-1 rounded-full">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1"><FaCalendarAlt size={12} /> {post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-emerald-400 transition">{post.title}</h3>
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <FaUser size={12} /> <span>{post.author.split(' ')[0]}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-slate-400 hover:text-emerald-400 transition" aria-label="Bookmark">
                          <FaRegBookmark size={16} />
                        </button>
                        <button className="text-slate-400 hover:text-emerald-400 transition" aria-label="Share">
                          <FaShareAlt size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Newsletter - vibrant gradient matching dark theme */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl p-8 text-white text-center shadow-xl">
            <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
            <p className="text-blue-100 mb-6">Get the latest career tips and job alerts straight to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Your email address" className="flex-1 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50" />
              <button className="px-5 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition transform">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}