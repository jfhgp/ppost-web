import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import ApiCalls from '../service/RequestHandler';
import routes from '../constants/route-constants';
import UiCard from '../components/dashboard-ui/card';
import SupportAction from '../components/dashboard-ui/SupportAction';
import PromotionCard from '../components/dashboard-ui/PromotionCard';
import { BarChartComponent } from '../components/dashboard-ui/Charts';
import RecentActivity from '../components/dashboard-ui/RecentActivity';
import MyRequestComponent from '../components/dashboard-ui/MyRequestComponent';
import FormSubmitBtn from '../components/form/FormSubmitBtn';

const MyRequestCircle = ['pending', 'inprogress', 'delivered'];

class UserHome extends Component {
  state = {
    recentActivity: [],
    all: [],
    cancelled: [],
    delivered: [],
    inprogress: [],
    pending: [],
    allTimeRecord: [],
    startDate: new Date(new Date().getFullYear(), 0),
    endDate: new Date(),
    period: 'monthly'
  };

  componentDidMount() {
    this.getAcceptedOrders();
    this.getDashboardStats();
  }

  getAcceptedOrders = async () => {
    try {
      const response = await ApiCalls.recentActivity();
      await this.setState({ recentActivity: response.data });
    } catch (error) {
      //
    }
  };

  handleDateChange = async (e, name) => {
    await this.setState({
      [name]: e
    });
    this.getDashboardStats();
  };

  getDashboardStats = async () => {
    const { startDate, endDate, period } = this.state;
    try {
      const response = await ApiCalls.userDashboardStats({
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
        period
      });
      const {
        all,
        allTimeRecord,
        cancelled,
        delivered,
        inprogress,
        pending
      } = response.data;
      this.setState({
        all,
        allTimeRecord,
        cancelled,
        inprogress,
        delivered,

        pending
      });
    } catch (error) {
      //
    }
  };

  getTotalOrders = () =>
    this.state.allTimeRecord.length &&
    this.state.allTimeRecord.reduce(
      (total, current) => total + current.count,
      0
    );

  getAllTimeRecord = () => {
    const { allTimeRecord } = this.state;

    let allTimeRecordData = Array.from(Array(3), (x, index) => ({
      _id: MyRequestCircle[index],
      count: 0
    }));

    allTimeRecord.length &&
      allTimeRecord.forEach(rec => {
        const foundIndex = allTimeRecordData.findIndex(el => {
          if (rec._id === 'accepted' || rec._id === 'picked') {
            return el._id === 'inprogress';
          }
          return el._id === rec._id;
        });
        const found = allTimeRecordData[foundIndex];

        let updateData;
        if (found) {
          updateData = { ...found };
          updateData.count = updateData.count + rec.count;
          allTimeRecordData = [...allTimeRecordData];
          allTimeRecordData[foundIndex] = updateData;
        }
      });

    return allTimeRecordData;
  };

  getRequestColor = rec => {
    switch (rec) {
      case 'pending':
        return '#3EB9CE';
      case 'inprogress':
        return '#DFC721';
      case 'delivered':
        return '#70D357';
      case 'cancelled':
        return '#DF535B';
      default:
        return '#3b8b68 ';
    }
  };

  render() {
    const {
      recentActivity,
      cancelled,
      delivered,
      inprogress,
      pending,
      startDate,
      endDate
    } = this.state;

    let totalOrders = this.getTotalOrders();
    let allRecords = this.getAllTimeRecord();

    return (
      <React.Fragment>
        <div className="page-title multiple-items">
          <span style={{ paddingBottom: 10 }}>
            <span style={{ fontSize: '1.5rem', color: '#7d7d7d' }}>
              Customer{' '}
            </span>
            Dashboard
          </span>
          <div
          // style={
          //   mobileWidth
          //     ? { margin: '10px 0', flexDirection: 'column-reverse' }
          //     : {}
          // }
          >
            <div>
              <Link
                to={`/${routes.typeUser}/${routes.orders}/${routes.addOrder}`}
              >
                <FormSubmitBtn
                  label="Add Request"
                  // onSubmit={props.onSubmit}
                  // disabled={props.activity}
                />
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="page-title">
          <span style={{ width: '100%', paddingBottom: 10 }}>
            <span style={{ fontSize: '1.5rem', color: '#7d7d7d' }}>
              Customer{' '}
            </span>
            Dashboard
          </span>
        </div> */}
        <div className="u-dashboard-container">
          <div style={{ flexGrow: 1 }}>
            <Grid container spacing={16}>
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                lg={3}
                xl={3}
                className="user-dashboard-requests"
              >
                <UiCard name="My Requests">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                    }}
                  >
                    {allRecords.map((req, i) => {
                      return (
                        <React.Fragment key={i}>
                          <MyRequestComponent
                            strokeWidth="6"
                            sqSize="120"
                            percentage={(req.count / totalOrders) * 100}
                            strokeColor={this.getRequestColor(req._id)}
                            name={req._id}
                          />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </UiCard>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <UiCard
                  name="Customer Statistics"
                  showDate={true}
                  startDate={startDate}
                  endDate={endDate}
                  handleDateChange={this.handleDateChange}
                >
                  <BarChartComponent
                    inprogress={inprogress}
                    cancelled={cancelled}
                    delivered={delivered}
                    pending={pending}
                    getRequestColor={this.getRequestColor}
                  />
                </UiCard>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={12}>
                    <UiCard name="Promotions">
                      <PromotionCard discount={15} />
                    </UiCard>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                lg={12}
                xl={12}
                style={{ padding: 10 }}
              >
                <UiCard name="Recent Activity">
                  <RecentActivity
                    routeTo={routes.orders}
                    goTo={`/${routes.typeUser}/${routes.requests}/${routes.requestDetails}`}
                    rows={recentActivity.slice(0, 5)}
                  />
                </UiCard>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={12} className="user-dashboard-support">
                    <UiCard name="Support">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          alignItems: 'center'
                        }}
                      >
                        <a
                          href="tel:+000000000"
                          rel="noopener noreferrer"
                          target="_blank"
                          style={{ cursor: 'pointer' }}
                        >
                          <SupportAction
                            name="Call"
                            bgColor="#152972"
                            img="icon-call.png"
                          />
                        </a>
                        <a
                          href="mailto:customerservice@ppost.com"
                          rel="noopener noreferrer"
                          target="_blank"
                          style={{ cursor: 'pointer' }}
                        >
                          <SupportAction
                            name="Email"
                            bgColor="#fa7816"
                            img="icon-email.png"
                          />
                        </a>
                      </div>
                    </UiCard>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserHome;
