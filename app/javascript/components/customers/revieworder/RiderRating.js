import React from 'react';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RiderRating = () => {
    return (
        <React.Fragment>
        <h2 className='review-rider-title'>
            {/* Placeholder name */}
                Rate Rider: rider
        </h2>

        <div>
            <Rating
                stop={5}
                emptySymbol={<FontAwesomeIcon icon={faStarO}
                    style={{ color: "#ffe400" }} className="fa-3x" />}
                fullSymbol={<FontAwesomeIcon icon={faStar}
                    style={{ color: "#ffe400" }} className="fa-3x" />}
            />
            {/* TODO: Allow reset */}
        </div>
        </React.Fragment>
    )
}

export default RiderRating;