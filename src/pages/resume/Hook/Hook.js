import React from 'react';

import "./hook.css"

const Hook = ({lang, data}) => {

    if (typeof data !== 'object'){
        return null;
    }

    const Title = ({localizedTitle, lang}) => {
        const displayedTitle = (typeof localizedTitle === "object")
            ? localizedTitle[lang]
            : localizedTitle ;
        return (<h1>{displayedTitle}</h1>);
    }

    const SubTitle = ({localizedSubTitle, lang}) => {
        const displayedSubTitle = (typeof localizedSubTitle === "object") 
            ? localizedSubTitle[lang]
            : localizedSubTitle ;
        return (<p>{displayedSubTitle}</p>);
    }

    return (
        <div className="hook">
            <Title localizedTitle={data.titleResume}
                   lang={lang}
            />
            <SubTitle localizedSubTitle={data.subTitle}
                      lang={lang}
            />
        </div>
    );
}

Hook.propTypes = {
    title: React.PropTypes.string,
    subTitle: React.PropTypes.string
}

export default Hook;

