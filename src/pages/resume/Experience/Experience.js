import React from 'react';

import "./experience.css";

export const Experiences = ({data, lang}) => {

    // Acts as Error handling when the `data` prop does not fit the prerequisits.
    if (typeof data === "undefined" || !Array.isArray(data.list)) {
        return null
    }

    const Title = ({ localizedTitle }) => {
        const displayedTitle = (typeof localizedTitle === 'object')
            ? localizedTitle[lang]
            : localizedTitle;
        return (
            <h1>{displayedTitle}</h1>
        )
    };

    const expEntries = data.list
        .filter((entry) => !entry._restrictTo || entry._restrictTo.indexOf("hidden") === -1)
        .map((entry, index) => {
            return (
                <ExpEntry data={entry} key={index} lang={lang}/>
            );
        });

    return (
        <div className="experiences">
            <Title localizedTitle={data.sectionTitle} />
            {expEntries}
        </div>
    )
};

const ExpEntry = ({lang, data}) => {

    const Duration = ({ dates }) => {

        if (typeof dates !== "object") {
            return null;
        }
        let startYear, endYear;

        // When missing dates.start the dates are considered as a simple point in time.
        if (typeof dates.start !== "string") {
            endYear = (new Date(dates.end)).getUTCFullYear();
            return (<strong>{endYear}</strong>);
        }

        // When mission dates.end the activity described has been considered stil occuring.
        if (typeof dates.end !== "string") {
            let currentJob = {
                fr: "Auj.",
                en: "now"
            };
            startYear = (new Date(dates.start)).getUTCFullYear();
            return (<strong className="date">{startYear} - {currentJob[lang]}</strong>)
        }

        startYear = (new Date(dates.start)).getUTCFullYear();
        endYear = (new Date(dates.end)).getUTCFullYear();

        if (startYear === endYear){
            return (<strong className="date">{startYear}</strong>);
        }
        else {
            return (<strong className="date">{startYear} - {endYear}</strong>);
        }
    }

    const Place = ({ location }) => {

        if (typeof location !== "object") {
            return null;
        }

        const locationArea = (typeof location.area === 'object')
            ? location.area[lang]
            : null;

        return (
            <em className="place">
                {location.name}<br/>
                {[location.city, locationArea.toUpperCase()].join(", ")}
            </em>
        )
    }

    const Title = ({ localizedTitle }) => {
        if (typeof localizedTitle === 'undefined'){
            return null;
        }

        const displayedTitle = (typeof localizedTitle === 'object')
            ? localizedTitle[lang]
            : localizedTitle;
        
        return (<p><strong>{displayedTitle}</strong></p>)
    };

    const Topics = ({ data }) => {
        // set a null component when the provided data has not the correct format
        if (!Array.isArray(data)) {
            return null;
        }
    
        const topics = data
            .filter(
                (topic) => !topic._restrictTo || topic._restrictTo.indexOf("hidden") === -1
            )
            .map(
                (topic) => {
                    return (typeof topic === 'object') ? topic[lang] : null;
                }
            );
            
        return (<p className="topics">{topics.join(", ")}</p>);
    };

    const Missions = ({ data }) => {
        // set a null component when the provided data has not the correct format
        if (!Array.isArray(data)) {
            return null;
        }

        const missions = data
            .filter((mission) => !!mission.brief)
            .map((mission, index) => {

                if (typeof mission.brief !== "object" || typeof mission.brief[lang] !== "string"){
                    return null;
                }

                return (
                    <li key={index}>
                        <i className="fa fa-check-square fa-fw"></i>
                        {mission.brief[lang]}
                    </li>
                )
            });
        return (<ul className="missions">{missions}</ul>);
    };

    const Notes = ({ data }) => {
        // set a null component when the provided data has not the correct format
        if (!Array.isArray(data)) {
            return null;
        }

        const briefNotes = data
            .filter(
                (briefNotes) => !briefNotes._restrictTo || briefNotes._restrictTo.indexOf("hidden") === -1
            )
            .map((current, index) => {
                return (
                    <li key={index}>
                        {(typeof current === "object") ? current[lang] : current }
                    </li>
                )
            })
        
        return (
            <div className="notes">
                <div style={{flexGrow: 1, paddingRight: "5px"}}>
                    <i className="fa fa-info-circle fa-fw"/>
                </div>
                <div style={{flexGrow: 9}}>
                    <ul>
                        {briefNotes}
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div className="experience">
            <div className="informations">
                <Duration dates={data.dates} /> <br />
                <Place location={data.location} />
            </div>
            <div className="details">
                <Title  localizedTitle={data.name} />
                <Missions data={data.missions} />
                <Topics data={data.topics} />
                <Notes data={data.notes} />
            </div>
        </div>
    );
}

export default Experiences;