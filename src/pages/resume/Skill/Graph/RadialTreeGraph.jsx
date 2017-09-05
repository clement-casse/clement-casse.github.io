import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import './radialtreegraph.css';
import * as DataUtils from './DataUtils';

export default class RadialTreeGraph extends React.Component {

    constructor(props) {
        super(props);

        this.DOMNode = {}; // Assignment triggered by th `ref` attribute in the `render()` method

        this.tree = d3.tree()
            .size([2 * Math.PI, (Math.min(props.width, props.height) - 10) / 2])
            .separation((a, b) => ((a.parent === b.parent ? 1 : 2)) / a.depth);

        // Scales if necessary

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

        const radialPoint = (x, y) => [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)]

        this.tree(root);

        const graph = d3.select(this.DOMNode);

        const links = graph
            .selectAll('.link')
            .data(root.links());

        links.enter()
            .append('path')
            .classed('link', true)
            .attr('d', d3.linkRadial()
                .angle(d => d.x)
                .radius(d => d.y));

        const nodes = graph
            .selectAll('.node')
            .data(root.descendants());

        nodes.selectAll('text')
            .text(d => d.data.title[lang]);

        const newNodes = nodes.enter()
            .append('g')
            .classed('node', true)
            .classed('node--internal', d => !!d.children)
            .classed('node--leaf', d => !d.children)
            .attr('transform', d => `translate(${radialPoint(d.x, d.y)})`);

        newNodes.append('circle')
            .attr('r', 4);

        newNodes.append('text')
            .attr('dy', (d) => {
                if (!d.children) return '0.31em';
                return '1.2em';
            })
            .attr('x', (d) => (d.x < Math.PI === !d.children) ? 6 : -6)
            .attr('text-anchor', (d) => {
                if (!!d.children) return 'middle';
                if (d.x < Math.PI) return 'start';
                if (d.x >= Math.PI) return 'end';
            })
            .text(d => d.data.title[lang]);
    }

    render() {
        const { width, height } = this.props;
        return (
            <svg
                className="graph radial-tree-graph"
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
RadialTreeGraph.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.object),
    domains: PropTypes.arrayOf(PropTypes.object),
};
RadialTreeGraph.defaultProps = {
    skills: null,
    domains: null,
};
