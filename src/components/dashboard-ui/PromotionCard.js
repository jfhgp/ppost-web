import React from 'react'

import PropTypes from 'prop-types';

const PromotionCard = ({discount}) => {
    return (
        <div style={{height: '100%',display:'flex', justifyContent:'center', alignItems:'center',flexDirection: 'column', padding: 10, color: '#152972'}}>
            <h1 style={{margin: 12, fontSize: '2.5rem'}}>{`${discount}% Off`}</h1>
            <div>{`${discount}% off on your orders`}</div>
        </div>
    )
}

PromotionCard.propTypes = {
    discount: PropTypes.number
}

export default PromotionCard
