import * as React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'

import { A4PaperSheet, Section, SubSection } from './PaperSheet'
import Identity, { IdentitySpec } from './Identity'
import Title, { TitleProps } from './Title'
import Education, { EducationSpec } from './Experiences/Education'
import WorkingExperience, { WorkingExpSpec } from './Experiences/WorkingExperience'
import Experience from './Experiences/ExperienceTemplate'
import SkillGroup, { SkillGroupSpec } from './Skills/SkillGroup'

export interface CVSpec {
  cvId: string
  identity: IdentitySpec
  header: TitleProps
  sections: {
    workingExperience: {
      title: string
      content?: WorkingExpSpec[]
    }
    education: {
      title: string
      content?: EducationSpec[]
    }
    hobbies: {
      title: string
      content?: string[]
    }
    skills: {
      title: string
      subSections: SkillGroupSpec[]
    }
  }
}

export const query = graphql`
  fragment CompleteCvSpec on CvYaml {
    cvId
    identity {
      ...IdentityInfo
    }
    header {
      ...CvTitle
    }
    sections {
      workingExperience {
        title
        content {
          ...WorkingExpInfo
        }
      }
      education {
        title
        content {
          ...EducationInfo
        }
      }
      hobbies {
        title
        content
      }
      skills {
        title
        subSections {
          ...SkillsGroupsInfo
        }
      }
    }
  }
`

interface PaperCVProps {
  spec: CVSpec
}

const IdentitySubSection = styled(SubSection)`
  flex-grow: 3;
`

const HeaderSubSection = styled(SubSection)`
  flex-grow: 9;
  align-self: flex-end;
  padding-right: 0px;
`
const ExperienceSubSection = styled(SubSection)`
  flex-grow: 7;
  height: inherit;
`

const SkillSubSection = styled(SubSection)`
  flex-grow: 5;
  background: rgb(240, 240, 240) !important;
`

const StyledCVh2 = styled.h2`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: rgb(0, 59, 53);
  letter-spacing: 1px;
  margin-top: 15px;
  margin-bottom: 7px;
`

const PaperCV: React.FC<PaperCVProps> = ({ spec }) => (
  <A4PaperSheet internalMargins={{ top: 10, bottom: 5, left: 5, right: 5 }}>
    <Section heightInMm={46}>
      <IdentitySubSection>
        <Identity identity={spec.identity} />
      </IdentitySubSection>
      <HeaderSubSection>
        <Title title={spec.header.title} subTitle={spec.header.subTitle} />
      </HeaderSubSection>
    </Section>
    <Section heightInMm={236}>
      <ExperienceSubSection>
        <StyledCVh2>{spec.sections.workingExperience.title}</StyledCVh2>
        {spec.sections.workingExperience.content?.map((exp, index) => (
          <WorkingExperience key={index} experience={exp} />
        ))}

        <StyledCVh2>{spec.sections.education.title}</StyledCVh2>
        {spec.sections.education.content?.map((educ, index) => (
          <Education key={index} education={educ} />
        ))}

        <StyledCVh2>{spec.sections.hobbies.title}</StyledCVh2>
        <Experience title={spec.sections.hobbies.content?.join(', ') || ''} />
      </ExperienceSubSection>
      <SkillSubSection>
        <StyledCVh2>{spec.sections.skills.title}</StyledCVh2>
        {spec.sections.skills.subSections.map((sg, index) => (
          <SkillGroup key={index} skillGroup={sg} />
        ))}
      </SkillSubSection>
    </Section>
  </A4PaperSheet>
)

export default PaperCV
