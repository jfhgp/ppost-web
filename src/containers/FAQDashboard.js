import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';

import Page from '../components/layout/Page';
import { classNames } from '../utils/functions';
import { FAQData } from './DashboardHelpPageData';

var Link = Scroll.Link;
var Element = Scroll.Element;

const FAQs = ({ data, heading, onToggle }) => {
  let col = Math.floor(data.length / 2);
  return (
    <div className="faqs" style={{ marginTop: '2rem' }}>
      <h1 className="text-center">{heading}</h1>
      <div className="p-grid">
        <div className="p-col-12 p-md-6">
          {data.slice(0, col).map(faq => (
            <FAQ faq={faq} index={faq._id} key={faq._id} onToggle={onToggle} />
          ))}
        </div>
        <div className="p-col-12 p-md-6">
          {data.slice(col).map(faq => (
            <FAQ faq={faq} index={faq._id} key={faq._id} onToggle={onToggle} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQ = ({ faq, index, onToggle }) => {
  return (
    <div className={classNames(['faq', ['open', faq.open]])} key={index}>
      <div className="faq-label" onClick={() => onToggle(faq._id)}>
        <span>{faq.label}</span>
      </div>
      <div className="faq-content">{faq.content}</div>
    </div>
  );
};

const FAQDashboard = props => {
  const [faqs, setFaqs] = useState(FAQData);

  const toggleFAQ = _id => {
    setFaqs(
      faqs.map(faq => {
        faq.items.map(i => {
          if (i._id === _id) {
            i.open = !i.open;
          } else {
            i.open = false;
          }
        });
        return faq;
      })
    );
  };
  return (
    <Page>
      <div
        className="page-title"
        style={{
          textAlign: 'center',
          ...(props.addStyle && props.addStyle.pageTitle)
        }}
      >
        <span style={{ width: '100%', paddingBottom: 10 }}>
          Frequently Asked Questions
        </span>
      </div>
      <div className="text-center">
        {faqs.map((faq, i) => {
          return (
            <Link key={i} activeClass="active" to={faq.name} spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block', fontSize: 16, color: "#152972", margin: '12px' }}>
              {faq.name}
            </Link>

          );

        })}
      </div>
      <div
        className={`dashboard-faq-dashboard ${props.className}`}
        style={props.addStyle && props.addStyle.background}
      >
        <div className="text-center"></div>
        <Element className="element" id="containerElement" style={{
          position: 'relative',
          height: 500,
          overflow: 'scroll',
        }}>
          {faqs.map((faq, i) => {
            return (

              <Element key={i} name={faq.name}>
                <FAQs
                  key={i}
                  heading={faq.name}
                  data={faq.items}
                  onToggle={toggleFAQ}
                />
              </Element>


            );

          })}
        </Element>
      </div>
    </Page >
  );
};

FAQ.propTypes = {
  faq: PropTypes.shape(),
  index: PropTypes.number,
  onToggle: PropTypes.func
};

FAQs.propTypes = {
  data: PropTypes.array,
  heading: PropTypes.string,
  onToggle: PropTypes.func
};

FAQDashboard.defaultProps = {
  className: ''
};

FAQDashboard.propTypes = {
  className: PropTypes.string,
  addStyle: PropTypes.shape()
};

export default FAQDashboard;
