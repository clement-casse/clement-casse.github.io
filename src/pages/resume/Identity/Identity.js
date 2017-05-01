import React from "react"
import PropTypes from 'prop-types';

import "./identity.css"

const Identity = ({lang, data}) => {

    if (typeof data !== 'object') {
        return null;
    }

    const Name = ({firstName, lastName}) => {
        const displayedName = [firstName, lastName].join(" ")
        return (
            <p className="name">
                {displayedName}
            </p>
        );
    }

    const Address = ({data}) => {
        if (typeof data !== 'object') {
            return null;
        }
        return (
            <p className="address">
                {data.line1}<br />
                {data.zip} {data.city.toUpperCase()}
            </p>
        )
    }

    const Phone = ({localizedPhone, lang}) => {
        const displayedPhone = (typeof localizedPhone === "object") ? localizedPhone[lang] : localizedPhone;
        return (
            <p>{displayedPhone}</p>
        );
    }

    const Email = ({displayedEmail}) => {
        return (
            <p>{displayedEmail}</p>
        );
    }

    const Age = ({birthDate, lang}) => {
        const ageAppend = {
            fr: "ans",
            en: "years old"
        }
        const ageDate = new Date(Date.now() - (new Date(birthDate)).getTime()).getUTCFullYear() - 1970;
        return (
            <p>{ageDate} {ageAppend[lang]}</p>
        )
    }


    return (
        <address>
            <Name firstName={data.firstName} 
                  lastName={data.lastName}
            />
            <Address data={data.address} 
                     lang={lang} 
            />
            <Phone localizedPhone={data.phone}
                   lang={lang} 
            />
            <Email displayedEmail={data.email} />
            <Age birthDate={data.birthDate}
                 lang={lang}
            />
        </address>
    )
}

Identity.propTypes = {
    lang: PropTypes.oneOf(["en", "fr"]),
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
};

Identity.defaultProps = {
    lang: "fr"
}

export default Identity;