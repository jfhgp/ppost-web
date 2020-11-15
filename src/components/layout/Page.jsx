import React from 'react';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';

const Page = props => {
  const { style, className, activity, noActivity } = props;
  return (
    <div style={style} className={className}>
      {/* {!noActivity ? (
        <div style={{ height: 5, marginBottom: 10 }}>
          {activity ? <LinearProgress /> : null}
        </div>
      ) : null} */}
      {props.children}
    </div>
  );
};

Page.propTypes = {
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  className: PropTypes.string,
  activity: PropTypes.bool,
  noActivity: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};

export default Page;
