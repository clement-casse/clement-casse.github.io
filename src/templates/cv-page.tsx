import * as React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { colors } from '../styles/variables'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

import IndexLayout from '../layouts/index'
import LayoutMain from '../components/LayoutMain'
import Container from '../components/Container'
import PaperCV, { CVSpec } from '../components/cv/CV'

interface CVTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    allCvYaml: {
      edges: {
        node: {
          cvId: string
        }
      }[]
    }
    cvYaml: CVSpec
  }
}

interface LinkButtonProps {
  isActive: boolean
  text: string
  linkLocation: string
}

export const query = graphql`
  query CVTemplateQuery($cvId: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    allCvYaml(limit: 100) {
      edges {
        node {
          cvId
        }
      }
    }
    cvYaml(cvId: { eq: $cvId }) {
      ...CompleteCvSpec
    }
  }
`

const LinkButton: React.FC<LinkButtonProps> = ({ isActive, text, linkLocation }) => (
  <button className={isActive ? 'btn-active' : 'btn-available'} onClick={() => (window.location.href = linkLocation)}>
    {text}
  </button>
)

const StyledButtonGroup = styled.div`
  width: 100%;
  font-family: 'Abel', monospace;

  & > button.btn-active {
    background-color: ${colors.accent};
    color: ${colors.white};
    pointer-events: none;
    text-decoration: underline;
  }

  & > button:not(:last-of-type) {
    border-bottom: none;
  }

  & > button:not(:last-of-type) {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  & > button:not(:first-of-type) {
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
  }
`

const StyledSidebar = styled.aside`
  width: 190px;
  margin-top: 35px;
  margin-bottom: 35px;
  padding-right: 20px;
  padding-left: 20px;
  border-right: 1px solid gray;
  overflow-y: hidden;

  * {
    font-family: 'Abel', monospace;
  }

  button {
    width: 100%;
    border: 1px solid ${colors.accent};
    color: rgba(0, 32, 29, 1);
    padding: 6px;
    border-radius: 6px;
    text-transform: capitalize;
  }

  button:hover {
    background-color: ${colors.accent};
    color: ${colors.white};
  }
`

const PositionPaperSheet = styled(Container)`
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 60px;
  margin-right: 5px;
`

const StyledLinkList = styled.ul`
  text-decoration: none;
  list-style-type: none;
  padding-left: 0;
`

const SidebarH2 = styled.h2`
  font-family: 'Abel', monospace;
  font-size: 20px;
  color: rgb(0, 59, 53);
  letter-spacing: 1px;
  margin-top: 15px;
  margin-bottom: 7px;
`

const CVTemplate: React.FC<CVTemplateProps> = ({ data }) => (
  <IndexLayout>
    <div className="cv-webpage" style={{ display: 'flex' }}>
      <StyledSidebar>
        <SidebarH2>Actions:</SidebarH2>
        <button onClick={ e => (typeof window !== `undefined`) ? window.print() : console.log(e) }>
          <FontAwesomeIcon icon="print" fixedWidth />
        </button>
        <p style={{ marginTop: '10px' }}>Works on Chrome and Firefox.</p>

        <SidebarH2>Other versions:</SidebarH2>
        <StyledButtonGroup>
          {data.allCvYaml.edges
            .map(e => e.node.cvId)
            .map(id => (
              <LinkButton key={id} isActive={id === data.cvYaml.cvId} text={id} linkLocation={`/cv/${id}`} />
            ))}
        </StyledButtonGroup>

        <SidebarH2>Links:</SidebarH2>
        <StyledLinkList>
          <li>
            <a href="https://fr.linkedin.com/in/clementcasse">
              <FontAwesomeIcon icon={faLinkedin} fixedWidth /> LinkedIn Profile
            </a>
          </li>
        </StyledLinkList>
      </StyledSidebar>

      <LayoutMain>
        <PositionPaperSheet>
          <PaperCV spec={data.cvYaml} />
        </PositionPaperSheet>
      </LayoutMain>
    </div>
  </IndexLayout>
)

export default CVTemplate
