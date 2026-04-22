import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `${API_URL}/api/posts/all`;
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const res = await axios.get(url, { headers });
            setAllPosts(res.data.posts);
            setPosts(res.data.posts);
        } catch (err) {
            console.error('Failed to fetch posts:', err);
            setError(err.response?.data?.message || 'Failed to load posts. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const decodedToken = JSON.parse(window.atob(base64));
                setCurrentUserId(decodedToken.id);
            } catch (e) {
                console.error("Error decoding token:", e);
                localStorage.clear();
                setCurrentUserId(null);
            }
        }

        fetchPosts();
    }, [fetchPosts]);

    const applySearchFilter = useCallback(() => {
        if (!searchTerm) {
            setPosts(allPosts);
            return;
        }

        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const filtered = allPosts.filter(post => {
            const matchesUser = post.user && post.user.name &&
                                post.user.name.toLowerCase().includes(lowerCaseSearchTerm);

            const matchesTitle = post.title &&
                                 post.title.toLowerCase().includes(lowerCaseSearchTerm);

            const matchesDescription = post.description &&
                                       post.description.toLowerCase().includes(lowerCaseSearchTerm);

            return matchesUser || matchesTitle || matchesDescription;
        });
        setPosts(filtered);
    }, [searchTerm, allPosts]);

    useEffect(() => {
        applySearchFilter();
    }, [searchTerm, allPosts, applySearchFilter]);

    const handleSearch = () => {
        applySearchFilter();
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const handleDelete = async (postId) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('You are not authorized to delete posts. Please log in.');
                    navigate('/login');
                    return;
                }

                await axios.delete(`${API_URL}/api/posts/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setAllPosts(prevAllPosts => prevAllPosts.filter((post) => post._id !== postId));
                setPosts(prevPosts => prevPosts.filter((post) => post._id !== postId));
                alert('Recipe deleted successfully!');
            } catch (err) {
                console.error('Failed to delete post:', err.response ? err.response.data : err.message);
                setError(err.response?.data?.message || 'Error deleting recipe. Please try again.');
                if (err.response && err.response.status === 401) {
                    alert('Not authorized to delete this recipe or session expired. Please log in again.');
                    localStorage.clear();
                    navigate('/login');
                }
            }
        }
    };

    const handleLikeToggle = async (postId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to be logged in to like posts.');
            return;
        }

        try {
            const postToUpdate = posts.find(p => p._id === postId);

            if (!postToUpdate) {
                console.warn(`Post with ID ${postId} not found in current state.`);
                return;
            }
            const hasLiked = postToUpdate.likes && Array.isArray(postToUpdate.likes)
                                ? postToUpdate.likes.includes(currentUserId)
                                : false;

            let updatedPostData;
            if (hasLiked) {
                const res = await axios.delete(`${API_URL}/api/posts/${postId}/like`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                updatedPostData = res.data.post;
            } else {
                const res = await axios.post(`${API_URL}/api/posts/${postId}/like`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                updatedPostData = res.data.post;
            }
            setPosts(prevPosts =>
                prevPosts.map(p => (p._id === postId ? updatedPostData : p))
            );
            setAllPosts(prevAllPosts =>
                prevAllPosts.map(p => (p._id === postId ? updatedPostData : p))
            );

        } catch (error) {
            console.error('Error toggling like:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Failed to toggle like. Please try again.');
        }
    };

    const handleSaveToggle = async (postId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to be logged in to save posts.');
            return;
        }

        try {
            const postToUpdate = posts.find(p => p._id === postId);
            if (!postToUpdate) {
                console.warn(`Post with ID ${postId} not found in current state.`);
                return;
            }

            const hasSaved = postToUpdate.savedBy && Array.isArray(postToUpdate.savedBy)
                                ? postToUpdate.savedBy.includes(currentUserId)
                                : false;

            let updatedPostData;
            if (hasSaved) {
                const res = await axios.delete(`${API_URL}/api/posts/${postId}/save`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                updatedPostData = res.data.post;
            } else {
                const res = await axios.post(`${API_URL}/api/posts/${postId}/save`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                updatedPostData = res.data.post;
            }

            setPosts(prevPosts =>
                prevPosts.map(p => (p._id === postId ? updatedPostData : p))
                
            );
            setAllPosts(prevAllPosts =>
                prevAllPosts.map(p => (p._id === postId ? updatedPostData : p))
            );

        } catch (error) {
            console.error('Error toggling save:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Failed to toggle save. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-700 font-medium">Loading delicious recipes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <p className="text-red-600 text-center">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
                        🍳 All Recipes
                    </h2>

                    {/* Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center">
                        <input
                            type="text"
                            placeholder="Search by title, description, or username"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            className="flex-1 max-w-md px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none transition-colors text-base"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                        >
                            🔍 Search
                        </button>
                        {searchTerm && (
                            <button
                                onClick={handleClearSearch}
                                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                            >
                                ✕ Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Posts Grid */}
                {posts.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <p className="text-xl text-gray-600">
                            {searchTerm 
                                ? `No recipes found matching "${searchTerm}" 😔` 
                                : "No recipes available yet. Be the first to add one! 🎉"}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {posts.map((post) => {
                            const hasSaved = post.savedBy && Array.isArray(post.savedBy) && post.savedBy.includes(currentUserId);
                            const hasLiked = post.likes && Array.isArray(post.likes) && post.likes.includes(currentUserId);

                            return (
                                <div
                                    key={post._id}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
                                >
                                    {/* Image */}
                                    {post.imageUrl && (
                                        <Link to={`/posts/${post._id}`} className="block overflow-hidden">
                                            <img
                                                src={`${API_URL}/uploads/${post.imageUrl}`}
                                                alt={post.title}
                                                className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </Link>
                                    )}
                                    
                                    {/* Content */}
                                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                                        <Link to={`/posts/${post._id}`} className="group">
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                        </Link>
                                        
                                        {post.user && post.user.name && (
                                            <p className="text-sm text-gray-500 mb-3">
                                                👨‍🍳 By: <span className="font-medium">{post.user.name}</span>
                                            </p>
                                        )}
                                        
                                        <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                                            {post.description.length > 120 ? post.description.substring(0, 120) + '...' : post.description}
                                        </p>
                                        
                                        {post.ingredients && post.ingredients.length > 0 && (
                                            <div className="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg">
                                                <strong className="text-gray-700">🥘 Ingredients:</strong>
                                                <p className="mt-1">{post.ingredients.slice(0, 3).join(', ')}{post.ingredients.length > 3 ? '...' : ''}</p>
                                            </div>
                                        )}
                                        
                                        {/* Like & Save Buttons */}
                                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                                            <button
                                                onClick={() => handleLikeToggle(post._id)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                                    hasLiked 
                                                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                <span className="text-lg">{hasLiked ? '❤️' : '🤍'}</span>
                                                <span>{post.likes ? post.likes.length : 0}</span>
                                            </button>

                                            {currentUserId && (
                                                <button
                                                    onClick={() => handleSaveToggle(post._id)}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                                        hasSaved 
                                                            ? 'bg-green-50 text-green-600 hover:bg-green-100' 
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    <span className="text-lg">{hasSaved ? '⭐' : '☆'}</span>
                                                    <span className="hidden sm:inline">{hasSaved ? 'Saved' : 'Save'}</span>
                                                </button>
                                            )}
                                        </div>
                                        
                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-2">
                                            <Link 
                                                to={`/posts/${post._id}`} 
                                                className="flex-1 text-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                                            >
                                                View Recipe
                                            </Link>
                                            
                                            {currentUserId && post.user && currentUserId === post.user._id && (
                                                <>
                                                    <Link 
                                                        to={`/edit-post/${post._id}`} 
                                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                                                    >
                                                        ✏️ Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post._id)}
                                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Posts;