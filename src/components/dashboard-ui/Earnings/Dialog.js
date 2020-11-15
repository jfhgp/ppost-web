import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

export const DialogTitle = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  heading: {
    color: '#152972',
    fontFamily: '"Exo2-Medium"',
    textTransform: 'capitalize'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6" className={classes.heading}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles(theme => ({
  root: {
    margin: '0px 5px',
    padding: theme.spacing.unit * 2,
    background: '#ebebeb'
  }
}))(props => {
  const { children, classes } = props;
  return (
    <MuiDialogContent className={classes.root}>{children}</MuiDialogContent>
  );
});

export const DialogActions = withStyles(theme => ({
  root: {
    margin: 5,
    marginTop: 0,
    padding: theme.spacing.unit,
    paddingBottom: 30,
    fontFamily: '"Exo2-Medium"',
    textTransform: 'capitalize',
    background: '#ebebeb'
  }
}))(MuiDialogActions);

export const StyledButton = withStyles({
  root: {
    background:
      'linear-gradient(to right, rgb(250, 120, 22) 0%, rgb(250, 178, 22) 100%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 10px'
  },
  label: {
    textTransform: 'capitalize',
    fontFamily: '"Exo2-Medium"',
    fontSize: '1.2rem'
  }
})(Button);
