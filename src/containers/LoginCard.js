import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Typography, Card, CardActions, CardContent } from '@material-ui/core';

import routes from '../constants/route-constants';
import ButtonComponent from '../components/ButtonComponent';

const LoginCard = ({ name, bgColor, btnBgColor, btnText, route }) => {
  return (
    <div>
      <Card className="_LoginCard" style={{ background: bgColor }}>
        <CardContent>
          <Typography
            variant="body2"
            component="p"
            color="inherit"
            className="areYou"
          >
            Are you
          </Typography>

          <Typography
            variant="h4"
            component="h4"
            color="inherit"
            className="name"
          >
            {name}
          </Typography>
        </CardContent>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CardActions>
            <Link to={`/${routes.login}/${route}`}>
              <ButtonComponent bgColor={btnBgColor}>{btnText}</ButtonComponent>
            </Link>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

LoginCard.propTypes = {
  name: PropTypes.string,
  bgColor: PropTypes.string,
  btnBgColor: PropTypes.string,
  btnText: PropTypes.string,
  route: PropTypes.string
};

export default LoginCard;
