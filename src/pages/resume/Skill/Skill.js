import React from 'react';
import {ForceGraph} from './SkillCharts';

import "./skill.css";


 const Skills = ({ data, lang }) => {
    if (!data) {
        return null;
    }
    const Title = ({ localizedTitle }) => {
        const displayedTitle = (typeof localizedTitle === 'object')
            ? localizedTitle[lang]
            : localizedTitle;
        return (
            <h1>{displayedTitle}</h1>
        )
    };
    let nodes = [], links = [];

    data["domains"].forEach((element) => {
        nodes.push({
            id: element["id"],
            type: "domain",
            title: element["title"][lang]
        });

        if (Array.isArray(element["relatedSkills"])) {
            element["relatedSkills"].forEach((refSkill) => {
                links.push({
                    source: element["id"],
                    target: refSkill
                });
            })
        }
    }, this);

    data["skills"].forEach((element) => {
        nodes.push({
            id: element["id"],
            type: "skill",
            title: element["title"][lang]
        });

        if (Array.isArray(element["relatedSkills"])) {
            element["relatedSkills"].forEach((refSkill) => {
                links.push({
                    source: element["id"],
                    target: refSkill
                });
            })
        }
    }, this);
    
    console.log(links);

    return (
        <div className="skills">
            <Title localizedTitle={data.sectionTitle} />
            <ForceGraph nodes={nodes} links={links} />
        </div>
    )
}

export default Skills;