import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaYoutube, FaTwitter, FaInstagram, FaInfoCircle, FaEdit } from 'react-icons/fa';
import './Card.css';

export const Card = ({ id, name, imageURL, description }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit/${id}`);
  };

  const handleInfoClick = () => {
    navigate(`/creator/${id}`);
  };

  return (
    <div className="card" style={{ backgroundImage: `url(${imageURL})` }}>
      <h2>{name}
        <div className="icon-right">
          <FaInfoCircle className="icon" onClick={handleInfoClick} />
          <FaEdit className="icon" onClick={handleEditClick} />
        </div>
      </h2>
      <div className="icon-left">
        <FaYoutube className="icon" />
        <FaTwitter className="icon" />
        <FaInstagram className="icon" />
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
    </div>
  );
};
