import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as DataUtils from './DataUtils';

import './radialpartitiongraph.css';

export default class RadialPartitionGraph extends React.Component {

    constructor(props) {
        super(props);

        this.DOMNode = {}; // Assignment triggered by th `ref` attribute in the `render()` method

        this.partition = d3.partition()
            .size([2 * Math.PI, (Math.min(props.width, props.height) / 2) - 6]);

        this.colourScale = d3.scaleLinear()
            .domain([0, 3])
            .range([d3.rgb('#E5F0ED'), d3.rgb('#00635A')]);

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
            .selectAll('.arc')
            .data(root.descendants());

        graph.selectAll('text')
            .text(d => d.data.title[lang]);

        const newArcs = arcs.enter();

        newArcs.append('path')
            .classed('arc', true)
            .attr('display', d => (d.depth ? null : 'none'))
            .attr('d', arc)
            .style('fill', d => this.colourScale(d.depth));

        newArcs.append('text')
            .style('text-anchor', (d) => {
                if (d.depth <= 1) {
                    return 'middle';
                }
                if (arc.centroid(d)[0] <= 0) {
                    return 'end';
                }
                return 'start';
            })
            .attr('transform', (d) => {
                const { width } = this.props;
                const textPosition = arc.centroid(d);
                if (d.depth <= 1) {
                    textPosition[0] *= 0.7;
                    textPosition[1] *= 0.8;
                    return `translate(${textPosition})`;
                }
                if (textPosition[0] <= 0) {
                    textPosition[0] = -(width / 2) + 50;
                    textPosition[1] *= 1.3;
                } else {
                    textPosition[0] = (width / 2) - 50;
                    textPosition[1] *= 1.3;
                }
                return `translate(${textPosition})`;
            })
            .text(d => d.data.title[lang]);

        newArcs.append('polyline')
            .attr('points', (d) => {
                const { width } = this.props;
                const arcCenter = arc.centroid(d);
                const textPosition = arc.centroid(d);
                if (d.depth <= 1) {
                    return '';
                }
                if (textPosition[0] <= 0) {
                    textPosition[0] = -(width / 2) + 50 + 4;
                    textPosition[1] *= 1.3;
                } else {
                    textPosition[0] = (width / 2) - 50 - 4;
                    textPosition[1] *= 1.3;
                }
                const bendPoint = [(arcCenter[0] + textPosition[0]) / 2, textPosition[1]];
                return `${arcCenter} ${bendPoint} ${textPosition}`;
            });
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
