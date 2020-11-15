import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DialogTitle, DialogActions, DialogContent } from '@material-ui/core';

import ApiCalls from '../../../service/RequestHandler';
import RequestCard from '../../requests/components/RequestCard';
import FormSubmitBtn from '../../../components/form/FormSubmitBtn';
import EmptyPlaceholder from '../../../components/ui/EmptyPlaceholder';

class DriverRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      activity: false
    };
  }

  componentDidMount() {
    this.getRequests();
  }

  async getRequests() {
    this.setState({ activity: true });
    try {
      const response = await ApiCalls.getOrdersByDriver({
        _id: this.props.profile._id,
        status: 'all'
      });
      this.setState({ activity: false, requests: response.data });
    } catch (error) {
      this.setState({ activity: false });
    }
  }

  render() {
    const { activity, requests } = this.state;

    return (
      <>
        <DialogTitle id="customized-dialog-title">Driver Requests</DialogTitle>
        <DialogContent>
          <div
            className="p-grid"
            style={{
              margin: 0,
              paddingTop: '1rem',
              justifyContent: 'flex-start'
            }}
          >
            {requests.length ? (
              requests.map(item => {
                if (item._id) {
                  return (
                    <div key={item._id} className="p-col-12 p-sm-6 p-lg-4">
                      <RequestCard
                        request={item}
                        requestType="requests"
                        goTo="requests"
                        target="_blank"
                        showRates
                      />
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <div className="p-col-12">
                <EmptyPlaceholder message="We could not find any requests." />
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <FormSubmitBtn
            label="Back"
            disabled={activity}
            onSubmit={this.props.handleCloseDialog}
            style={{
              width: 'unset',
              borderRadius: 4
            }}
          />
        </DialogActions>
      </>
    );
  }
}

DriverRequests.propTypes = {
  handleCloseDialog: PropTypes.func,
  profile: PropTypes.shape({ _id: PropTypes.string })
};

export default DriverRequests;
