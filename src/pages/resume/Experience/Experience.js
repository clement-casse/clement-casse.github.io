import React from 'react';
import PropTypes from 'prop-types';

import './experience.css';

/**
 * Component that renders out the title pf the experiences section
 */
const Title = ({ localizedTitle, lang }) => {
    if (!localizedTitle) {
        return null;
    }
    return (
        <h1>{localizedTitle[lang]}</h1>
    );
};
Title.propTypes = {
    lang: PropTypes.oneOf(['en', 'fr']).isRequired,
    localizedTitle: PropTypes.objectOf(PropTypes.string),
};
Title.defaultProps = {
    localizedTitle: null,
};

/**
 * Component that renders a list of experiences with the appropriate section title.
 */
const Experiences = ({ data, lang }) => {
    // Acts as Error handling when the `data` prop does not fit the prerequisits.
    if (!data) {
        return null;
    }

    const expEntries = data.list
        .filter(entry => !entry.display || entry.display === 'hidden')
        .map((entry, index) => (
            <Experience data={entry} key={index} lang={lang} />
        ));

    return (
        <div className="experiences">
            <Title localizedTitle={data.sectionTitle} lang={lang} />
            {expEntries}
        </div>
    );
};
Experiences.propTypes = {
    lang: PropTypes.oneOf(['en', 'fr']).isRequired,
    data: PropTypes.shape({
        sectionTitle: PropTypes.objectOf(PropTypes.string),
        list: PropTypes.array,
    }),
};
Experiences.defaultProps = {
    data: null,
};

/**
 * Component that renders out the duration section of the experience entry.
 */
const Duration = ({ dates, lang }) => {
    if (!dates) {
        return null;
    }
    let startYear;
    let endYear;

    // When missing dates.start the dates are considered as a simple point in time.
    if (typeof dates.start !== 'string') {
        endYear = (new Date(dates.end)).getUTCFullYear();
        return (<strong>{endYear}</strong>);
    }

    // When mission dates.end the activity described has been considered stil occuring.
    if (typeof dates.end !== 'string') {
        const currentJob = {
            fr: 'Auj.',
            en: 'now',
        };
        startYear = (new Date(dates.start)).getUTCFullYear();
        return (<strong className="date">{startYear} - {currentJob[lang]}</strong>);
    }

    startYear = (new Date(dates.start)).getUTCFullYear();
    endYear = (new Date(dates.end)).getUTCFullYear();

    if (startYear === endYear) {
        return (<strong className="date">{startYear}</strong>);
    }
    return (<strong className="date">{startYear} - {endYear}</strong>);
};
Duration.propTypes = {
    lang: PropTypes.oneOf(['en', 'fr']).isRequired,
    dates: PropTypes.objectOf(PropTypes.string),
};
Duration.defaultProps = {
    dates: null,
};

/**
 * Component that renders out the place of the Place section of the Experience entry.
 */
const Place = ({ location, lang }) => {
    if (!location) {
        return null;
    }

    return (
        <em className="place">
            {location.name}<br />
            {[location.city, location.area[lang].toUpperCase()].join(', ')}
        </em>
    );
};
Place.propTypes = {
    location: PropTypes.shape({
        name: PropTypes.string,
        city: PropTypes.string,
        area: PropTypes.objectOf(PropTypes.string),
    }),
    lang: PropTypes.oneOf(['en', 'fr']).isRequired,
};
Place.defaultProps = {
    location: null,
};

/**
 * Component that renders out the title of an Experience entry.
 */
const ExperienceTitle = ({ localizedTitle, lang }) => {
    if (!localizedTitle) {
        return null;
    }

    return (<p><strong>{localizedTitle[lang]}</strong></p>);
};
ExperienceTitle.propTypes = {
    lang: PropTypes.oneOf(['en', 'fr']).isRequired,
    localizedTitle: PropTypes.objectOf(PropTypes.string),
};
ExperienceTitle.defaultProps = {
    localizedTitle: null,
};

/**
 * Component that renders out a the Topics section of an experience entry.
 */
const Topics = ({ data, lang }) => {
    // set a null component when the provided data has not the correct format
    if (!data) {
        return null;
    }

    const topics = data
        .filter(topic => !topic.display || topic.display === 'hidden')
        .map(topic => topic[lang]);

    return (<p className="topics">{topics.join(', ')}</p>);
};
Topics.propTypes = {
    lang: PropTypes.oneOf(['en', 'fr']).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
};
Topics.defaultProps = {
    data: null,
};

/**
 * Component that renders out a list of missions/accomplishments in an experience component.
 */
const Missions = ({ data, lang }) => {
    // set a null component when the provided data has not the correct format
    if (!data) {
        return null;
    }

    const missions = data
        .filter(mission => !!mission.brief)
        .map((mission, index) => {
            if (typeof mission.brief !== 'object' || typeof mission.brief[lang] !== 'string' || mission.display === 'hidden') {
                return null;
            }

            return (
                <li key={index}>
                    <i className="fa fa-check-square fa-fw" />
                    {mission.brief[lang]}
                </li>
            );
        });
    return (<ul className="missions">{missions}</ul>);
};
Missions.propTypes = {
    lang: PropTypes.oneOf(['en', 'fr']).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
};
Missions.defaultProps = {
    data: null,
};

/**
 * Component that renders out the notes section of an experience entry.
 */
const Notes = ({ data, lang }) => {
    // set a null component when the provided data has not the correct format
    if (!data) {
        return null;
    }

    const briefNotes = data
        .filter(briefNote => !briefNote.display || briefNote.display === 'hidden')
        .map((current, index) => (
            <li key={index}>
                {(typeof current === 'object') ? current[lang] : current }
            </li>
        ));

    return (
        <div className="notes">
            <div style={{ flexGrow: 1, paddingRight: '5px' }}>
                <i className="fa fa-info-circle fa-fw" />
            </div>
            <div style={{ flexGrow: 9 }}>
                <ul>
                    {briefNotes}
                </ul>
            </div>
        </div>
    );
};
Notes.propTypes = {
    lang: PropTypes.oneOf(['en', 'fr']).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
};
Notes.defaultProps = {
    data: null,
};

/**
 * Component that renders out a line of experience
 */
const Experience = ({ lang, data }) => {
    if (data.display === 'hidden') {
        return null;
    }
    return (
        <div className="experience">
            <div className="informations">
                <Duration dates={data.dates} lang={lang} /> <br />
                <Place location={data.location} lang={lang} />
            </div>
            <div className="details">
                <ExperienceTitle localizedTitle={data.name} lang={lang} />
                <Missions data={data.missions} lang={lang} />
                <Topics data={data.topics} lang={lang} />
                <Notes data={data.notes} lang={lang} />
            </div>
        </div>
    );
};
Experience.propTypes = {
    lang: PropTypes.oneOf(['en', 'fr']).isRequired,
    data: PropTypes.shape({
        names: PropTypes.object,
        dates: PropTypes.object,
        location: PropTypes.object,
        missions: PropTypes.arrayOf(PropTypes.object),
        topics: PropTypes.arrayOf(PropTypes.object),
        notes: PropTypes.arrayOf(PropTypes.object),
    }),
};
Experience.defaultProps = {
    data: null,
};

export default Experiences;
