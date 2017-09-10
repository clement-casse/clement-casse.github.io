import React from 'react';
import PropTypes from 'prop-types';
import ForceGraph from './Graph/ForceGraph.jsx';
import TreemapGraph from './Graph/TreemapGraph.jsx';
import RadialTreeGraph from './Graph/RadialTreeGraph.jsx';
import RadialPartitionGraph from './Graph/RadialPartitionGraph.jsx';

import './skill.css';

/**
 * Complete "Skills" section of the resume
 */
const Skills = ({ data, lang }) => {
    const isDataLoaded = (!data);

    if (isDataLoaded) {
        return null;
    }

    const subsections = data.subSections
        .map(subsection => (
            <SkillSection
                key={subsection.id}
                lang={lang}
                data={subsection}
                skills={data.list}
            />
        ));

    return (
        <div className="skills">
            <Title localizedTitle={data.sectionTitle} lang={lang} />
            {subsections}
        </div>
    );
};
Skills.propTypes = {
    data: PropTypes.shape({
        sectionTitle: PropTypes.objectOf(PropTypes.string),
        subSections: PropTypes.arrayOf(PropTypes.object),
        list: PropTypes.arrayOf(PropTypes.object),
    }),
    lang: PropTypes.string.isRequired,
};
Skills.defaultProps = {
    data: null,
};

/**
 * Component that renders out the Title of the section Skills
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
    lang: PropTypes.string.isRequired,
    localizedTitle: PropTypes.objectOf(PropTypes.string),
};
Title.defaultProps = {
    localizedTitle: null,
};

/**
 * 
 */
const SectionTitle = ({ localizedTitle, lang }) => {
    if (!localizedTitle) {
        return null;
    }

    return (
        <h2>{localizedTitle[lang]}</h2>
    );
};
SectionTitle.propTypes = {
    lang: PropTypes.string.isRequired,
    localizedTitle: PropTypes.objectOf(PropTypes.string),
};
SectionTitle.defaultProps = {
    localizedTitle: null,
};

/**
 * 
 */
const SkillSection = ({ lang, data, skills }) => {
    const isDataLoaded = (!data || !skills);

    if (isDataLoaded) {
        return null;
    }

    switch (data.type) {
        case 'extended-list': {
            const skillList = data.skills
                .map((skillID) => {
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
                <div className="skill-section extended-list">
                    <SectionTitle localizedTitle={data.title} lang={lang} />
                    <dl>
                        {skillList}
                    </dl>
                </div>
            );
        }
        case 'force-graph' : {
            if (!data.domains || !data.height) {
                console.warn("A subsection with type = 'force-graph' expects 2 keys : domains and skills");
                return null;
            }

            return (
                <div className="skill-section force-graph">
                    <SectionTitle localizedTitle={data.title} lang={lang} />
                    <ForceGraph
                        width={300}
                        height={data.height}
                        domains={data.domains}
                        skills={skills}
                        lang={lang}
                    />
                </div>
            );
        }
        case 'treemap-graph' : {
            return (
                <div className="skill-section treemap-graph">
                    <SectionTitle localizedTitle={data.title} lang={lang} />
                    <TreemapGraph
                        width={300}
                        height={data.height}
                        domains={data.domains}
                        skills={skills}
                        lang={lang}
                    />
                </div>
            );
        }
        case 'radial-tree-graph' : {
            return (
                <div className="skill-section radial-tree-graph">
                    <SectionTitle localizedTitle={data.title} lang={lang} />
                    <RadialTreeGraph
                        width={300}
                        height={data.height}
                        domains={data.domains}
                        skills={skills}
                        lang={lang}
                    />
                </div>
            );
        }
        case 'radial-partition-graph' : {
            return (
                <div className="skill-section radial-partition-graph">
                    <SectionTitle localizedTitle={data.title} lang={lang} />
                    <RadialPartitionGraph
                        width={300}
                        height={data.height}
                        domains={data.domains}
                        skills={skills}
                        lang={lang}
                    />
                </div>
            );
        }
        default: {
            console.warn('Skill Type not handled ... Skipping');
            return null;
        }
    }
};

export default Skills;
