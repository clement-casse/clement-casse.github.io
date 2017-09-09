import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import './treemapgraph.css';
import * as DataUtils from './DataUtils';

export default class TreemapGraph extends React.Component {

    constructor(props) {
        super(props);

        this.DOMNode = {}; // Assignment triggered by th `ref` attribute in the `render()` method

        this.treemap = d3.treemap()
            .size([props.width, props.height])
            .paddingOuter(d => (d.parent != null ? 5 : 0))
            .paddingTop(d => (d.parent != null ? 22 : 0))
            .paddingInner(3)
            .round(true);

        this.colourScale = d3.scaleLinear()
            .domain([0, 2])
            .range([d3.rgb('#E5F0ED'), d3.rgb('#00635A')]);

        this.textColourScale = d3.scaleOrdinal()
            .domain([0, 1, 2])
            .range([d3.rgb('#000000'), d3.rgb('#000000'), d3.rgb('#F0F0F0')]);

        this.d3logic = this.d3logic.bind(this);
    }

    componentDidMount() {
        const { domains, skills, lang } = this.props;
        const data = DataUtils.createTreeStruct('root', domains, skills);
        this.d3logic(data, lang);
    }

    shouldComponentUpdate(nextProps) {
        const { domains, skills, lang } = nextProps;
        const data = DataUtils.createTreeStruct('root', domains, skills);
        this.d3logic(data, lang);
        return false;
    }

    d3logic(data, lang) {
        const stratified = d3.stratify()
            .id(d => d.id)
            .parentId(d => d.parent)(data);

        console.log(stratified);
        const root = stratified.sum(d => d.weight)
            .sort((a, b) => b.height - a.height || b.value - a.value);

        this.treemap(root);

        const graph = d3.select(this.DOMNode);

        const cell = graph
            .selectAll('.node')
            .data(root.descendants());

        cell.selectAll('text').selectAll('tspan.title').text(d => d.data.title[lang]);
        // TODO Update relatedSkills too.

        const newCell = cell.enter()
            .append('g')
            .classed('node', true)
            .attr('transform', d => `translate(${d.x0},${d.y0})`)
            .each((d) => { d.node = this; });

        newCell
            .append('rect')
            .classed('cell', true)
            .attr('id', d => `rect-${d.id}`)
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('rx', 6)
            .attr('ry', 6)
            .style('fill', d => this.colourScale(d.depth));

        newCell
            .append('text')
            .append('tspan')
            .classed('title', true)
            .attr('x', 6)
            .attr('y', 15)
            .style('fill', d => this.textColourScale(d.depth))
            .text(d => d.data.title[lang]);

        newCell
            .filter(d => d.data.relatedSkills)
            .append('text')
            .selectAll('tspan')
            .data(d => d.data.relatedSkills)
            .enter()
                .append('tspan')
                .classed('relatedSkills', true)
                .attr('x', 6)
                .attr('y', (d, i) => 5 + ((i + 2) * 12))
                .style('fill', () => this.textColourScale(2))
                .text(d => `- ${d[lang]}`);
    }

    render() {
        const { width, height } = this.props;
        return (
            <svg
                className="graph treemap-graph"
                width={width}
                height={height}
                ref={(node) => { this.DOMNode = node; }}
            />
        );
    }
}
TreemapGraph.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.object),
    domains: PropTypes.arrayOf(PropTypes.object),
};
TreemapGraph.defaultProps = {
    skills: null,
    domains: null,
};
