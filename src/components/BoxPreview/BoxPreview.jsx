import React, { useState } from 'react';
import './BoxPreview.css';
import PreviewItems from '../PreviewItems/PreviewItems';
import { useHistory } from 'react-router-dom';

const BoxPreview = ({ boxImage }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isBoxOpened, setIsBoxOpened] = useState(false);
  const history = useHistory();

  const handleMouseEnter = (item) => {
    if (isBoxOpened) {
      setHoveredItem(item);
    }
  };

  const handleMouseLeave = () => {
    if (isBoxOpened) {
      setHoveredItem(null);
    }
  };

  const handleClick = (item) => {
    if (isBoxOpened) {
      setSelectedItem(item);
    }
  };

  const handleOpenBox = () => {
    setIsBoxOpened(true);
  };

  const handleClosePreview = () => {
    setSelectedItem(null);
  };

  const handleButtonClick = () => {
    history.push("/box-setup-information");
  };

  return (
    <div className="box-preview-container">
      <div className={`box-preview ${isBoxOpened ? 'box-opened' : ''}`}>
        <div className="box-images">
          {/* Closed Box Image */}
          <img
            src={boxImage}
            alt="Box"
            className={`closed-box ${isBoxOpened ? 'slide-out' : ''}`}
            onClick={handleOpenBox}
          />

          {/* Open Box Image */}
          <img
            src="/RecipientBoxOpen.png"
            alt="Box Open"
            className={`open-box-image ${isBoxOpened ? 'reveal' : ''}`}
            useMap="#image-map"
          />
        </div>

        {/* Image Map Areas */}
        {isBoxOpened && (
          <map name="image-map">
            <area
              alt="Photos"
              title="Photos"
              coords="100,70,230,285"
              shape="rect"
              onMouseEnter={() => handleMouseEnter('Photos')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('Photos')}
            />
            <area
              alt="Gift"
              title="Gift"
              coords="100,290,230,400"
              shape="rect"
              onMouseEnter={() => handleMouseEnter('Gift')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('Gift')}
            />
            <area
              alt="Music"
              title="Music"
              coords="90,410,240,510"
              shape="rect"
              onMouseEnter={() => handleMouseEnter('Music')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('Music')}
            />
            <area
              alt="Videos"
              title="Videos"
              coords="255,70,510,260"
              shape="rect"
              onMouseEnter={() => handleMouseEnter('Videos')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('Videos')}
            />
            <area
              alt="Voice Notes"
              title="Voice Notes"
              coords="255,275,520,330"
              shape="rect"
              onMouseEnter={() => handleMouseEnter('Voice Notes')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('Voice Notes')}
            />
            <area
              alt="Letters"
              title="Letters"
              coords="255,360,520,510"
              shape="rect"
              onMouseEnter={() => handleMouseEnter('Letters')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('Letters')}
            />
          </map>
        )}

        {/* Overlay Items */}
        {['Photos', 'Gift', 'Music', 'Videos', 'Voice Notes', 'Letters'].map((item) => (
          <div
            key={item}
            className={`overlay ${item.toLowerCase().replace(' ', '-')}`}
            style={{ display: hoveredItem === item && isBoxOpened ? 'block' : 'none' }}
          >
            {item}
          </div>
        ))}
         {/* Button always displayed */}
      <div className="box-preview-button-container">
        <button onClick={handleButtonClick}>Get Started</button>
      </div>
      </div>

      {/* PreviewItems Modal */}
      {selectedItem && isBoxOpened && (
        <PreviewItems item={selectedItem} onClose={handleClosePreview} />
      )}
    </div>
    
  );
};

export default BoxPreview;
