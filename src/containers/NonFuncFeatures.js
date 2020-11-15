import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

export const NonFuncFeaturesCard = props => {
  return (
    <Card
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardMedia
        style={{ paddingTop: '56.25%' }}
        image={`${process.env.PUBLIC_URL}${props.bgImage}`}
        title="Image title"
      />
      <CardContent style={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.heading}
        </Typography>
        <Typography>{props.body}</Typography>
      </CardContent>
    </Card>
  );
};

export const NonFuncFeatures = props => {
  return (
    <div id="non-func-features">
      <Grid
        container
        style={{ justifyContent: 'center', maxWidth: 1366, margin: 0 }}
      >
        {props.children}
      </Grid>
    </div>
  );
};
