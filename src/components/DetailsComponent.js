import React from 'react';

export const Left = props => {
  return <div style={{ flex: 1, position: 'relative' }}>{props.children}</div>;
};
export const Right = props => {
  return <div style={{ flex: 1 }}>{props.children}</div>;
};
export const DetailsComponent = props => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 80px',
        backgroundColor: '#ccc'
      }}
    >
      {props.children}
    </div>
  );
};
