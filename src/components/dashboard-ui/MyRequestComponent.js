/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../constants/route-constants';

class MyRequestComponent extends Component {
  getStatus = type => {
    switch (type) {
      case 'delivered':
        return 'completed';
      case 'inprogress':
        return 'accepted';
      case 'assigned':
        return 'pending';
      default:
        return type;
    }
  };

  render() {
    // Size of the enclosing square
    const sqSize = this.props.sqSize || 0;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset =
      dashArray - (dashArray * this.props.percentage || 0) / 100;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <svg
          width={this.props.sqSize}
          height={this.props.sqSize}
          viewBox={viewBox}
          style={{
            padding: 5,
            width: '100%'
          }}
        >
          <Link
            to={`/${routes.typeUser}/${routes.requests}/${this.getStatus(
              this.props.name
            )}`}
          >
            <circle
              className="__circle-background"
              cx={this.props.sqSize / 2}
              cy={this.props.sqSize / 2}
              r={radius}
              strokeWidth={`${this.props.strokeWidth}px`}
            />
            <circle
              className="__circle-progress"
              cx={this.props.sqSize / 2}
              cy={this.props.sqSize / 2}
              r={radius}
              strokeWidth={`${this.props.strokeWidth}px`}
              // Start progress marker at 12 O'Clock
              transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props
                .sqSize / 2})`}
              style={{
                strokeDasharray: dashArray,
                strokeDashoffset: dashOffset,
                stroke: this.props.strokeColor,
                padding: 10
              }}
            />
            <text
              className="__circle-text"
              x="50%"
              y="50%"
              dy=".1em"
              textAnchor="middle"
              style={{
                fill: this.props.strokeColor
              }}
            >
              {`${Math.ceil(this.props.percentage || 0)}%`}
            </text>
          </Link>
        </svg>
        <p style={{ color: '#2b2b2b', textTransform: 'capitalize' }}>
          {this.props.name}
        </p>
      </div>
    );
  }
}

MyRequestComponent.defaultProps = {
  sqSize: 200,
  percentage: 25,
  strokeWidth: 10
};

MyRequestComponent.propTypes = {
  label: PropTypes.string,
  sqSize: PropTypes.string,
  percentage: PropTypes.number,
  strokeWidth: PropTypes.string,
  strokeColor: PropTypes.string,
  name: PropTypes.string
};

export default MyRequestComponent;
