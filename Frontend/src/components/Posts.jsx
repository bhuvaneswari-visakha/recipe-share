import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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
            const url = 'http://localhost:5000/api/posts/all';
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

                await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
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
                const res = await axios.delete(`http://localhost:5000/api/posts/${postId}/like`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                updatedPostData = res.data.post;
            } else {
                const res = await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {}, {
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
                const res = await axios.delete(`http://localhost:5000/api/posts/${postId}/save`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                updatedPostData = res.data.post;
            } else {
                const res = await axios.post(`http://localhost:5000/api/posts/${postId}/save`, {}, {
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
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading posts...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>;
    }

    return (
        <div style={{ backgroundSize: 'cover', minHeight: '100vh', backgroundImage: `url(https://i.pinimg.com/1200x/17/0f/fd/170ffdab81a63e7b28f0569ed12cb1f3.jpg)` }}>
           <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px', fontSize: '2rem', fontWeight: 'bold' }} >All Recipes</h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
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
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            flexGrow: 1,
                            maxWidth: '300px'
                        }}
                    />
                    <button
                        onClick={handleSearch}
                        style={{
                            padding: '10px 15px',
                            backgroundColor: '#783fa4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Search Recipes
                    </button>
                    {searchTerm && (
                        <button
                            onClick={handleClearSearch}
                            style={{
                                padding: '10px 15px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}
                        >
                            Clear Search
                        </button>
                    )}
                </div>

                {posts.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666' }}>
                        No recipes available yet. {searchTerm && `No recipes found matching "${searchTerm}"`}. Be the first to add one!
                    </p>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px',
                        justifyContent: 'center'
                    }}>
                        {posts.map((post) => {
                            const hasSaved = post.savedBy && Array.isArray(post.savedBy) && post.savedBy.includes(currentUserId);
                            const hasLiked = post.likes && Array.isArray(post.likes) && post.likes.includes(currentUserId);

                            return (
                                <div
                                    key={post._id}
                                    style={{
                                        border: '1px solid #e0e0e0',
                                        padding: '1.5rem',
                                        borderRadius: '10px',
                                        backgroundColor: '#fff',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    {post.imageUrl && (
                                        <img
                                            src={`http://localhost:5000/uploads/${post.imageUrl}`}
                                            alt={post.title}
                                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }}
                                        />
                                    )}
                                    <div style={{ flexGrow: 1, width: '100%' }}>
                                        <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none', color: '#783fa4' }}>
                                            <h3 style={{ margin: '10px 0', fontSize: '1.5rem' }}>{post.title}</h3>
                                        </Link>
                                        {post.user && post.user.name && (
                                            <p style={{ margin: '5px 0 15px 0', color: '#555', fontSize: '0.9rem' }}>By: {post.user.name}</p>
                                        )}
                                        <p style={{ margin: '10px 0', color: '#444', lineHeight: '1.5', textAlign: 'left' }}>
                                            {post.description.length > 150 ? post.description.substring(0, 150) + '...' : post.description}
                                        </p>
                                        {post.ingredients && post.ingredients.length > 0 && (
                                            <div style={{ fontSize: '0.9rem', color: '#666', textAlign: 'left', marginTop: '10px' }}>
                                                <strong>Ingredients:</strong> {post.ingredients.slice(0, 3).join(', ')}{post.ingredients.length > 3 ? '...' : ''}
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px', gap: '10px' }}>

                                            <button
                                                onClick={() => handleLikeToggle(post._id)}
                                                style={{
                                                    padding: '8px 15px',
                                                    color: hasLiked ? 'red' : '#783fa4',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    display: 'flex',
                                                    marginLeft: 'auto',
                                                    gap: '5px',
                                                    backgroundColor: 'transparent'
                                                }}
                                            >
                                                {hasLiked ? '♡' :'❤️'} {post.likes ? post.likes.length : 0}
                                            </button>

                                            {currentUserId && (
                                                <button
                                                    onClick={() => handleSaveToggle(post._id)}
                                                    style={{
                                                        padding: '8px 15px',
                                                        color: hasSaved ? '#28a745' : '#783fa4',
                                                        border: 'none',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.9rem',
                                                        display: 'flex',
                                                        gap: '5px',
                                                        backgroundColor: 'transparent'
                                                    }}
                                                >
                                                    {hasSaved ? '✅ Saved' : '⭐ Save'}
                                                </button>
                                            )}
                                        </div>
                                        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                            <Link to={`/posts/${post._id}`} style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#783fa4', color: 'white', textDecoration: 'none', borderRadius: '5px', fontSize: '0.9rem' }}>
                                                View Full Recipe
                                            </Link>
                                            {currentUserId && post.user && currentUserId === post.user._id && (
                                                <>
                                                    <Link to={`/edit-post/${post._id}`} style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#362145ff', color: 'white', textDecoration: 'none', borderRadius: '5px', fontSize: '0.9rem' }}>
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post._id)}
                                                        style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9rem' }}
                                                    >
                                                        Delete
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