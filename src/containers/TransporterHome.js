import React, { Component } from 'react';

import { Grid } from '@material-ui/core';

import {
  LineChartComponent,
  BarChartComponent
} from '../components/dashboard-ui/Charts';
import ApiCalls from '../service/RequestHandler';
import routes from '../constants/route-constants';
import UiCard from '../components/dashboard-ui/card';
import SupportAction from '../components/dashboard-ui/SupportAction';
import PromotionCard from '../components/dashboard-ui/PromotionCard';
import RecentActivity from '../components/dashboard-ui/RecentActivity';
import TransporterRequestComponent from '../components/dashboard-ui/TransporterRequestComponent';

export class TransporterHome extends Component {
  state = {
    recentActivity: [],
    all: [],
    allTimeRecord: [],
    cancelled: [],
    delivered: [],
    inprogress: [],
    pending: [],
    earningReport: [],
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
      const response = await ApiCalls.dashboardStats({
        startDate,
        endDate,
        period
      });
      const {
        all,
        allTimeRecord,
        cancelled,
        delivered,
        inprogress,
        pending,
        earningReport
      } = await response.data;
      this.setState({
        all,
        allTimeRecord,
        cancelled,
        delivered,
        inprogress,
        pending,
        earningReport
      });
    } catch (error) {
      //
    }
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
      allTimeRecord,
      cancelled,
      delivered,
      inprogress,
      pending,
      earningReport,
      startDate,
      endDate
    } = this.state;
    return (
      <React.Fragment>
        <div className="page-title">
          <span style={{ width: '100%', paddingBottom: 10 }}>
            <span style={{ fontSize: '1.5rem', color: '#7d7d7d' }}>
              Transporter{' '}
            </span>
            Dashboard
          </span>
        </div>
        <div className="t-dashboard-container">
          <div style={{ flexGrow: 1 }}>
            <Grid container spacing={16}>
              <Grid item xs={12} sm={12} md={6}>
                <UiCard name="Earnings">
                  <LineChartComponent earningReport={earningReport} />
                </UiCard>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <UiCard
                  name="Transporter Statistics"
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
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                className="transporter-recent-activity"
              >
                <UiCard name="Request">
                  <TransporterRequestComponent allTimeRecord={allTimeRecord} />
                </UiCard>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <UiCard name="Promotions">
                  <PromotionCard discount={15} />
                </UiCard>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                className="user-dashboard-support"
              >
                <UiCard name="Support">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center'
                    }}
                  >
                    <SupportAction
                      name="Call"
                      bgColor="#152972"
                      img="icon-call.png"
                    />
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
              <Grid
                item
                xs={12}
                style={{ padding: 10 }}
                className="transporter-recent-activity"
              >
                <UiCard name="Recent Activity">
                  <RecentActivity
                    routeTo={routes.myRequests}
                    goTo={`/${routes.typeTransporter}/${routes.requests}/${routes.requestDetails}`}
                    rows={recentActivity.slice(0, 5)}
                  />
                </UiCard>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
