import React from 'react';

import { TextField, Grid } from '@material-ui/core';

import { colors } from '../constants/colors';
import ApiCalls from '../service/RequestHandler';
import { newGrowl } from '../components/ui/GrowlComponent';
import ButtonComponent from '../components/ButtonComponent';

const style = {
  backgroundColor: '#f1f1f1',
  borderRadius: 5
};

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      activity: false,

      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  handleSubmit = async () => {
    if (this.isValid()) {
      this.setState({ activity: true });

      try {
        const response = await ApiCalls.sendContactUsMessage(this.state);
        newGrowl.showGrowl('success', 'Success', response.data.message);
        this.setState({
          activity: false,
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } catch (error) {
        this.setState({ activity: false });
      }
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (this.state.errors[name]) {
      this.setState(prevState => ({
        [name]: value,
        errors: { ...prevState.errors, [name]: false }
      }));
      return;
    }
    this.setState({ [name]: value });
  };

  isValid = () => {
    let isValid = true;
    const errors = {};

    const keys = ['name', 'email', 'message', 'subject'];

    keys.forEach(key => {
      if (!this.state[key]) {
        isValid = false;
        errors[key] = true;
      }
    });

    this.setState({ errors });
    return isValid;
  };

  render() {
    const { errors } = this.state;
    return (
      <form
        noValidate
        autoComplete="off"
        className="contact-us-form"
        style={{ justifyContent: 'center' }}
      >
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} md={6} xl={6}>
            <TextField
              style={{ ...style }}
              placeholder="Name"
              margin="normal"
              variant="outlined"
              fullWidth
              name="name"
              error={errors.name}
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={6}>
            <TextField
              style={{ ...style }}
              placeholder="Email"
              margin="normal"
              variant="outlined"
              fullWidth
              name="email"
              error={errors.email}
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <TextField
              style={{ ...style }}
              placeholder="Subject"
              margin="normal"
              variant="outlined"
              fullWidth
              name="subject"
              error={errors.subject}
              value={this.state.subject}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <TextField
              style={{ ...style }}
              multiline
              placeholder="Message"
              rows="4"
              margin="normal"
              variant="outlined"
              fullWidth
              name="message"
              error={errors.message}
              value={this.state.message}
              onChange={this.handleChange}
            />
          </Grid>

          <ButtonComponent
            style={{ margin: 4 }}
            disabled={this.state.activity}
            bgColor={colors.blueToRight}
            onClick={this.handleSubmit}
          >
            Send Message
          </ButtonComponent>
        </Grid>
      </form>
    );
  }
}
