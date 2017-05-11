import React from 'react';
import ForceSimulation from '../../../components/Graph/Forcegraph';

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

    const subsections = data.subSections
        .map((subsection, index) => {
            return (
                <SkillSection data={subsection} key={index} lang={lang}/>
            )
        })

    return (
        <div className="skills">
            <Title localizedTitle={data.sectionTitle} />
            {subsections}
        </div>
    )
}

const SkillSection = ({lang, data}) => {
    if (!data.type) {
        return null;
    }

    const Title = ({ localizedTitle }) => {
        if (!localizedTitle) {
            return null;
        }
        const displayedTitle = (typeof localizedTitle === 'object')
            ? localizedTitle[lang]
            : localizedTitle;
        return (
            <h2>{displayedTitle}</h2>
        )
    };

    switch (data.type) {
        case "extended-list": {
            const skills = data.skills
                .map(({id, title, level}, index) => {
                    if (typeof title === 'object' && !title[lang]) {
                        return null;
                    }
                    return (
                        <div key={index} style={{display: "flex"}}>
                            <dt style={{flex: "1 0"}}>
                                {(typeof title === 'object') ? title[lang] : title}
                            </dt>
                            <dd style={{flex: "3 0", margin: 0}}>
                                {(typeof level === 'object') ? level[lang] : level}
                            </dd>
                        </div>
                    );
                });
            return (
                <div className="skill-section extended-list">
                    <Title localizedTitle={data.title} />
                    <dl>
                        {skills}
                    </dl>
                </div>
            )
        }
        case "force-graph" : {
            if (!data.domains || !data.skills || !data.height) {
                console.warn("A subsection with type = 'force-graph' expects 2 keys : domains and skills");
                return null;
            }
            let nodes = [], links = [];

            data["domains"].forEach((element) => {
                nodes.push({
                    id: element["id"],
                    type: "domain",
                    title: element["title"][lang],
                    level: (Array.isArray(element.relatedSkills)) ? element.relatedSkills.length : 1
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
                    title: element["title"][lang],
                    level: (Array.isArray(element.relatedSkills)) ? element.relatedSkills.length : 1
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

            return (
                <div className="skill-section force-graph">
                    <Title localizedTitle={data.title} />
                    <ForceSimulation nodes={nodes} links={links} width={300} height={data.height}/>
                </div>
            )
        }
        default: {
            console.warn("Skill Type not handled ... Skipping");
            return null;
        }
    }

}

export default Skills;