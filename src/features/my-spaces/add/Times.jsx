// basic usage
// in some react component
import React from 'react';
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';

export default class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hour: '00', minute: '00' };
  }

  onTimeChange = (options, day) => {
    this.props.onSelectTime(
      options.hour + ':' + options.minute,
      this.props.day
    );

    // do something

    //{hour: "23", minute: "07", meridiem: null}

    // alert("tc");
    this.setState({
      ...options
    });
  };

  onFocusChange = focusStatue => {
    // do something
    // alert("fc");
  };

  render() {
    // console.log("THis is the start time", this.props.time);
    const { isDisabled, time } = this.props;
    // const { isDisabled = false } = this.props;

    return (
      <TimePicker
        theme="classic"
        timeMode="24"
        disabled={isDisabled}
        onFocusChange={this.onFocusChange}
        onTimeChange={this.onTimeChange}
        time={time}
      />
    );
  }
}
