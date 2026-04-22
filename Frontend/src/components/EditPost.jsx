import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Head2 from './Head2'; 
const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(''); 
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [newImage, setNewImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const mainContainerStyle = {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginTop: '92px' 
    };

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const postData = res.data;
                setTitle(postData.title);
                setDescription(postData.description);
                setIngredients(postData.ingredients.join('\n'));
                setCurrentImageUrl(postData.imageUrl);

            } catch (err) {
                console.error('Failed to fetch post for editing:', err.response ? err.response.data : err.message);
                setError(err.response?.data?.message || 'Failed to load post for editing.');
                if (err.response && err.response.status === 401) {
                    alert('Not authorized to edit this post or session expired. Please log in again.');
                    localStorage.clear();
                    navigate('/login');
                } else if (err.response && err.response.status === 404) {
                    alert('Post not found.');
                    navigate('/');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);

        const ingredientsArray = ingredients
                                .split('\n')
                                .map(item => item.trim())
                                .filter(item => item !== '');
        if (ingredients.trim() !== '' && ingredientsArray.length === 0) {
            setError("Please list valid ingredients (one per line).");
            setLoading(false);
            return;
        }

        ingredientsArray.forEach(ingredient => {
            formData.append("ingredients", ingredient);
        });
        
        if (newImage) {
            formData.append('recipeImage', newImage);
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            await axios.patch(`http://localhost:5000/api/posts/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Recipe updated successfully!'); 
            navigate(`/posts/${id}`);
        } catch (err) {
            console.error('Failed to update post:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Error updating recipe. Please try again.');
            if (err.response && err.response.status === 401) {
                alert('Not authorized to edit this recipe or session expired. Please log in again.');
                localStorage.clear();
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Head2 />
                <div style={{ textAlign: 'center', padding: '20px', marginTop: '72px' }}>Loading for edit...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Head2 />
                <div style={{ color: 'red', textAlign: 'center', padding: '20px', marginTop: '72px' }}>{error}</div>
            </>
        );
    }

    return (
        <div style={{backgroundImage:`url(https://i.pinimg.com/736x/46/4c/b5/464cb52d42d042331b46e566008fa225.jpg)`,backgroundSize:'cover'}}>
            <Head2 />
            <div style={mainContainerStyle}>
                <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Edit Recipe</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="6"
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', resize: 'vertical' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="ingredients" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ingredients (one per line):</label>
                        <textarea 
                            id="ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            required
                            rows="5"
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', resize: 'vertical' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="currentImage" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Current Image:</label>
                        {currentImageUrl && (
                            <img
                                src={`http://localhost:5000/uploads/${currentImageUrl}`}
                                alt="Current Recipe"
                                style={{ maxWidth: '400px', height: 'auto', display: 'block', marginBottom: '10px', borderRadius: '5px' }}
                            />
                        )}
                        <label htmlFor="newImage" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Upload New Image (optional):</label>
                        <input
                            type="file"
                            id="newImage"
                            accept="image/*"
                            onChange={(e) => setNewImage(e.target.files[0])}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc',backgroundColor:'#783fa4', borderRadius: '5px' }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '12px 20px',
                            backgroundColor: '#783fa4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            transition: 'background-color 0.2s ease',
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? 'Updating...' : 'Update Recipe'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/Dashboard`)}
                        style={{
                            padding: '12px 20px',
                            backgroundColor: '#000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            transition: 'background-color 0.2s ease',
                            marginTop: '10px'
                        }}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPost; 