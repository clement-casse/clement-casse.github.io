import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import './radialpartitiongraph.css';
import * as DataUtils from './DataUtils';

export default class RadialPartitionGraph extends React.Component {

    constructor(props) {
        super(props);

        this.DOMNode = {}; // Assignment triggered by th `ref` attribute in the `render()` method

        this.partition = d3.partition()
            .size([2 * Math.PI, Math.min(props.width, props.height) / 2]);

        

        this.d3logic = this.d3logic.bind(this);
    }

    componentDidMount() {
        const { domains, skills, lang } = this.props;
        const data = DataUtils.createTreeStruct('root', domains, skills);
        this.d3logic(lang, data);
    }

    shouldComponentUpdate(nextProps) {
        const { domains, skills, lang } = nextProps;
        const data = DataUtils.createTreeStruct('root', domains, skills);
        this.d3logic(lang, data);
        return false;
    }

    d3logic(lang, data) {
        const root = d3.stratify()
            .id(d => d.id)
            .parentId(d => d.parent)(data);

        this.partition(root.count());

        const graph = d3.select(this.DOMNode);
        const arc = d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .innerRadius(d => d.y0)
            .outerRadius(d => d.y1);

        const arcs = graph
            .selectAll('g.arc')
            .data(root.descendants());

        arcs.selectAll('text')
            .text(d => {console.log(d); return d.data.title[lang]});

        const newArcs = arcs.enter();

        newArcs.append('g')
            .classed('arc', true)
                .append('path')
                .attr('display', d => (d.depth ? null : 'none'))
                .attr('d', arc)
                .style('fill', d => 'white');

        newArcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .text(d => d.data.title[lang]);
    }

    render() {
        const { width, height } = this.props;
        return (
            <svg
                className="graph radial-partition-graph"
                width={width}
                height={height}
            >
                <g
                    transform={`translate(${width / 2},${height / 2})`}
                    ref={(node) => { this.DOMNode = node; }}
                />
            </svg>
        );
    }
}
RadialPartitionGraph.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.object),
    domains: PropTypes.arrayOf(PropTypes.object),
};
RadialPartitionGraph.defaultProps = {
    skills: null,
    domains: null,
};
