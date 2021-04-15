import * as React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngular,
  faHtml5,
  faCss3,
  faReact,
  faGithub,
  faBootstrap
} from '@fortawesome/free-brands-svg-icons'
import { colors } from '../styles/variables'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import { Timeline, TimelineContainer } from '../components/timeline/Timeline'
import { Link } from 'gatsby'

interface IconLegendProps {
  legend: string
}

const StyledButtonBlock = styled.div`
  display: flex;
  width: 100%;
  font-family: 'Abel', monospace;
  font-size: 25px;
  border: 2px solid ${colors.accent};
  border-radius: 6px;
  margin-top: 0px;
  margin-bottom: 40px;
`

const StyledButton = styled.div`
  flex: 1;

  &:not(:last-of-type) {
    border-right: 2px solid ${colors.accent};
  }
`

const StyledButtonContent = styled.p`
  height: 120px;
  line-height: 120px;
  text-align: center;
`

const InlineList = styled.div`
  display: flex;
  padding: 0 30px 0;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  width: 100%;

  & > * {
    display: inline;
  }
`
const StyledFigure = styled.figure`
  margin: 6px 0 6px;

  & div.figure {
    text-align: center;
  }

  & figcaption {
    text-align: center;
    color: ${colors.accent};
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 300;
  }
`

const IconLegended: React.FC<IconLegendProps> = ({legend, children}) => (
  <StyledFigure>
    <div className="figure">
      {children}
    </div>
    <figcaption>{legend}</figcaption>
  </StyledFigure>
)

export default () => (
  <IndexLayout>
    <Page>
      <StyledButtonBlock>
        <StyledButton>
          <Link to="/cv/english">
            <StyledButtonContent>View my CV in English 🇬🇧</StyledButtonContent>
          </Link>
        </StyledButton>
        <StyledButton>
          <Link to="/cv/french">
            <StyledButtonContent>Voir mon CV en Français 🇫🇷</StyledButtonContent>
          </Link>
        </StyledButton>
      </StyledButtonBlock>
      <Container>
        <h1>Overview of the CV</h1>
        <p>
          The CV has been designed to be a ready-to-print HTML page.
          As of today, I have declined it in two versions: a french one and an english one.
        </p>
        <p>
          In order to have a nice looking rendering for the CV, I followed advices from{' '}
          <a href="https://colinecaillier.com/">Coline Caillier</a>.
        </p>

        <h2>How it is made and why?</h2>
        <p>
          To create this website, I decided to pick up frameworks, libraries and technologies as I wanted to learn them.
          This website undergone some major technology changes since it has been first used as a CV.
          I still use this project as a playground to experiment some frontend technologies.
        </p>

        <InlineList>
          <IconLegended legend="Github Pages"><FontAwesomeIcon icon={faGithub} size="3x" style={{color: "black"}} /></IconLegended>
          <IconLegended legend="React"><FontAwesomeIcon icon={faReact} size="3x" style={{color: "#61dbfb"}} /></IconLegended>
          <IconLegended legend="D3.js"><img src="https://raw.githubusercontent.com/d3/d3-logo/master/d3.svg" width="48px" /></IconLegended>
          <IconLegended legend="TypeScript"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="48px" /></IconLegended>
          <IconLegended legend="Gatsby.js"><img src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" height="48px" /></IconLegended>
          <IconLegended legend="GraphQL"><img src="https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" width="48px" /></IconLegended>
        </InlineList>

        <p>
          You may be thinking that: <em>All these technologies, librairies and framework may seems a bit too complicated to render a simple static page to print</em> and I cannot agree more with this statement.
          However it is the result of years spent to learn, evaluate and try technologies; the result simply corresponds to the technologies I have pleasure to keep working with, even after a long hiatus.
        </p>


        <h3>The Chronology</h3>

        <Timeline>
          <TimelineContainer title="2015: Creation of an HTML Version of the CV to be printer friendly">
            <InlineList>
              <IconLegended legend="HTML5"><FontAwesomeIcon icon={faHtml5} size="3x" style={{color: "#e34c26"}} /></IconLegended>
              <IconLegended legend="CSS3"><FontAwesomeIcon icon={faCss3} size="3x" style={{color: "#264de4"}} /></IconLegended>
              <IconLegended legend="Bootstrap"><FontAwesomeIcon icon={faBootstrap} size="3x" style={{color: "#563d7c"}} /></IconLegended>
            </InlineList>
            <p>
              An HTML for the structure and the content and a CSS file for page setup, that was all.
              Creating multiple version of the document to match job offers was way more tedious than I anticipated, especially creating an english version.
            </p>
          </TimelineContainer>

          <TimelineContainer title="2016: Adding logic and interaction with AngularJS" pos="right">
            <InlineList>
              <IconLegended legend="Bootstrap"><FontAwesomeIcon icon={faBootstrap} size="3x" style={{color: "#563d7c"}} /></IconLegended>
              <IconLegended legend="Angular v1"><FontAwesomeIcon icon={faAngular}  size="3x" style={{color: "#dd1b16"}} /></IconLegended>
              <IconLegended legend="Github Pages"><FontAwesomeIcon icon={faGithub} size="3x" style={{color: "black"}} /></IconLegended>
            </InlineList>
            <p>
              The goal of this iteration was to separate the content from the structure.
              Back then Angular.js was a popular choice; and publishing it with Github&nbsp;Pages was a straitforward process.
              So I had one JSON file for each CV and an Angular App rendering each of them.
            </p>
            <a href="https://github.com/clement-casse/clement-casse.github.io/tree/e3d4bec8f0d8b95df56c89af07e47d84e4e764a6">Link to the source code</a>
          </TimelineContainer>

          <TimelineContainer title="2017: Switch to React / Webpack & D3.js">
            <InlineList>
              <IconLegended legend="React"><FontAwesomeIcon icon={faReact} size="3x" style={{color: "#61dbfb"}} /></IconLegended>
              <IconLegended legend="D3.js"><img src="https://raw.githubusercontent.com/d3/d3-logo/master/d3.svg" width="48px" /></IconLegended>
              <IconLegended legend="Github Pages"><FontAwesomeIcon icon={faGithub} size="3x" style={{color: "black"}} /></IconLegended>
            </InlineList>
            <p>
              Due to Angular API changes requirering to relearn the framework, I decided to try another framework : React.
              The approach of React was more appealing to me and a spearation based on functionnal components was game-changing.
              I also learnt D3.js for representing the skills on the CV and to integrate <em>D3</em> and <em>React</em> together was a fun exercise.
            </p>
            <a href="https://github.com/clement-casse/clement-casse.github.io/tree/f45bf6e04e9c319303e842ed5e919fb75803316d">Link to the source code</a>
          </TimelineContainer>

          <TimelineContainer title="2021: Integrating React Components into Gatsby static site generator" pos="right">
            <InlineList>
              <IconLegended legend="Gatsby.js"><img src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" height="48px" /></IconLegended>
              <IconLegended legend="TypeScript"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="48px" /></IconLegended>
              <IconLegended legend="Github Pages"><FontAwesomeIcon icon={faGithub} size="3x" style={{color: "black"}}/></IconLegended>
            </InlineList>
            <p>
              As I was satisfied with both <em>D3</em> and <em>React</em>, my experience with strongly typed language made me want to consider the <em>TypeScript</em> langugage.
              <em>Gatsby</em> static site generator was an opportuinity to try <em>GraphQL</em> and use <em>Typescript</em> while conserving most of the logic already existing in the previous iteration.
            </p>
          </TimelineContainer>
        </Timeline>

      </Container>
    </Page>
  </IndexLayout>
)
