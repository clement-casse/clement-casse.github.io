import * as React from 'react'
import * as d3 from 'd3'
import { strict as assert } from 'assert'

interface TreeMapProps<T> {
  width: number
  height: number
  hierarchyRoot: d3.HierarchyNode<T>
  getTitle: (datum: T) => string
  getWeight: (datum: T) => number
  getContent: (datum: T) => string
}

export default class TreeMap<Datum> extends React.Component<TreeMapProps<Datum>, {}> {
  ref: SVGSVGElement | undefined
  treeMap: d3.TreemapLayout<Datum>
  rectColorScale: d3.ScaleLinear<string, number>
  textColorScale: d3.ScaleOrdinal<number, string>

  constructor(props: TreeMapProps<Datum>) {
    super(props)
    this.ref = undefined
    this.treeMap = d3
      .treemap<Datum>()
      .size([props.width, props.height])
      .paddingOuter(node => (node.parent == null ? 0 : 5))
      .paddingTop(node => (node.parent == null ? 0 : 22))
      .paddingInner(3)
      .round(true)

    this.rectColorScale = d3
      .scaleLinear<string, number>()
      .domain([0, 2])
      .range(['rgba(0, 0, 0, 0)', 'rgba(0, 99, 90, 1)'])
      .clamp(true)

    this.textColorScale = d3
      .scaleOrdinal<number, string>()
      .domain([0, 1, 2])
      .range(['rgba(0, 0, 0, 0)', 'black', 'white'])
  }

  componentDidMount() {
    assert(this.ref) //reasonable assumption to think that the <SVG> exists in the DOM because the method `componentDidMount` triggers after applying render()
    const sortedTreeRoot = this.props.hierarchyRoot.sum(this.props.getWeight).sort((a, b) => b.height - a.height)

    const treeMapLayout = this.treeMap(sortedTreeRoot)

    const graph = d3.select(this.ref) // <svg.treemap> DOM Node

    const cells = graph.selectAll('.component').data(treeMapLayout.descendants())

    cells.join(
      enter => {
        const component = enter
          .append('g')
          .classed('component', true)
          .attr('transform', d => `translate(${d.x0},${d.y0})`)

        component
          .append('rect')
          .attr('width', d => d.x1 - d.x0)
          .attr('height', d => d.y1 - d.y0)
          .attr('rx', 6)
          .attr('ry', 6)
          .style('fill', d => this.rectColorScale(d.depth))

        component
          .append('text')
          .append('tspan')
          .classed('title', true)
          .attr('x', 6)
          .attr('y', 15)
          .attr('font-weight', 700)
          .style('fill', d => this.textColorScale(d.depth))
          .text(d => this.props.getTitle(d.data))

        component
          .append('text')
          .selectAll('tspan')
          .classed('connected-skills', true)
          .attr('font-style', 'italic')

        return component
      },
      update => update, // Not implemented because the application never updates its data
      exit => exit
    )
  }

  render() {
    const { width, height } = this.props
    return <svg className="treemap" ref={(ref: SVGSVGElement) => (this.ref = ref)} width={width} height={height}></svg>
  }
}
