import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import axios from 'axios';
import Head2 from './Head2';

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
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
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
                "http://localhost:5000/api/posts/create",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("recipe shared Successfully")
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
            <div style={{ ...createStyle, paddingTop: '72px' }}> 
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '15px', width: '90%', maxWidth: '700px' }}>
                    <Logo />
                    <div className='items-center mx-auto' style={{ maxWidth: '600px' }}>
                        <h1 className='text-5xl px-20 text-purple-600 text-center'>Share Your Recipe</h1>
                        <form onSubmit={handleSubmit} className='text-purple-600 border p-7 m-3 rounded-2xl w-full'>
                            {message && <p className="text-purple-600 text-center mb-4">{message}</p>}
                            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                            <label htmlFor="title" className="block text-lg font-medium mb-2">Title</label>
                            <input
                                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-lg transition duration-150 ease-in-out'
                                id="title"
                                type="text"
                                name="title"
                                placeholder='Give your recipe a title'
                                value={title}
                                onChange={handleChange}
                                required
                            /><br />

                            <label htmlFor="description" className="block text-lg font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows="3"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-lg transition duration-150 ease-in-out"
                                placeholder="Tell us about your recipe and preparation steps..."
                                value={description}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <br />

                            <label htmlFor="ingredients" className="block text-lg font-medium mb-2">
                                Ingredients (One per line)
                            </label>
                            <textarea
                                name="ingredients"
                                id="ingredients"
                                rows="5"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-lg transition duration-150 ease-in-out"
                                placeholder="List ingredients, one per line"
                                value={ingredients}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <br />

                            <label htmlFor="recipeImageInput" className="block text-lg font-medium mb-2">
                                Upload Photo
                            </label>
                            <input
                                type="file"
                                id="recipeImageInput"
                                name="recipeImage"
                                className="mt-1 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-violet-50 file:text-violet-700
                                            hover:file:bg-violet-100"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                            <br />

                            <div className='mt-4 text-center'>
                                <Button name='Post Recipe' type='submit' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Creating;