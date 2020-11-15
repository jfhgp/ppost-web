import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import StarRatingComponent from 'react-star-rating-component';

import Page from '../../components/layout/Page';
import EmptyPlaceholder from '../../components/ui/EmptyPlaceholder';

const PreviousTransportersComponent = props => {
  const { activity, prevTransporters } = props;

  return (
    <Page activity={activity} className="previous-transporter-container">
      <div className="p-grid">
        <div className="p-col-12">
          <Typography variant="h5">Your Previous Transporters</Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel
            risus enim.
          </Typography>
        </div>
        {prevTransporters.length ? (
          prevTransporters.map(transporter => (
            <div className="p-col-12 p-sm-4" key={transporter._id}>
              <Card>
                <CardHeader
                  style={{ alignItems: 'flex-start' }}
                  avatar={
                    <Avatar
                      src={transporter.picture ? transporter.picture : null}
                    >
                      {transporter.picture
                        ? ''
                        : `${transporter.firstName ||
                            'First'.charAt(0)} ${transporter.lastName ||
                            'Last'.charAt(0)}`}
                    </Avatar>
                  }
                  title={`${transporter.firstName ||
                    'First'} ${transporter.lastName || 'Last'}`}
                  subheader={
                    <div id="sub-header">
                      <p>{transporter.email}</p>
                      <p>{transporter.mobile}</p>
                      <StarRatingComponent
                        name="rating"
                        value={parseInt(
                          transporter.rating / transporter.totalOrders
                        )}
                        starColor="#5c5eb5"
                        emptyStarColor="#888"
                        editing={false}
                      />
                    </div>
                  }
                />
                <CardContent>
                  <div id="content">
                    <div>
                      <span
                        className={`pi ${
                          transporter.active
                            ? 'pi-check active'
                            : 'pi-times in-active'
                        }`}
                      />
                      <span className={transporter.active ? '' : 'in-active'}>
                        active
                      </span>
                    </div>
                    <div>
                      <span
                        className={transporter.active ? 'active' : 'in-active'}
                        style={{ fontWeight: 'bold' }}
                      >
                        {transporter.totalOrders}
                      </span>
                      <span
                        className={transporter.active ? '' : 'in-active'}
                        style={{ textDecoration: 'none' }}
                      >
                        order(s)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <div className="p-col-12">
            <EmptyPlaceholder message="We could not find any previous transporters." />
          </div>
        )}
      </div>
    </Page>
  );
};

PreviousTransportersComponent.propTypes = {
  activity: PropTypes.bool,
  prevTransporters: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      picture: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      mobile: PropTypes.string,
      rating: PropTypes.number,
      activity: PropTypes.bool,
      active: PropTypes.bool
    })
  )
};

export default PreviousTransportersComponent;
