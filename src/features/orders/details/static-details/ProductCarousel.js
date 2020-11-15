import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { colors } from '@material-ui/core';

const ProductCarousel = (props) => {
  const { commodities, details } = props;
  return (
    <Carousel autoPlay={false}>
      {commodities.map((item) => (
        <Card style={{ borderRadius: 30 }}>
          <CardActionArea>
            <img
              src={item.images[0]}
              alt="productImage"
              style={{ width: "100%", height: 250 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.name}
              </Typography>
              <p>Quantity : {item.quantity}</p>
              <Divider />
              <p>Ref: 123456789 </p>
              <p>Order number: {details.orderNumber} </p>
              <div
                style={{
                  backgroundColor: '#F8C9B5',
                  display: 'flex',
                  padding: 20,
                  borderRadius: 30,
                }}
              >
                <div style={{ paddingRight: 20 }}>
                  <img
                    src={require('../../../../static/images/trackingnumber.png')}
                    alt="productImage"
                  />
                </div>

                <div>
                  <p
                    style={{
                      margin: 0,
                      color: 'rgb(250, 120, 22)',
                      fontWeight: 'bold',
                    }}
                  >
                    Tracking number
                  </p>
                  <p style={{ margin: 0, color: 'rgb(250, 120, 22)' }}>
                    {details.orderNumber}
                  </p>
                </div>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
