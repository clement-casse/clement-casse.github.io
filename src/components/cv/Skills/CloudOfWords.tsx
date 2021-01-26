import * as React from 'react'
import { strict as assert } from 'assert'
import * as d3 from 'd3'
import d3Cloud from 'd3-cloud'

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
    value: number
  }[]
  cloud: any

  constructor(props: CloudOfWordsProps<Datum>) {
    super(props)
    this.ref = undefined
    const { getTitle, getWeight } = this.props
    this.words = props.hierarchyRoot.leaves().map(hNode => ({ text: getTitle(hNode.data), value: getWeight(hNode.data) }))
    this.cloud = d3Cloud()
      .size([props.width, props.height])
      .font('Source Sans Pro')
      .fontSize(d => d.size || 12)
  }

  componentDidMount() {
    assert(this.ref) //reasonable assumption to think that the <SVG> exists in the DOM because the method `componentDidMount` triggers after applying render()

    const graph = d3.select(this.ref)
  }

  render() {
    const { width, height } = this.props
    return <svg className="cloud-of-words" ref={(ref: SVGSVGElement) => (this.ref = ref)} width={width} height={height}></svg>
  }
}
