// src/ShowCreators.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Card } from '../components/Card';
import Header from '../components/Header'; // Import Header component

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*');

      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data);
      }
    };

    fetchCreators();
  }, []);

  return (
    <div>
      <Header /> {/* Add Header component */}
      <div className="content-container">
        {creators.length > 0 ? (
          creators.map(creator => (
            <Card
              key={creator.id}
              id={creator.id}
              name={creator.name}
              url={creator.url}
              description={creator.description}
              imageURL={creator.imageURL}
            />
          ))
        ) : (
          <div className="no-creators-message">
            No Creators Yet 😞
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCreators;
