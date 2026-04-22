
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Head2 from './Head2';
import { API_URL } from '../config';

const SinglePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');

        if (storedUserId) {
            setCurrentUserId(storedUserId);
            console.log("SinglePost: currentUserId set from localStorage:", storedUserId);
        } else {
            console.log("SinglePost: No userId found in localStorage.");
        }

        const fetchPost = async () => {
            setLoading(true);
            try {
                

                console.log("SinglePost: Fetching post with ID:", id);
                const res = await axios.get(`${API_URL}/api/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPost(res.data);
                console.log("SinglePost: Fetched post data:", res.data);
                if (res.data && res.data.user) {
                    console.log("SinglePost: Post owner ID:", res.data.user._id);
                    console.log("SinglePost: Does current user own this post?", storedUserId && res.data.user._id === storedUserId);
                } else {
                    console.log("SinglePost: Post user data is missing or incomplete.");
                }

            } catch (err) {
                console.error('SinglePost: Failed to fetch post:', err.response ? err.response.data : err.message);
                setError(err.response?.data?.message || 'Failed to load post.');
                if (err.response && err.response.status === 401) {
                    alert('Session expired or not authorized. Please log in again.');
                    localStorage.clear();
                    navigate('/login');
                } else if (err.response && err.response.status === 404) {
                    alert('Recipe not found.');
                    navigate('/posts');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, navigate]);
    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to delete recipes.');
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            await axios.delete(`${API_URL}/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Recipe deleted successfully!');
            navigate('/posts');
        } catch (err) {
            console.error('SinglePost: Failed to delete post:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Error deleting recipe. Please try again.');
            if (err.response && err.response.status === 401) {
                alert('Not authorized to delete this recipe or session expired. Please log in again.');
                localStorage.clear();
                navigate('/login');
            } else if (err.response && err.response.status === 403) {
                alert('You are not authorized to delete this recipe.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto my-10 p-8 bg-gray-50 rounded-lg shadow-lg text-center text-gray-700">
                Loading recipe...
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto my-10 p-8 bg-red-50 rounded-lg shadow-lg text-center text-red-600">
                {error}
            </div>
        );
    }

    if (!post) {
        return (
            <div className="max-w-3xl mx-auto my-10 p-8 bg-gray-50 rounded-lg shadow-lg text-center text-gray-700">
                Recipe not found.
            </div>
        );
    }

    return (
        <div  style={{backgroundImage:`url(https://i.pinimg.com/1200x/37/19/63/3719637f4b47fa46e0f095dca226b9be.jpg)`}} >
            <Head2/>

            <div className="max-w-5xl mx-auto my-10 p-8 bg-gray-50 rounded-xl relative">

                <div className="p-8 rounded-xl">
                    <h1 className="text-3xl text-[#783fa4] text-center mb-5 italic underline  font-bold">{post.title}</h1>
                    {post.user && post.user.name && (
                        <p className="text-center text-gray-600 text-lg mb-8">By: {post.user.name}</p>
                    )}

                    <div className="gap-8 mb-8 p-4 items-start">
                        {post.imageUrl && (
                            <div className="w-full md:w-1/2 min-w-[300px]">
                                <img
                                    src={`${API_URL}/uploads/${post.imageUrl}`}
                                    alt={post.title}
                                    className="w-full h-70 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        )}
                        <div className="w-full mt-5">
                            <h3 className="text-3xl text-[#783fa4] mb-4 border-b-2 border-gray-200 pb-2 font-semibold">Ingredients:</h3>
                            <ul className="list-none pl-0 mb-6">
                                {post.ingredients && post.ingredients.map((ingredient, index) => (
                                    <li key={index} className="text-lg text-gray-700 mb-2 flex items-center">
                                        <input className="mr-3 w-5 h-5 text-black p-3" id={`ingredient-${index}`} />
                                        <label htmlFor={`ingredient-${index}`}>{ingredient}</label>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="text-3xl text-[#783fa4] mb-4 border-b-2 border-gray-200 pb-2 font-semibold">Description:</h3>
                            <p className="text-lg text-gray-700 mb-6 whitespace-pre-wrap">{post.description}</p>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4 justify-center">
                        <Link
                            to="/Dashboard"
                            className="inline-block px-6 py-3 bg-black text-white no-underline rounded-lg text-lg transition-all duration-300 hover:bg-gray-700 hover:scale-105"
                        >
                            Back to All Recipes
                        </Link>
                        {currentUserId && post.user && currentUserId === post.user._id && (
                            <Link
                                to={`/edit-post/${post._id}`}
                                className="inline-block px-6 py-3 bg-blue-600 text-white no-underline rounded-lg text-lg transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                            >
                                Edit Recipe
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;
