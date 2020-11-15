import React from 'react';
import PropTypes from 'prop-types';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import moment from 'moment';

import Page from '../../components/layout/Page';
import FormSubmitBtn from '../../components/form/FormSubmitBtn';
import EmptyPlaceholder from '../../components/ui/EmptyPlaceholder';
import { dateFormat } from '../../constants/project-constants';
import ContainerLayout from '../../components/layout/ContainerLayout';

const PromotionsComponent = props => {
  const { activity, promotions } = props;
  const mobileWidth = useMediaQuery('(max-width:425px)');
  return (
    <Page activity={activity} className="notifications-container" noActivity>
      <div className="page-title">
        <span>Promotions</span>
      </div>
      <ContainerLayout>
        {promotions.length ? (
          promotions.map(promotion => (
            <div
              key={promotion._id}
              className="p-col-12 p-md-6 p-lg-4 promotion"
              style={mobileWidth ? {} : { padding: '1em' }}
            >
              <div>
                <textarea
                  id={promotion._id}
                  readOnly
                  value={promotion.code}
                  ref={props.handlePromotionCodeRef}
                  style={{ position: 'absolute', left: -9999 }}
                ></textarea>
                <span>{moment(promotion.validFrom).format(dateFormat)}</span>
                <div>
                  <img
                    alt=""
                    style={mobileWidth ? { width: '12em' } : { width: '15em' }}
                    src={require('../../static/images/project-logo.png')}
                  />
                </div>
                <div>{promotion.discount}% Discount</div>
                <div>
                  <span>Use Promo Code</span>
                  <span>{promotion.code}</span>
                </div>
                <p>{promotion.text}</p>
                <div>
                  Max discount <span>${promotion.maxDiscount}</span>
                </div>
                <div>
                  <span>
                    Valid until {moment(promotion.validTill).format(dateFormat)}{' '}
                    23:59
                  </span>
                  <FormSubmitBtn
                    label="Copy code"
                    onSubmit={() => props.handleCopyToClipboard(promotion._id)}
                  />
                  {/* <FormSubmitBtn
                label="Copy code"
                style={{
                  borderRadius: 4,
                  width: 'unset',
                  backgroundColor: getPrimaryColors('primary'),
                  color: '#fff',
                  fontSize: '0.9em',
                  padding: '5px 1em',
                  lineHeight: 'unset'
                }}
              /> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-col-12">
            <EmptyPlaceholder message="We could not find any promotions." />
          </div>
        )}
      </ContainerLayout>
    </Page>
  );
};

PromotionsComponent.propTypes = {
  activity: PropTypes.bool,
  handleCopyToClipboard: PropTypes.func,
  handlePromotionCodeRef: PropTypes.func,
  promotions: PropTypes.arrayOf(PropTypes.object)
};

export default PromotionsComponent;
