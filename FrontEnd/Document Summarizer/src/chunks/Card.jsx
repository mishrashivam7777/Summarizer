import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ imageUrl, heading, description }) => {
  return (
    <div className="bg-white w-[300px]  rounded-lg  overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-center mb-4">
          <img src={imageUrl} alt={heading} className="w-12 h-12" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-center">{heading}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
