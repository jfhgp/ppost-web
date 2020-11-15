import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import { colors } from '../constants/colors';

const textColor = {
  color: '#c5c5c5',
  heading: '#fff'
};

const ContactDetails = props => {
  return (
    <List>
      <ListItem
        alignItems="flex-start"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <span
          style={{
            borderRadius: 5,
            background: colors.orangeToRight,
            color: '#fff',
            padding: 15
          }}
        >
          <i className="fas fa-map-marker-alt" />
        </span>
        <ListItemText
          primary={
            <span
              style={{
                color: props.isTrue ? textColor.heading : '#0f0f0f'
              }}
            >
              Address
            </span>
          }
          secondary={
            <span
              style={{
                color: props.isTrue ? textColor.color : colors.blue
              }}
            >
              PPOST Head Office
              <br />
              ABC Building,
              <br />
              75001 Paris, France
            </span>
          }
        />
      </ListItem>
      <ListItem
        alignItems="flex-start"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <span
          style={{
            borderRadius: 5,
            background: colors.orangeToRight,
            color: '#fff',
            padding: 15
          }}
        >
          <i className="fas fa-mobile-alt" />
        </span>
        <ListItemText
          primary={
            <span
              style={{
                color: props.isTrue ? textColor.heading : '#0f0f0f'
              }}
            >
              Phone
            </span>
          }
          secondary={
            <span
              style={{
                color: props.isTrue ? textColor.color : colors.blue
              }}
            >
              +33 0 00 00 00 00 <br /> +33 0 00 00 00 00
            </span>
          }
        />
      </ListItem>
      <ListItem
        alignItems="flex-start"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <span
          style={{
            borderRadius: 5,
            background: colors.orangeToRight,
            color: '#fff',
            padding: 15
          }}
        >
          <i className="far fa-envelope" />
        </span>
        <ListItemText
          primary={
            <span
              style={{
                color: props.isTrue ? textColor.heading : '#0f0f0f'
              }}
            >
              Email
            </span>
          }
          secondary={
            <span
              style={{
                color: props.isTrue ? textColor.color : colors.blue
              }}
            >
              info@ppost.eu
            </span>
          }
        />
      </ListItem>
    </List>
  );
};
export default ContactDetails;
