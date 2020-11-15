import React from 'react';
import PropTypes from 'prop-types';

//import Typography from '@material-ui/core/Typography';

import StarRatingComponent from 'react-star-rating-component';

const ProfileHomeComponent = props => {
  const { profile } = props;
  const ranking = profile.ranking ? profile.ranking.rank : ""
  return (
    <div className="p-grid profile-home" style={{ padding: '0 1rem' }}>
      <div className="p-col-12">
        <div id="profile-details">
          <p>
            <span style={{ minWidth: 75, display: 'inline-block' }}>
              Name:{' '}
            </span>
            {`${profile.firstName} ${profile.lastName}`}
          </p>
          <p>
            <span style={{ minWidth: 75, display: 'inline-block' }}>
              Email:{' '}
            </span>
            <a
              href={`mailto:${profile.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="no-padding"
            >
              {`${profile.email}`}
            </a>
          </p>

          <p>
            <span style={{ minWidth: 75, display: 'inline-block' }}>
              Mobile:{' '}
            </span>
            <a
              href={`tel:+${profile.mobile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="no-padding"
            >
              {`+${profile.mobile}`}
            </a>
          </p>
          <div>
            <span style={{ minWidth: 75, display: 'inline-block' }}>
              Rating:{' '}
            </span>
            {`${parseFloat(profile.rating / profile.totalOrders || 0).toFixed(
              1
            )}`}
            <span className="_rating">
              <StarRatingComponent
                name="rating"
                starCount={5}
                editing={false}
                emptyStarColor="#ccc"
                value={parseInt(profile.rating / profile.totalOrders)}
              />
            </span>
          </div>
          <p>
            <span style={{ minWidth: 75, display: 'inline-block' }}>
              Ranking:{' '}
            </span>
            <a
              href={`tel:+${profile.mobile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="no-padding"
            >
              {ranking.toUpperCase()}
            </a>
          </p>
        </div>
      </div>
      {/* <div className="p-col-12 p-md-4">
        <div className="order-stats">
          <div>
            <Typography>{profile.totalOrders || 0}</Typography>
            <p>Orders</p>
          </div>
          <i className="fas fa-clipboard-list" />
        </div>
      </div>
      <div className="p-col-12 p-md-4">
        <div className="order-stats">
          <div>
            <Typography>
              {parseFloat(profile.rating / profile.totalOrders || 0).toFixed(1)}
            </Typography>
            <p>Rating</p>
          </div>
          <i className="fas fa-star" />
        </div>
      </div> */}

      <div className="p-col-12" id="badges">
        <div
          className={
            profile.active ? 'badge-div active' : 'badge-div in-active'
          }
        >
          active
        </div>
        <div
          className={
            profile.isVerified ? 'badge-div active' : 'badge-div in-active'
          }
        >
          verified
        </div>
        <div
          className={
            profile.isSubDriver ? 'badge-div active' : 'badge-div in-active'
          }
        >
          sub driver
        </div>
        <div
          className={
            profile.blocked ? 'badge-div banned' : 'badge-div in-active'
          }
        >
          blocked
        </div>
      </div>
    </div>
  );
};

ProfileHomeComponent.propTypes = {
  profile: PropTypes.shape({
    picture: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    totalOrders: PropTypes.number,
    rating: PropTypes.number,
    active: PropTypes.bool,
    banned: PropTypes.bool,
    isSubDriver: PropTypes.bool,
    isVerified: PropTypes.bool
  })
};

export default ProfileHomeComponent;
