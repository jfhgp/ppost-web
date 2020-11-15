import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormSubmitBtn from '../../../../components/form/FormSubmitBtn';
import Link from '@material-ui/core/Link';
import { colors } from '../../../../constants/colors';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import StarRatingComponent from 'react-star-rating-component';
import { getPrimaryColors } from '../../../../utils/functions';

const DeliveredDetails = (props) => {
  const { transporter, details } = props;
  const pickup = details.pickup ? details.pickup.address : {};
  const dropoff = details.dropoff ? details.dropoff.address : {};
  const deliveryTime = details.deliveryTime;
  const preventDefault = (event) => event.preventDefault();
  console.log('This is all transporter details', details.deliveryTime);
  const handleClick = (e) => {
    e.preventDefault();
    alert('The link was clicked.');
  };
  const imageSrc =
    transporter.picture || require('../../../../static/images/image-user.png');
  return (
    <Grid container className="track-details">
      <Grid item xs={8} style={{ paddingRight: 50 }}>
        <div>
          <h1 style={{ fontWeight: 'bold', marginBottom: 30 }}>
            Delivery <br />
            confirmed
          </h1>
          <Card style={{ borderRadius: 30, position: 'relative' }}>
            <CardContent>
              <Grid container>
                <Grid item xs={6}>
                  <h2
                    style={{
                      marginTop: 20,
                      marginBottom: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Delivery informations
                  </h2>
                  <Grid container>
                    <Grid
                      xs={1}
                      md={1}
                      item
                      className={'information-border'}
                    ></Grid>

                    <Grid xs={2} md={2} item>
                      <Avatar
                        style={{
                          width: 32,
                          height: 32,
                          marginBottom: 85,
                        }}
                        alt="Remy Sharp"
                        src={imageSrc}
                      />
                      <Avatar
                        style={{
                          width: 32,
                          height: 32,
                        }}
                        alt="Remy Sharp"
                        src={require('../../../../static/images/check-icon.png')}
                      />
                    </Grid>
                    <Grid xs={8} md={8} item>
                      <p
                        style={{
                          color: 'grey',
                          fontSize: 14,
                          margin: 0,
                          fontWeight: 'bold',
                        }}
                      >
                        Shipping address
                      </p>
                      <p>{pickup}</p>
                      <p
                        style={{
                          color: 'grey',
                          fontSize: 14,
                          margin: 0,
                          fontWeight: 'bold',
                        }}
                      >
                        Delivery address
                      </p>
                      <p>{dropoff}</p>
                      <p
                        style={{
                          color: 'grey',
                          fontSize: 14,
                          margin: 0,
                          fontWeight: 'bold',
                        }}
                      >
                        Dropoff
                      </p>
                      <p style={{ marginTop: 0 }}>
                        {deliveryTime ? deliveryTime.to : 'Flexible Time'}
                      </p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <h2 style={{ marginTop: 20, fontWeight: 'bold' }}>
                    {`  Message from ${transporter.firstName} ${transporter.lastName}`}
                  </h2>
                  <p>I've left the package at your doorstep</p>
                  <img
                    alt="Remy Sharp"
                    src={require('../../../../static/images/doorstep.png')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>

        <h1 style={{ fontWeight: 'bold', marginBottom: 30, marginTop: 30 }}>
          Return order
        </h1>
        <Card style={{ borderRadius: 30 }}>
          <CardContent>
            <Grid container>
              <Grid item xs={1} style={{ paddingRight: 10 }}>
                <img
                  src={require('../../../../static/images/return.png')}
                  alt="productImage"
                />
              </Grid>
              <Grid item xs={7} style={{ paddingRight: 10 }}>
                <h3 style={{ marginTop: 0, fontWeight: 'bold' }}>
                  Something wrong with your products?
                </h3>
                <p>
                  You can return select products by completing a few quick steps
                </p>
              </Grid>
              <Grid item xs={4}>
                <Button
                  href={`tel:+${transporter.mobile}`}
                  variant="contained"
                  style={{
                    marginTop: 5,
                    background: 'rgb(250, 120, 22)',
                    color: colors.white,
                    borderRadius: 10,
                    textTransform: 'capitalize',
                    padding: ' 11px 20px',
                    fontSize: 18,
                  }}
                  startIcon={<CloudUploadIcon />}
                >
                  Return my order
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4} style={{ paddingRight: 80 }}>
        <div>
          <h1 style={{ fontWeight: 'bold', marginBottom: 30 }}>
            Rating your delivery expereince with Frank
          </h1>
          <Card style={{ borderRadius: 30 }}>
            <CardContent>
              <div class="row h-100 text-center" style={{ marginLeft: '10px' }}>
                <div class="col-sm-12 my-auto">
                  <div class="card-block w-100 mx-auto">
                    <Avatar
                      style={{
                        width: 100,
                        height: 100,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                      alt="Remy Sharp"
                      src={imageSrc}
                    />
                    <div style={{ fontSize: '1.5em' }}>
                      <StarRatingComponent
                        name="customerRating"
                        value={5}
                        starColor={getPrimaryColors('secondary')}
                        emptyStarColor="#888"
                        editing={false}
                      />
                    </div>
                    <Divider />
                    <p
                      style={{
                        color: 'grey',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}
                    >
                      you can also add tips
                    </p>
                    <div
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Button
                        href={`tel:+${transporter.mobile}`}
                        variant="contained"
                        style={{
                          marginTop: 5,
                          background: 'rgb(250, 120, 22)',
                          color: colors.white,
                          borderRadius: 10,
                          textTransform: 'capitalize',
                          padding: ' 11px 20px',
                          fontSize: 18,
                        }}
                        startIcon={<CloudUploadIcon />}
                      >
                        {`Add a tip for ${transporter.firstName}`}
                      </Button>
                      <div
                        style={{
                          marginTop: 10,
                          marginBottom: 10,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default DeliveredDetails;
