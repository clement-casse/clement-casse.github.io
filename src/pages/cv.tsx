import * as React from 'react'
import styled from '@emotion/styled'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
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
              <div style={{ backgroundImage: 'url()' }}>
                <StyledButtonContent>English Version</StyledButtonContent>
              </div>
            </Link>
          </StyledButton>
          <StyledButton>
            <Link to="/cv/french">
              <div style={{ backgroundImage: 'url()' }}>
                <StyledButtonContent>en Français</StyledButtonContent>
              </div>
            </Link>
          </StyledButton>
        </StyledButtonBlock>

        <div>
          <p>
            for all decisions related to typography, colors and layout, I referred to{' '}
            <a href="https://colinecaillier.com/">Coline Caillier</a>.
          </p>
        </div>
      </Container>
    </Page>
  </IndexLayout>
)
