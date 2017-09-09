import React from 'react';
import PropTypes from 'prop-types';

import './hook.css';

/**
 * rendering component of the Resume head section (title and subtitle)
 */
const Hook = ({ lang, data }) => {
    if (!data) {
        return null;
    }

    return (
        <div className="hook">
            <h1>
                {data.titleResume[lang]}
            </h1>
            <p>
                {data.subTitle[lang]}
            </p>
        </div>
    );
};
Hook.propTypes = {
    data: PropTypes.shape({
        titleResume: PropTypes.objectOf(PropTypes.string),
        subTitle: PropTypes.objectOf(PropTypes.string),
    }),
    lang: PropTypes.string.isRequired,
};
Hook.defaultProps = {
    data: null,
};

export default Hook;
