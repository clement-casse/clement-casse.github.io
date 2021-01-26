import * as React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Note from './Note'
import TreeMap from './TreeMap'
import RadialTree from './RadialTree'
import DescriptionList from './DescriptionList'
import PartitionBar from './GithubPartitionBar'
import CloudOfWords from './CloudOfWords'

import * as d3 from 'd3-hierarchy'

interface SkillGroupProps {
  skillGroup: SkillGroupSpec
}

export interface SkillGroupSpec {
  title: string
  visualization?: VisualizationCfg
  skillCategories?: SkillDatum[]
  additionalInfo?: string
  skills: SkillDatum[]
}

interface VisualizationCfg {
  kind: VizKind
  width?: number
  height?: number
}

enum VizKind {
  TreeMap = 'treemap',
  RadialTree = 'radialtree',
  PartitionBar = 'partitionbar',
  CloudOfWords = 'cloudofwords',
  Nested = 'nested'
}

interface SkillVizProps {
  config: VisualizationCfg
  data: d3.HierarchyNode<SkillDatum>
}

interface SkillDatum {
  name: string
  desc?: string
  visualization?: VisualizationCfg
  selfEvaluation?: number
  skillCategories?: SkillDatum[]
  skills?: SkillDatum[]
}

export const query = graphql`
  fragment SkillsGroupsInfo on CvYamlSectionsSkillsSubSections {
    title
    visualization {
      kind
      width
      height
    }
    skillCategories {
      name
      visualization {
        kind
        width
        height
      }
      skills {
        name
        selfEvaluation
      }
    }
    skills {
      name
      desc
    }
    additionalInfo
  }
`

const StyledCVh3 = styled.h3`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 300;
  font-size: 16px;
  color: rgb(0, 59, 53);
  margin-top: 7px;
  margin-bottom: 5px;
`

const StyledCVh4 = styled.h4`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 300;
  font-size: 14px;
  color: rgb(0, 59, 53);
  margin-top: 5px;
  margin-bottom: 3px;
`

const SkillViz: React.FC<SkillVizProps> = ({ config, data }) => {
  switch (config.kind.toLowerCase()) {
    case VizKind.TreeMap:
      return (
        <TreeMap
          width={config.width || 300}
          height={config.height || 300}
          hierarchyRoot={data}
          getTitle={d => d.name}
          getWeight={d => d.selfEvaluation || 0}
          getContent={() => ''}
        />
      )
    case VizKind.RadialTree:
      return <RadialTree width={config.width || 300} height={config.height || 300} getTitle={d => d.name} hierarchyRoot={data} />
    case VizKind.PartitionBar:
      return <PartitionBar hierarchyRoot={data} getTitle={d => d.name} getWeight={d => d.selfEvaluation || 1} />
    case VizKind.CloudOfWords:
      return (
        <CloudOfWords
          width={config.width || 300}
          height={config.height || 300}
          hierarchyRoot={data}
          getTitle={d => d.name}
          getWeight={d => d.selfEvaluation || 1}
        />
      )
    case VizKind.Nested:
      const getTitle = (d: SkillDatum) => d.name
      return (
        <>
          {data.children?.map((child, index) => (
            <div key={index}>
              <StyledCVh4>
                <FontAwesomeIcon icon="arrow-right" fixedWidth /> {getTitle(child.data)}
              </StyledCVh4>
              {child.data.visualization ? <SkillViz config={child.data.visualization} data={child} /> : null}
            </div>
          ))}
        </>
      )
    default:
      console.error(`Unsupported kind value, got "${config.kind}" expects one of [ ${Object.values(VizKind).join(', ')} ]`)
      return null
  }
}

const SkillGroup: React.FC<SkillGroupProps> = ({ skillGroup }) => {
  const vizConfig = skillGroup.visualization || { kind: VizKind.Nested }

  // Creates a single root Node to the d3-hierarchy with nothing to display then attach categories
  // contained in the data parameter, it makes config file more readable
  const rootElement = {
    name: '',
    skillCategories: skillGroup.skillCategories || skillGroup.skills
  }
  const hierarchy = d3.hierarchy<SkillDatum>(rootElement, d => d.skillCategories || d.skills)
  return (
    <>
      <StyledCVh3>{skillGroup.title}</StyledCVh3>
      {skillGroup.visualization || skillGroup.skillCategories ? (
        <SkillViz config={vizConfig} data={hierarchy} />
      ) : skillGroup.skills ? (
        <DescriptionList skills={skillGroup.skills} />
      ) : null}
      {skillGroup.additionalInfo ? <Note content={skillGroup.additionalInfo} /> : null}
    </>
  )
}

export default SkillGroup
