import React from 'react';
import PropTypes from 'prop-types';

import './Container.scss';

const Container = ({ children, title, icon }) => {
  return (
    <div className="Container">
      {children}

      {/* для HomePage */}
      <div className="homepage-container">
        <h1 className="homepage-title">
          {title}
          <span role="img" aria-label="Phonebook icon">
            {icon}
          </span>
        </h1>
      </div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  icon: PropTypes.string,
};

export default Container;
