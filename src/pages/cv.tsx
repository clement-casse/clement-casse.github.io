import * as React from 'react'
import styled from '@emotion/styled'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import { Timeline, TimelineContainer } from '../components/timeline/Timeline'
import { Link } from 'gatsby'

const StyledButtonBlock = styled.div`
  display: flex;
  width: 100%;
  font-family: 'Abel', monospace;
  font-size: 25px;
  border: 2px solid rgba(0, 104, 75, 1);
  border-radius: 6px;
  margin-top: 50px;
  margin-bottom: 40px;
`

const StyledButton = styled.div`
  flex: 1;

  &:not(:last-of-type) {
    border-right: 2px solid rgba(0, 104, 75, 1);
  }
`

const StyledButtonContent = styled.p`
  height: 120px;
  line-height: 120px;
  text-align: center;
`

export default () => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>View my CV</h1>

        <p>The CV has been designed to be ready-to-print HTML pages and is declined in two versions:</p>

        <StyledButtonBlock>
          <StyledButton>
            <Link to="/cv/english">
              <StyledButtonContent>in English 🇬🇧</StyledButtonContent>
            </Link>
          </StyledButton>
          <StyledButton>
            <Link to="/cv/french">
              <StyledButtonContent>en Français 🇫🇷</StyledButtonContent>
            </Link>
          </StyledButton>
        </StyledButtonBlock>

        <p>
          In order to have a nice looking rendering for the CV, I followed advices from{' '}
          <a href="https://colinecaillier.com/">Coline Caillier</a>.
        </p>

        <h2>How it is made and why?</h2>
        <h3>Goals and Non-Goals</h3>
        <p>
          I use this page and this website more generally to create my CV.
          I decided to pick up frameworks, libraries and technologies as I wanted to learn them, as a result, the solution
        </p>

        <h3>Background</h3>
        <p>
          <strong>At the beginning of this website, back in 2015, there was simply a HTML file.</strong>{' '}
          It was not public, not even served by any web server, just a working document whose goal was to rendered a printer-friendly CV.
          The initial goal was using raw HTML and CSS to express both the structure and the page setup of this very important document
          when school is finished, the CV.
          But, as time flew, this simple side-project has grown up to become a project aiming to showcase some skills I accumulated
          over the working experiences I had.
          However I am not a Front-End Developper, I maintain this project and learn new Front-End technologies as a hobbie.
          My main area of interest remains on Cloud-Computing, Distributed Systems, Monitoring & DevOps.
        </p>
        <p>

        </p>

        <h3>The Chronology</h3>

        <Timeline>

          <TimelineContainer title="2015: Creation of an HTML Version of the CV to be printer friendly">
            An HTML for the structure and the content and a CSS file for page setup, that was all.
            Creating multiple version of the document to match job offers was way more tedious than I anticipated, especially creating an english version.
          </TimelineContainer>

          <TimelineContainer title="2016: Adding logic and interaction with AngularJS" pos="right">
            Making the CV more interactive with Javascript and Angular.js v1 to be served by GitHub&nbsp;Pages.{' '}
            <a href="https://github.com/clement-casse/clement-casse.github.io/tree/e3d4bec8f0d8b95df56c89af07e47d84e4e764a6">Link to the source code</a>
          </TimelineContainer>

          <TimelineContainer title="2017: Switch to React / Webpack & D3.js">
            Due to Angular API changes requirering to relearn the framework, I decided to try another framework : React.
            Indeed I found the approach of React made on functionnal components clearer to maintain and requiring less knowledge of the framework.
            It was also a pretext to try a new tool and doing the same coding exercice with different building blocks.{' '}
            <a href="https://github.com/clement-casse/clement-casse.github.io/tree/f45bf6e04e9c319303e842ed5e919fb75803316d">Link to the source code</a>
          </TimelineContainer>

          <TimelineContainer title="2021: Integrating React Components into Gatsby static site generator" pos="right">
            After using Scala for many functional programing during my PhD I decided to give a chance to Typescript in order to retrieve find the confort
            of static typing for frontend.
            I also decided to use Gatsby as static site generator, it was an opportuinity to try GraphQL as it is the way Gatsby handles data.
            It allowed me decoupling components in a clearer way to keep the structure quite simple.
          </TimelineContainer>

        </Timeline>

      </Container>
    </Page>
  </IndexLayout>
)
