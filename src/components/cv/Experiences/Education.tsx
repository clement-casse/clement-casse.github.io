import * as React from 'react'
import { graphql } from 'gatsby'
import Experience from './ExperienceTemplate'

interface EducationProps {
  education: EducationSpec
}

export interface EducationSpec {
  id: string
  title: string
  start?: string
  end: string
  topics?: string[]
  notes?: string[]
  school: {
    name: string
    area: string
    city: string
  }
}

export const query = graphql`
  fragment EducationInfo on EducationYaml {
    id
    title
    start
    end
    notes
    school {
      name
      city
      area
    }
  }
`

const Education: React.FC<EducationProps> = ({ education }: EducationProps) => (
  <Experience
    title={education.title}
    place={education.school}
    start={education.start}
    end={education.end}
    topics={education.topics}
    notes={education.notes}
  />
)

export default Education
