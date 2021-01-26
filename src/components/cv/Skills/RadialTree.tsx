import * as React from 'react'
import { strict as assert } from 'assert'
import * as d3 from 'd3'

interface RadialTreeProps<T> {
  width: number
  height: number
  hierarchyRoot: d3.HierarchyNode<T>
  getTitle: (datum: T) => string
}

export default class RadialTree<Datum> extends React.Component<RadialTreeProps<Datum>, {}> {
  ref: SVGSVGElement | undefined
  tree: d3.TreeLayout<Datum>

  constructor(props: RadialTreeProps<Datum>) {
    super(props)
    this.ref = undefined
    this.tree = d3
      .tree<Datum>()
      .size([2 * Math.PI, (Math.min(props.width, props.height) - 10) / 2])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth)
  }

  componentDidMount() {
    function radialPoint(x: number, y: number) {
      return [y * Math.cos((x -= Math.PI / 2)), y * Math.sin(x)]
    }

    assert(this.ref) //reasonable assumption to think that the <SVG> exists in the DOM because the method `componentDidMount` triggers after applying render()
    const { hierarchyRoot } = this.props

    const treeLayout = this.tree(hierarchyRoot)

    const graph = d3.select(this.ref)

    const links = graph.selectAll('g.link').data(treeLayout.links())
    const nodes = graph.selectAll('g.node').data(treeLayout.descendants())

    links.join(
      enter =>
        enter
          .append('path')
          .classed('link', true)
          .attr(
            'd',
            d3
              .linkRadial<d3.HierarchyPointLink<Datum>, d3.HierarchyPointNode<Datum>>()
              .angle(d => d.x)
              .radius(d => d.y)
          )
          .attr('fill', 'none')
          .attr('stroke', '#555')
          .attr('stroke-opacity', 0.4)
          .attr('stroke-width', '1.5px'),
      update => update,
      exit => exit
    )

    nodes.join(
      enter => {
        const nodes = enter
          .append('g')
          .classed('node', true)
          .attr('transform', d => `translate(${radialPoint(d.x, d.y)})`)

        nodes
          .append('circle')
          .attr('r', 3)
          .attr('stroke', d => (d.children ? 'rgb(0, 59, 53)' : 'black'))
          .attr('stroke-width', d => (d.children ? '1.5px' : '1px'))
          .attr('fill', d => (d.children ? 'rgb(240, 240, 240' : 'black'))

        nodes
          .append('text')
          .attr('dy', d => (d.children ? '1.2em' : '0.31em'))
          .attr('x', d => (d.x < Math.PI === !d.children ? 6 : -6))
          .attr('text-anchor', d => {
            if (d.children) return 'middle'
            else return d.x < Math.PI ? 'start' : 'end'
          })
          .attr('font-weight', d => (d.children ? 700 : 500))
          .text(d => this.props.getTitle(d.data))

        return nodes
      },
      update => update,
      exit => exit
    )
  }

  render() {
    const { width, height } = this.props
    return (
      <svg className="radial-tree" width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`} ref={(ref: SVGSVGElement) => (this.ref = ref)} />
      </svg>
    )
  }
}
