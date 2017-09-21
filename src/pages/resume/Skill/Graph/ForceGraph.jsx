import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import './forcegraph.css';

export default class ForceGraph extends React.Component {

    constructor(props) {
        super(props);

        this.DOMNode = {}; // Assignment triggered by th `ref` attribute in the `render()` method
        this.graphNodes = {};
        this.graphLinks = {};
        this.data = {
            nodes: [],
            links: [],
        };

        this.NODE_RADIUS = 3;
        this.STROKE_WIDTH = 1;
        this.DISTANCE_NODE_TEXT = 5;

        this.simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(d => d.id))
            .force('charge', d3.forceManyBody().strength(-80))
            .force('center', d3.forceCenter(props.width / 2, props.height / 2));

        this.d3logic = this.d3logic.bind(this);
        this.ticked = this.ticked.bind(this);
        this.transformData = this.transformData.bind(this);
    }

    componentDidMount() {
        const { domains, skills, lang } = this.props;
        this.transformData(domains, skills, lang);
        this.d3logic();
        this.simulation.on('tick', this.ticked);
    }

    shouldComponentUpdate(nextProps) {
        const { width, height } = this.props;
        // Recreate the component of the height or the width chage
        const hasNewWidth = width !== nextProps.width;
        const hasNewHeight = height !== nextProps.height;
        if (hasNewHeight || hasNewWidth) {
            return true;
        }
        const { domains, skills, lang } = nextProps;
        this.transformData(domains, skills, lang);
        this.d3logic();
        this.simulation.alpha(1).restart();
        // D3 manages the lifecycle of graph data-bounded elements
        // it is not React concern, component update is always false
        return false;
    }


    transformData(domains, skills, lang) {
        domains.forEach((domain) => {
            const hasRelatedDomains = Array.isArray(domain.relatedDomains);
            const hasRelatedSkills = Array.isArray(domain.relatedSkills);

            // Push all domains to Graph nodes
            this.data.nodes.push({
                id: domain.id,
                type: 'domain',
                title: domain.title[lang],
                level: (hasRelatedSkills) ? domain.relatedSkills.length : 1,
            });

            if (hasRelatedDomains) {
                domain.relatedDomains.forEach((targetDomainID) => {
                    this.data.links.push({
                        source: domain.id,
                        target: targetDomainID,
                    });
                });
            }

            if (hasRelatedSkills) {
                domain.relatedSkills.forEach((skillID) => {
                    const skill = skills.find(s => s.id === skillID);
                    const hasNestedSkills = Array.isArray(skill.relatedSkills);
                    const isExistingSkill = this.data.nodes.find(s => s.id === skillID);

                    if (!isExistingSkill) {
                        this.data.nodes.push({
                            id: skill.id,
                            type: 'skill',
                            title: skill.title[lang],
                            level: (hasNestedSkills) ? skill.relatedSkills.length : 1,
                        });

                        if (hasNestedSkills) {
                            // TODO manage recursive calls
                            // START OF UGLINESS
                            skill.relatedSkills.forEach((nestedSkillID) => {
                                const nestedSkill = skills.find(s => s.id === nestedSkillID);
                                const isExistingNestedSkill = this.data.nodes.find(s => s.id === nestedSkillID);
                                // SHAAAAAAME
                                if (!isExistingNestedSkill) {
                                    this.data.nodes.push({
                                        id: nestedSkill.id,
                                        type: 'skill',
                                        title: nestedSkill.title[lang],
                                        level: 1,
                                    });
                                }
                                this.data.links.push({
                                    source: skillID,
                                    target: nestedSkillID,
                                });
                            });
                            // END OF UGLINESS
                        }
                    }

                    this.data.links.push({
                        source: domain.id,
                        target: skillID,
                    });
                });
            }
        });
    }

    d3logic() {
        const { links, nodes } = this.data;
        const nodeRadius = this.NODE_RADIUS;
        const strokeWidth = this.STROKE_WIDTH;

        const dragStarted = (d) => {
            if (!d3.event.active) {
                this.simulation.alphaTarget(0.3).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
        };
        const dragged = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        };

        const dragEnded = (d) => {
            if (!d3.event.active) this.simulation.alphaTarget(0);
        };

        const doubleClicked = (d) => {
            // Release the node
            d.fx = null;
            d.fy = null;
        };

        const graph = d3.select(this.DOMNode);

        // link {source, target}
        this.graphLinks = graph
            .select('.force-graph-links')
            .selectAll('.force-graph-link')
            .data(links, d => `${d.source}-${d.target}`);
        this.graphLinks.exit().remove();
        this.graphLinks = this.graphLinks
            .enter()
                .insert('line')
                .classed('force-graph-link', true)
                .attr('stroke-width', strokeWidth)
            .merge(this.graphLinks);

        // domain { id, type, title, level }
        this.graphNodes = graph
            .select('.force-graph-nodes')
            .selectAll('.force-graph-node')
            .data(nodes, d => d.id);
        this.graphNodes.exit().remove();
        this.graphNodes = this.graphNodes
            .enter()
                .append('g')
                .classed('force-graph-node', true)
                .classed('skill', d => d.type === 'skill')
                .classed('domain', d => d.type === 'domain')
                .attr('id', d => `${d.type}-${d.id}`)
                .on('dblclick', doubleClicked)
                .call((selection) => {
                    selection
                        .append('circle')
                        .attr('r', d => nodeRadius + d.level)
                        .call(d3.drag()
                            .on('start', dragStarted)
                            .on('drag', dragged)
                            .on('end', dragEnded),
                        );
                    selection
                        .append('text')
                        .attr('dy', '.35em')
                        .text(d => d.title);
                })
            .merge(this.graphNodes); // FUCK THAT SHIT !!!

        this.simulation.nodes(nodes);
        this.simulation.force('link').links(links);
    }

    ticked() {
        const { width, height } = this.props;
        const nodeRadius = this.NODE_RADIUS;
        const distanceNodeText = this.DISTANCE_NODE_TEXT;

        this.graphLinks
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        this.graphNodes
            .selectAll('circle')
            .attr('cx', (d) => d.x = Math.max(nodeRadius, Math.min(width - nodeRadius, d.x)))
            .attr('cy', (d) => d.y = Math.max(nodeRadius, Math.min(height - nodeRadius, d.y)));
        this.graphNodes
            .selectAll('text')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .attr('text-anchor', (d) => {
                if (d.type === 'domain') return 'middle';
                if (d.x < width / 2) {
                    return 'end';
                }
                return 'start';
            })
            .attr('x', (d) => {
                if (d.type === 'domain') return 0;
                let dist = nodeRadius + d.level + distanceNodeText;
                if (d.x < width / 2) {
                    // set the offset negative because text-anchor is "end"
                    dist *= -1;
                }
                return dist;
            })
            .attr('y', (d) => {
                if (d.type !== 'domain') return 0;
                let dist = nodeRadius + d.level + distanceNodeText + 3;
                if (d.y > height / 2) {
                    // set the offset negative because text-anchor is "end"
                    dist *= -1;
                }
                return dist;
            });
    }

    render() {
        const { width, height } = this.props;
        return (
            <svg className="graph force-graph" width={width} height={height} ref={(node) => { this.DOMNode = node; }}>
                <g className="force-graph-links" />
                <g className="force-graph-nodes" />
            </svg>
        );
    }
}
ForceGraph.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.object),
    domains: PropTypes.arrayOf(PropTypes.object),
};
ForceGraph.defaultProps = {
    skills: null,
    domains: null,
};
