// import React from 'react';
// import PropTypes from 'prop-types';

// import { Grid } from '@material-ui/core';

// const FAQs = props => {
//   return (
//     <React.Fragment>
//       <Grid
//         item
//         xs={12}
//         sm={12}
//         md={6}
//         style={{
//           order: props.order,
//           color: 'orange',
//           textAlign: 'center'
//         }}
//       >
//         {props.children}
//       </Grid>
//     </React.Fragment>
//   );
// };

// FAQs.propTypes = {
//   order: PropTypes.number,
//   children: PropTypes.arrayOf(PropTypes.element)
// };

// export default FAQs;

import React from 'react';
import PropTypes from 'prop-types';

import Page from '../components/layout/Page';

import { classNames } from '../utils/functions';

const FAQs = ({ data, onToggle }) => {
  return (
    <div className="faqs web-faqs" style={{ marginTop: '2rem' }}>
      <FAQ faq={data} index={data._id} key={data._id} onToggle={onToggle} />
    </div>
  );
};

const FAQ = ({ faq, index, onToggle }) => {
  return (
    <div
      className={classNames([
        'faq',
        'web-faq',
        ['open', faq.open],
        ['web-open', faq.open]
      ])}
      key={index}
    >
      <div
        className="faq-label web-faq-label"
        onClick={() => onToggle(faq._id)}
      >
        <span>{faq.label}</span>
      </div>
      <div className="faq-content web-faq-content">{faq.content}</div>
    </div>
  );
};

const FAQComponent = props => {
  const { data: faqs, toggleFAQ } = props;

  return (
    <Page>
      <div className="dashboard-faq-dashboard web-faq">
        {faqs.map((faq, i) => {
          return <FAQs key={i} data={faq} onToggle={toggleFAQ} />;
        })}
      </div>
    </Page>
  );
};

FAQComponent.propTypes = {
  data: PropTypes.array,
  toggleFAQ: PropTypes.func
};

FAQ.propTypes = {
  faq: PropTypes.shape(),
  index: PropTypes.number,
  onToggle: PropTypes.func
};

FAQs.propTypes = {
  data: PropTypes.object,
  onToggle: PropTypes.func
};

export default FAQComponent;
