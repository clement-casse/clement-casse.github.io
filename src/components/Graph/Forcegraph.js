import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import './forcegraph.css';

export default class ForceSimulation extends React.Component {

    constructor(props) {
        super(props);

        this.conf = {
            CIRCLE_BASE_RADIUS: 5,
            DISTANCE_TEXT_CIRCLE: 5,
            LINK_STROKE_WIDTH: 1
        }

        this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink()
                .id((d) => d.id)
            )
            .force("charge", d3.forceManyBody().strength(-80))
            .force("center", d3.forceCenter(props.width / 2, props.height / 2))

        this.d3Graph = {};
        this.d3Links = {};
        this.d3Nodes = {};

        // Event Handlers
        this.dragStarted = (d) => {
            if (!d3.event.active) {
                this.simulation
                    .alphaTarget(0.3)
                    .restart();
            }
            d.fx = d.x;
            d.fy = d.y;
        };
        this.dragged = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        };
        this.dragEnded = (d) => {
            // Fix the node
            if (!d3.event.active) {
                this.simulation
                    .alphaTarget(0);
            }
        };
        this.doubleClicked = (d) => {
            // Release the node
            d.fx = null;
            d.fy = null;
        };
    }
    
    componentDidMount() {
        const {width, height, nodes, links} = this.props;

        // D3 Graph 
        this.d3Graph = d3.select(ReactDOM.findDOMNode(this));
        
        // Data Join on nodes and links
        this.d3Links = this.d3Graph
            .select('.force-graph-links')
            .selectAll('.force-graph-link')
            .data(links, (d) => d.id);

        this.d3Nodes = this.d3Graph
            .select('.force-graph-nodes')
            .selectAll('.force-graph-node')
            .data(nodes, (d) => d.id);
        
        // Entering elements
        this.d3Links = this.d3Links.enter()
            .insert('line')
            .classed('force-graph-link', true)
            .attr("stroke-width", this.conf.LINK_STROKE_WIDTH);

        this.d3Nodes = this.d3Nodes.enter()
            .append('g')
            .classed('force-graph-node', true)
            .classed('skill',  (d) => d.type == 'skill')
            .classed('domain', (d) => d.type == 'domain')
            .attr('id', (d) => `${d.type}-${d.id}`)
            .on('dblclick', this.doubleClicked)
            .call((selection) => {
                selection
                    .append('circle')
                    .attr('r', (d) => this.conf.CIRCLE_BASE_RADIUS + d.level)
                    .call(d3.drag()
                        .on("start", this.dragStarted) 
                        .on("drag", this.dragged)
                        .on("end", this.dragEnded)
                    );
                selection
                    .append('text')
                    .attr('dy', ".35em")
                    .text((d) => d.title);
            });

        this.simulation.nodes(nodes);
        this.simulation.force("link").links(links);
        this.simulation.on("tick", () => {
            this.d3Links
                .attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);
            this.d3Nodes
                .selectAll('circle')
                .attr('cx', (d) => {
                    let radius = this.conf.CIRCLE_BASE_RADIUS + d.level + 1.5;
                    return d.x = Math.max(radius, Math.min(width - radius, d.x));
                })
                .attr('cy', (d) => {
                    let radius = this.conf.CIRCLE_BASE_RADIUS + d.level + 1.5;
                    return d.y = Math.max(radius, Math.min(height - radius, d.y));
                });
            this.d3Nodes
                .selectAll('text')
                .attr('transform', (d) => `translate(${d.x},${d.y})`)
                .attr('text-anchor', (d) => {
                    if (d.type === 'domain') return 'middle';
                    if (d.x < width/2) {
                        return 'end';
                    }
                    else {
                        return 'start';
                    }
                })
                .attr('x', (d) => {
                    if (d.type === 'domain') return 0;
                    let dist = this.conf.CIRCLE_BASE_RADIUS + d.level + this.conf.DISTANCE_TEXT_CIRCLE;
                    if (d.x < width/2){
                        // set the offset negative because text-anchor is "end"
                        dist *= -1;
                    }
                    return dist;
                })
                .attr('y', (d) => {
                    if (d.type !== 'domain') return;
                    let dist = this.conf.CIRCLE_BASE_RADIUS + d.level + this.conf.DISTANCE_TEXT_CIRCLE + 3;
                    if (d.y > height/2){
                        // set the offset negative because text-anchor is "end"
                        dist *= -1;
                    }
                    return dist;
                });
        })
    }

    shouldComponentUpdate({nodes, links}) {
        const {width, height} = this.props;
        // TODO
        
        return false;
    }

    render() {
        const {width, height} = this.props;
        return (
            <svg className="force-graph" width={width} height={height}>
                <g className="force-graph-links"></g>
                <g className="force-graph-nodes"></g>
            </svg>
        );
    }
}