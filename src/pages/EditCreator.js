import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header'; 
import './Style.css'; 

const EditCreator = () => {
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [youtube, setYouTube] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const { id } = useParams();
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
        setName(data.name);
        setImageURL(data.imageURL);
        setDescription(data.description);
        setYouTube(data.youtube);
        setTwitter(data.twitter);
        setInstagram(data.instagram);
      }
    };

    fetchCreator();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from('creators')
      .update({
        name,
        imageURL,
        description,
        youtube,
        twitter,
        instagram
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error);
    } else {
      console.log('Content creator updated:', data);
      navigate('/');
    }
  };

  const handleDeleteClick = (event) => {
    if (event) event.preventDefault(); 
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
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

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="content-container">
      <Header />
      <h1>Edit Creator</h1>
      {name ? (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="imageURL">Image URL:</label>
              <p>Provide a link to an image of your creator. Be sure to include the http://</p>
              <input
                type="url"
                id="imageURL"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="youtube">YouTube Handle:</label>
              <p>The creator's YouTube handle (without the @)</p>
              <input
                type="text"
                id="youtube"
                value={youtube}
                onChange={(e) => setYouTube(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="twitter">Twitter Handle:</label>
              <p>The creator's Twitter handle (without the @)</p>
              <input
                type="text"
                id="twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="instagram">Instagram Handle:</label>
              <p>The creator's Instagram handle (without the @)</p>
              <input
                type="text"
                id="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="button-container">
              <button type="submit">SUBMIT</button>
              <button
                onClick={(e) => handleDeleteClick(e)} 
                className="delete-button"
              >
                DELETE
              </button>
            </div>
          </form>
          {showConfirm && (
            <div className="confirm-dialog">
              ⚠️ WAIT!!!! ⚠️
              <p>Are you sure you want to delete this creator?</p>
              <button onClick={confirmDelete}>YES! TOTALLY SURE</button>
              <button onClick={cancelDelete}>NAH, NEVER MIND</button>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditCreator;
