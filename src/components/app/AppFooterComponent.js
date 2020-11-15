import React from 'react';

import { getPrimaryColors } from '../../utils/functions';

const AppFooterComponent = () => {
  return (
    <footer className="container footer_container">
      <div className="container">
        © {new Date().getFullYear()}{' '}
        <span style={{ color: getPrimaryColors('secondary') }}>PPOST</span>. All
        Rights Reserved{' '}
      </div>
    </footer>
  );
};

export default AppFooterComponent;
