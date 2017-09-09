import React from 'react';
import PropTypes from 'prop-types';

import './identity.css';

/**
 * Compenent that renders out an Address block based on the components Name, Phone,
 * Email, Address and Age.
 */
const Identity = ({ lang, data }) => {
    if (!data) {
        return null;
    }

    return (
        <address>
            <Name
                firstName={data.firstName}
                lastName={data.lastName}
            />
            <Address address={data.address} />
            <Phone localizedPhone={data.phone} lang={lang} />
            <Email displayedEmail={data.email} />
            <Age birthDate={data.birthDate} lang={lang} />
        </address>
    );
};
Identity.propTypes = {
    lang: PropTypes.oneOf(['en', 'fr']),
    data: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        birthDate: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.objectOf(PropTypes.string),
        address: PropTypes.objectOf(PropTypes.string),
    }),
};
Identity.defaultProps = {
    lang: 'fr',
    data: undefined,
};
export default Identity;

/**
 * Rendering component for the name
 */
const Name = ({ firstName, lastName }) => (
    <p className="name">
        {firstName} {lastName}
    </p>
);
Name.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
};

/**
 * Rendering component for email address
 */
const Email = ({ displayedEmail }) => (
    <p>{displayedEmail}</p>
);
Email.propTypes = {
    displayedEmail: PropTypes.string.isRequired,
};

/**
 * Rendering component for the postal address
 */
const Address = ({ address }) => (
    <p className="address">
        {address.line1}<br />
        {address.zip} {address.city.toUpperCase()}
    </p>
);
Address.propTypes = {
    address: PropTypes.shape({
        line1: PropTypes.string,
        city: PropTypes.string,
        zip: PropTypes.string,
    }).isRequired,
};

/**
 * Rendering component for the phone number
 */
const Phone = ({ localizedPhone, lang }) => (
    <p>{localizedPhone[lang]}</p>
);
Phone.propTypes = {
    localizedPhone: PropTypes.objectOf(PropTypes.string).isRequired,
    lang: PropTypes.string.isRequired,
};

/**
 * Component that calculate the Age from the brith date
 */
const Age = ({ birthDate, lang }) => {
    const ageAppend = {
        fr: 'ans',
        en: 'years old',
    };
    const ageDate = new Date(Date.now() - (new Date(birthDate)).getTime()).getUTCFullYear() - 1970;
    return (
        <p>{ageDate} {ageAppend[lang]}</p>
    );
};
Age.propTypes = {
    birthDate: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
};
