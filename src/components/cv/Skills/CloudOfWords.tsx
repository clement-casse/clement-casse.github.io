import * as React from 'react'
import { strict as assert } from 'assert'
import d3Cloud from 'd3-cloud'
import * as d3 from 'd3'
import { colors } from '../../../styles/variables'
import { transparentize, darken } from 'polished'

interface CloudOfWordsProps<T> {
  width: number
  height: number
  hierarchyRoot: d3.HierarchyNode<T>
  getTitle: (datum: T) => string
  getWeight: (datum: T) => number
}

export default class CloudOfWords<Datum> extends React.Component<CloudOfWordsProps<Datum>, {}> {
  ref: SVGSVGElement | undefined
  words: {
    text: string
    size: number
  }[]
  cloud: any //d3.layout.Cloud<d3Cloud.Word> //How can I retrieve the type ?
  colorScale: d3.ScaleLinear<string, number>

  constructor(props: CloudOfWordsProps<Datum>) {
    super(props)
    this.ref = undefined
    const { getTitle, getWeight } = this.props
    this.words = props.hierarchyRoot.leaves().map(hNode => ({ text: getTitle(hNode.data), size: getWeight(hNode.data) }))
    this.cloud = d3Cloud()
      .size([props.width, props.height])
      .padding(3)
      .font('Source Sans Pro')
      .fontSize(d => (d.size) ? 2 * d.size + 11 : 12)
      .rotate(() => (~~(Math.random() * 3) - 1) * 45) // Either -45°, 0° or 45°
      .spiral("archimedean")
      .words(this.words)

    this.colorScale = d3
      .scaleLinear<string, number>()
      .domain([0, this.props.hierarchyRoot.leaves().length - 1])
      .range([`${transparentize(0.25, darken(0.2, colors.brand))}`, `${transparentize(0.2, colors.brand)}`])
  }

  componentDidMount() {
    assert(this.ref) //reasonable assumption to think that the <SVG> exists in the DOM because the method `componentDidMount` triggers after applying render()

    const graph = d3.select(this.ref).select("g")

    const layout = this.cloud.on("end", (words: d3Cloud.Word[]) => {
      const wordSVGElements = graph.selectAll("text").data(words)

      wordSVGElements.join(
        enter => enter.append('text')
            .style('font-size', d => `${d.size}px`)
            .style('font-family', d => d.font)
            .style('font-weight', 700)
            .style('fill', (d, i) => this.colorScale(i))
            .attr('text-anchor', 'middle')
            .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
            .text(d => d.text),
        update => update,
        exit => exit
      )
    })

    layout.start()
  }

  render() {
    const { width, height } = this.props
    return (
      <svg className="cloud-of-words" ref={(ref: SVGSVGElement) => (this.ref = ref)} width={width} height={height}>
        <g transform={`translate(${~~(width/2)},${~~(height/2)})`}></g>
      </svg>
    )
  }
}
