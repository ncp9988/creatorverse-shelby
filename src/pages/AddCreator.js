import React, { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Header'; 
import './Style.css';

const AddCreator = () => {
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [youtube, setYouTube] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from('creators')
      .insert([{
        name,
        imageURL,
        description,
        youtube,
        twitter,
        instagram
      }]);

    if (error) {
      console.error('Error adding content creator:', error);
    } else {
      console.log('Content creator added:', data);
      navigate('/');
    }
  };

  return (
    <div>
      <Header />
      <div className="content-container">
        <h1>Add a Creator</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="imageURL">Image URL</label>
            <p>Provide a link to an image of your creator. Be sure to include the http://</p>
            <input
              type="url"
              id="imageURL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="youtube">YouTube</label>
            <p>The creator's YouTube handle (without the @)</p>
            <input
              type="text"
              id="youtube"
              value={youtube}
              onChange={(e) => setYouTube(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="twitter">Twitter</label>
            <p>The creator's Twitter handle (without the @)</p>
            <input
              type="text"
              id="twitter"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="instagram">Instagram</label>
            <p>The creator's Instagram handle (without the @)</p>
            <input
              type="text"
              id="instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
          <button type="submit">Add Creator</button>
        </form>
      </div>
    </div>
  );
};

export default AddCreator;
