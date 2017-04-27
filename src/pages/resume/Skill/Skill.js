import React from 'react';

import "./skill.css";

export const Skills = ({data, lang}) => {
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

    return (
        <div className="skills">
            <Title localizedTitle={data.sectionTitle} />
        </div>
    )
}

const SkillGroup = ({}) => {
}

export default Skills;