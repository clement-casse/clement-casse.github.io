import * as React from 'react'
import { graphql } from 'gatsby'
import Experience from './ExperienceTemplate'

interface WorkingExpProps {
  experience: WorkingExpSpec
}

export interface WorkingExpSpec {
  id: string
  title: string
  start?: string
  end?: string
  missions?: {
    desc: string
  }[]
  company: {
    name: string
    area: string
    city: string
  }
}

export const query = graphql`
  fragment WorkingExpInfo on ExperienceYaml {
    id
    title
    start
    end
    missions {
      desc
    }
    company {
      area
      city
      name
    }
  }
`

const WorkingExperience: React.FC<WorkingExpProps> = ({ experience }) => (
  <Experience
    title={experience.title}
    place={experience.company}
    start={experience.start}
    end={experience.end}
    missions={experience.missions}
  />
)

export default WorkingExperience
