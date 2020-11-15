import React from 'react';

import PropTypes from 'prop-types';

export const ListComponent = props => {
  return (
    <td>
      <div>
        {props.left ? (
          <img
            className="_fa"
            src={`${process.env.PUBLIC_URL}${props.left}`}
            alt=""
          />
        ) : null}
        <span onClick={props.onClick}>{props.name}</span>
      </div>
      {props.right ? (
        <span className="right_service_icon" onClick={props.onRemove}>
          <img
            src="https://img.icons8.com/android/16/000000/trash.png"
            alt=""
          />
        </span>
      ) : null}
    </td>
  );
};

ListComponent.prototypes = {
  left: PropTypes.string,
  right: PropTypes.string,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  name: PropTypes.string
};

export const ListComponents = ({ children, onClick }) => {
  return <tr onClick={onClick}>{children}</tr>;
};

ListComponents.prototypes = {
  children: PropTypes.oneOf([PropTypes.array, PropTypes.shape()]),
  onClick: PropTypes.func
};
