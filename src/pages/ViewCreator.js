import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import Header from '../components/Header';
import { FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Style.css';

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
    };

    fetchCreator();
  }, [id]);

  if (!creator) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting creator:', error);
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <Header />
      <div className="view-content-container">
        <div className="creator-details">
          <img src={creator.imageURL} alt={creator.name} className="creator-image" />
          <div className="creator-info">
            <h1>{creator.name}</h1>
            <p>{creator.description}</p>
            <div className="view-icon-container">
              <a href={`https://youtube.com/${creator.youtube}`} target="_blank" rel="noopener noreferrer" className="icon">
                <FaYoutube /> {creator.youtube}
              </a>
              <a href={`https://twitter.com/${creator.twitter}`} target="_blank" rel="noopener noreferrer" className="icon">
                <FaTwitter /> {creator.twitter}
              </a>
              <a href={`https://instagram.com/${creator.instagram}`} target="_blank" rel="noopener noreferrer" className="icon">
                <FaInstagram /> {creator.instagram}
              </a>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button type="button" className='edit-button' onClick={() => navigate(`/edit/${id}`)}>EDIT</button>
          <button type="button" onClick={handleDelete} className="delete-button">DELETE</button>
        </div>
      </div>
    </div>
  );
};

export default ViewCreator;
