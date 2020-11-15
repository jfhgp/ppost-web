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
import Avatar from '@material-ui/core/Avatar';
import FormSubmitBtn from '../../../../components/form/FormSubmitBtn';
import Link from '@material-ui/core/Link';
import { colors } from '../../../../constants/colors';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const DeliveryDriver = (props) => {
  const { transporter } = props;
  const preventDefault = (event) => event.preventDefault();
  const handleClick = (e) => {
    e.preventDefault();
    alert('The link was clicked.');
  };
  const imageSrc =
    transporter.picture || require('../../../../static/images/image-user.png');
  return (
    <div>
      <h1 style={{ fontWeight: 'bold', marginBottom: 30 }}>
        Your delivery
        <br /> driver
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
                <h2 style={{ marginTop: 20, fontWeight: 'bold' }}>
                  {` ${transporter.firstName} ${transporter.lastName}  is on his way...`}
                </h2>
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
                    Call delivery driver
                  </Button>
                  <div
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    <Link
                      onClick={() => props.handleToggleChat(true)}
                      style={{
                        outline: 'none',
                        cursor: 'pointer',
                        color: 'rgb(250, 120, 22)',
                      }}
                    >
                      Send a message
                    </Link>
                  </div>
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
  );
};

export default DeliveryDriver;
