import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('myRecipes');
  const [myRecipes, setMyRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const fetchMyRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Please log in to view your recipes.");
        setLoading(false);
        navigate('/login');
        return;
      }

      const res = await axios.get(`${API_URL}/api/posts/myposts`, {
        headers: getAuthHeaders(),
      });
      setMyRecipes(Array.isArray(res.data) ? res.data : (res.data.posts || []));
    } catch (err) {
      console.error('Failed to fetch my recipes:', err);
      setError(err.response?.data?.message || 'Failed to load your recipes. Please try again later.');
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders, navigate]);

  const fetchSavedRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Please log in to view your saved recipes.");
        setLoading(false);
        navigate('/login');
        return;
      }

      const res = await axios.get(`${API_URL}/api/posts/saved`, {
        headers: getAuthHeaders(),
      });
      setSavedRecipes(Array.isArray(res.data) ? res.data : (res.data.posts || []));
    } catch (err) {
      console.error('Failed to fetch saved recipes:', err);
      setError(err.response?.data?.message || 'Failed to load saved recipes. Please try again later.');
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders, navigate]);

  const fetchLikedRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Please log in to view your liked recipes.");
        setLoading(false);
        navigate('/login');
        return;
      }

      const res = await axios.get(`${API_URL}/api/posts/liked`, {
        headers: getAuthHeaders(),
      });
      setLikedRecipes(Array.isArray(res.data) ? res.data : (res.data.posts || []));
    } catch (err) {
      console.error('Failed to fetch liked recipes:', err);
      setError(err.response?.data?.message || 'Failed to load liked recipes. Please try again later.');
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders, navigate]);


  useEffect(() => {
    setLoading(true);
    setError(null);
    if (activeTab === 'myRecipes') {
      fetchMyRecipes();
    } else if (activeTab === 'savedRecipes') {
      fetchSavedRecipes();
    } else if (activeTab === 'likedRecipes') {
      fetchLikedRecipes();
    }
  }, [activeTab, fetchMyRecipes, fetchSavedRecipes, fetchLikedRecipes]);


  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You are not authorized to delete posts. Please log in.');
          navigate('/login');
          return;
        }
        await axios.delete(`${API_URL}/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== postId));
        setSavedRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== postId));
        setLikedRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== postId));
        alert('Recipe deleted successfully!');
      } catch (err) {
        console.error('Failed to delete post:', err.response ? err.response.data : err.message);
        alert(err.response?.data?.message || 'Error deleting recipe. Please try again.');
        if (err.response && err.response.status === 401) {
          localStorage.clear();
          navigate('/login');
        }
      }
    }
  };
  const renderRecipeList = (recipes) => (
    <div style={{
      flexGrow: 1,
      overflowY: 'auto',
      paddingRight: '10px',
    }}>
      {loading && <p style={{ textAlign: 'center', color: '#666' }}>Loading recipes...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      {!loading && !error && recipes.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          {activeTab === 'myRecipes' ? "You haven't created any recipes yet." :
            activeTab === 'savedRecipes' ? "You haven't saved any recipes yet." :
              "You haven't liked any recipes yet."}
        </p>
      )}
      {!loading && !error && recipes.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '15px'
        }}>
          {recipes.map(post => (
            <div
              key={post._id}
              style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#f9f9f9',
                display: 'flex',
                gap: '15px',
                alignItems: 'center'
              }}
            >
              {post.imageUrl && (
                <img
                  src={`${API_URL}/uploads/${post.imageUrl}`}
                  alt={post.title}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                />
              )}
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>
                  <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none', color: '#430f6bff' }}>
                    {post.title}
                  </Link>
                </h4>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#666' }}>
                  {post.description.substring(0, 80)}{post.description.length > 80 ? '...' : ''}
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {activeTab === 'myRecipes' && (
                    <>
                      <Link to={`/edit-post/${post._id}`} style={{ padding: '8px 12px', backgroundColor: '#362145ff', color: 'white', textDecoration: 'none', borderRadius: '5px', fontSize: '0.8rem' }}>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id)}
                        style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{
      backgroundSize: 'cover',
      minHeight: '100vh',
      backgroundImage: `url(https://i.pinimg.com/1200x/17/0f/fd/170ffdab81a63e7b28f0569ed12cb1f3.jpg)`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '50px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '90%',
        maxWidth: '800px',
        padding: '20px',
        maxHeight: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', borderBottom: '1px solid #eee' }}>
          <button
            onClick={() => setActiveTab('myRecipes')}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeTab === 'myRecipes' ? 'bold' : 'normal',
              color: activeTab === 'myRecipes' ? '#783fa4' : '#555',
              borderBottom: activeTab === 'myRecipes' ? '2px solid #783fa4' : 'none'
            }}
          >
            My Recipes
          </button>
          <button
            onClick={() => setActiveTab('savedRecipes')}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeTab === 'savedRecipes' ? 'bold' : 'normal',
              color: activeTab === 'savedRecipes' ? '#783fa4' : '#555',
              borderBottom: activeTab === 'savedRecipes' ? '2px solid #783fa4' : 'none'
            }}
          >
            Saved Recipes
          </button>
          <button
            onClick={() => setActiveTab('likedRecipes')}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeTab === 'likedRecipes' ? 'bold' : 'normal',
              color: activeTab === 'likedRecipes' ? '#783fa4' : '#555',
              borderBottom: activeTab === 'likedRecipes' ? '2px solid #783fa4' : 'none'
            }}
          >
            Liked Recipes
          </button>
        </div>

        {activeTab === 'myRecipes' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Link to="/create" style={{
                backgroundColor: '#783fa4',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontSize: '1.1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}>
                + Create New Recipe
              </Link>
            </div>
            {renderRecipeList(myRecipes)}
          </>
        )}

        {activeTab === 'savedRecipes' && (
          renderRecipeList(savedRecipes)
        )}
        {activeTab === 'likedRecipes' && (
          renderRecipeList(likedRecipes)
        )}
      </div>
    </div>
  );
};

export default Profile;