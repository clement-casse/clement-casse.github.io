import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>Welcome to my little corner on the Internet</h1>
        <p>
          I am <em>Clément Cassé</em>, and welcome to this yet-another-dev-portfolio website. My favorite topics are: Distributed System,
          Observability, Software Architecture, Graphs, ...
        </p>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
