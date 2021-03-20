import * as React from 'react'
import styled from '@emotion/styled'
import * as d3 from 'd3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { colors } from '../../../styles/variables'
import { transparentize } from 'polished'

interface BarsListProps<T> {
  hierarchyRoot: d3.HierarchyNode<T>
  getTitle: (datum: T) => string
  getWeight: (datum: T) => number
}

interface PartitionBarProps {
  height: number
}

interface PartitionItemProps {
  width: number
  color: string
}

const StyledCakeChart = styled.div`
  padding-top: 5px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
`

const GithubStyledPartitionBar = styled.span`
  display: flex;
  overflow: hidden;
  border-radius: 6px;
  height: ${(props: PartitionBarProps) => props.height}px;
  margin-bottom: 8px;
`

const GithubStyledPartitionItem = styled.span`
  width: ${(props: PartitionItemProps) => 100 * props.width}%;
  background-color: ${(props: PartitionItemProps) => props.color} !important;

  &:not(:first-of-type) {
    margin-left: 2px;
  }
`

const GithubStyledLegend = styled.ul`
  list-style: none !important;
  padding: 0;
  margin: 0;
`

const GithubStyledLegendItem = styled.li`
  margin-left: 4px;
  margin-right: 11px;
  display: inline-flex !important;
`

export default class PartitionBar<Datum> extends React.Component<BarsListProps<Datum>, {}> {
  barHeight: number
  partitions: {
    partitionTitle: string
    partitionPercent: number
  }[]
  colorScale: d3.ScaleLinear<string, number>

  constructor(props: BarsListProps<Datum>) {
    super(props)
    this.barHeight = 8
    this.colorScale = d3
      .scaleLinear<string, number>()
      .domain([0, this.props.hierarchyRoot.leaves().length - 1])
      .range([`${colors.brand}`, `${transparentize(0.5, colors.brand)}`])

    const totalWeight = this.props.hierarchyRoot.leaves().reduce<number>((acc, curr) => acc + this.props.getWeight(curr.data), 0)

    this.partitions = this.props.hierarchyRoot
      .leaves()
      .map(hNode => ({
        partitionTitle: props.getTitle(hNode.data),
        partitionPercent: props.getWeight(hNode.data) / totalWeight
      }))
      .sort((h1, h2) => h2.partitionPercent - h1.partitionPercent)
  }

  render() {
    return (
      <StyledCakeChart>
        <GithubStyledPartitionBar height={this.barHeight}>
          {this.partitions.map((p, i) => (
            <GithubStyledPartitionItem key={i} width={p.partitionPercent} color={`${this.colorScale(i)}`} />
          ))}
        </GithubStyledPartitionBar>
        <GithubStyledLegend>
          {this.partitions.map((p, i) => (
            <GithubStyledLegendItem key={i}>
              <span>
                <FontAwesomeIcon icon="circle" size="xs" color={`${this.colorScale(i)}`} fixedWidth />&nbsp;{p.partitionTitle}
              </span>
            </GithubStyledLegendItem>
          ))}
        </GithubStyledLegend>
      </StyledCakeChart>
    )
  }
}
