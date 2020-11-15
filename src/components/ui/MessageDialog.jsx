import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import { withStore } from '../../utils/store.util';
import { classNames } from '../../utils/functions';
import FormSubmitBtn from '../form/FormSubmitBtn';

class MessageDialog extends Component {
  handleClose = () => {
    this.props.store.setWithRender('messageDialog', {
      title: '',
      open: false,
      action: null,
      className: '',
      actionBtnLabel: ''
    });
  };

  handleDone = () => {
    if (this.props.store.messageDialog.action) {
      this.props.store.messageDialog.action();
    }
    this.handleClose();
  };

  render() {
    const { messageDialog = {} } = this.props.store;

    return (
      <Dialog
        maxWidth="sm"
        onClose={this.handleClose}
        className="full-width-dialog"
        open={messageDialog.open || false}
      >
        <div
          className={classNames([
            'confirmation-dialog',
            messageDialog.className || ''
          ])}
        >
          <DialogTitle>{messageDialog.title}</DialogTitle>
          <DialogActions>
            {messageDialog.action && (
              <FormSubmitBtn
                label="Back"
                onSubmit={this.handleClose}
                style={{ borderRadius: 4, width: 'unset' }}
              />
            )}
            <FormSubmitBtn
              label={messageDialog.actionBtnLabel || 'Done'}
              onSubmit={this.handleDone}
              style={{ borderRadius: 4, width: 'unset' }}
            />
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

MessageDialog.propTypes = {
  store: PropTypes.shape({
    setWithRender: PropTypes.func,
    messageDialog: PropTypes.shape({
      open: PropTypes.bool,
      action: PropTypes.func,
      title: PropTypes.string,
      className: PropTypes.string,
      actionBtnLabel: PropTypes.string
    })
  })
};

export default withStore(MessageDialog);
