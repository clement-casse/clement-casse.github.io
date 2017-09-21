import React from 'react';
import PropTypes from 'prop-types';

const SimpleDefinitionList = ({ domains, skills, lang }) => {
    const definitionEntries = domains.map((skillID) => {
        const { id, title, level } = skills.find(s => s.id === skillID);
        if (typeof title === 'object' && !title[lang]) {
            return null;
        }
        return (
            <div key={id} style={{ display: 'flex' }}>
                <dt style={{ flex: '1 0' }}>
                    {(typeof title === 'object') ? title[lang] : title}
                </dt>
                <dd style={{ flex: '3 0', margin: 0 }}>
                    {(typeof level === 'object') ? level[lang] : level}
                </dd>
            </div>
        );
    });
    return (
        <dl className="text simple-definition-list">
            {definitionEntries}
        </dl>
    );
};
SimpleDefinitionList.propTypes = {
    domains: PropTypes.arrayOf(PropTypes.string),
    skills: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.objectOf(PropTypes.string),
        level: PropTypes.objectOf(PropTypes.string),
    })),
    lang: PropTypes.oneOf(['en', 'fr']).isRequired,
};
SimpleDefinitionList.defaultProps = {
    skills: null,
    domains: null,
};

export default SimpleDefinitionList;
