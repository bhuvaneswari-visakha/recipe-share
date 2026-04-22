import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import axios from 'axios';
import Head2 from './Head2';
import { API_URL } from '../config';

const Creating = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        ingredients: "",
        recipeImage: null,
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const createStyle = {
        backgroundImage: `url(https://i.pinimg.com/1200x/52/58/30/525830bcdff4027e742fe03cb2702410.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            recipeImage: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!formData.recipeImage) {
            alert("Please select an image");
            return;
        }

        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);

            const ingredientsArray = formData.ingredients
                                            .split('\n')
                                            .map(item => item.trim())
                                            .filter(item => item !== '');
            if (formData.ingredients.trim() !== '' && ingredientsArray.length === 0) {
                setError("Please list valid ingredients (one per line).");
                return;
            }

            ingredientsArray.forEach(ingredient => {
                data.append("ingredients", ingredient);
            });
            data.append("recipeImage", formData.recipeImage);

            const token = localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to create a post.");
                navigate('/login');
                return;
            }

            const res = await axios.post(
                `${API_URL}/api/posts/create`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Recipe shared successfully!")
            setMessage("Recipe shared successfully!");
            console.log("Response:", res.data); 
            setFormData({ title: "", description: "", ingredients: "", recipeImage: null });
            if (document.getElementById("recipeImageInput")) {
                document.getElementById("recipeImageInput").value = "";
            }
        } catch (err) {
            console.error("Upload failed:", err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || "Error uploading recipe. Please try again.");
            if (err.response && err.response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
    };

    const { title, description, ingredients } = formData;

    return (
        <>
            <Head2/>
            <div style={{ ...createStyle, paddingTop: '80px' }}> 
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-3xl mx-4">
                    <div className="mb-6">
                        <Logo />
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl text-purple-600 text-center font-bold mb-6 sm:mb-8">
                        Share Your Recipe
                    </h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                        {message && <p className="text-green-600 text-center font-semibold bg-green-50 p-3 rounded-lg">{message}</p>}
                        {error && <p className="text-red-600 text-center font-semibold bg-red-50 p-3 rounded-lg">{error}</p>}

                        <div>
                            <label htmlFor="title" className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                                Recipe Title
                            </label>
                            <input
                                className="block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base sm:text-lg transition-all outline-none"
                                id="title"
                                type="text"
                                name="title"
                                placeholder="Give your recipe a catchy title"
                                value={title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                                Description & Instructions
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows="5"
                                className="block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base sm:text-lg transition-all outline-none resize-none"
                                placeholder="Tell us about your recipe and preparation steps..."
                                value={description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="ingredients" className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                                Ingredients (One per line)
                            </label>
                            <textarea
                                name="ingredients"
                                id="ingredients"
                                rows="6"
                                className="block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base sm:text-lg transition-all outline-none resize-none"
                                placeholder="List ingredients, one per line&#10;Example:&#10;2 cups flour&#10;1 tsp salt&#10;3 eggs"
                                value={ingredients}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="recipeImageInput" className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                                Upload Photo
                            </label>
                            <input
                                type="file"
                                id="recipeImageInput"
                                name="recipeImage"
                                className="block w-full text-sm sm:text-base text-gray-600
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-lg file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-purple-50 file:text-purple-700
                                            hover:file:bg-purple-100 file:cursor-pointer
                                            cursor-pointer border-2 border-gray-300 rounded-lg p-2"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                        </div>

                        <div className="pt-4">
                            <Button name="Post Recipe" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Creating;