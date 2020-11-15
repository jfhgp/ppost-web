import React from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  withStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    flexShrink: 0
  }
});
class FAQ extends React.Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <React.Fragment>
        <ExpansionPanel
          className="faq-question"
          expanded={expanded === this.props.question}
          onChange={this.handleChange(this.props.question)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {this.props.question}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography style={{ textAlign: 'left' }}>
              {this.props.details}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

FAQ.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles(styles)(FAQ);
