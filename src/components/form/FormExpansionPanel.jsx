import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const FormExpansionPanel = props => {
  const { error, content, label, hasStopOvers, stopOvers } = props;

  return (
    <ExpansionPanel
      defaultExpanded={props.defaultExpanded}
      className={
        error
          ? 'form-expansion-panel _form-expansion-panel input-error'
          : 'form-expansion-panel _form-expansion-panel'
      }
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={error ? 'input-error' : ''}>{label}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div style={{ width: '100%' }}>
          {hasStopOvers ? <div>{stopOvers}</div> : null}
          {content}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

FormExpansionPanel.propTypes = {
  error: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  label: PropTypes.string,
  stopOvers: PropTypes.shape(),
  hasStopOvers: PropTypes.bool
};

export default FormExpansionPanel;
