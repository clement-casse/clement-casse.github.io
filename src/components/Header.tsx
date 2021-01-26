import * as React from 'react'
import styled from '@emotion/styled'
import { transparentize, darken } from 'polished'
import { Link } from 'gatsby'
import GithubCorner from 'react-github-corner'

import { heights, dimensions, colors } from '../styles/variables'
import Container from './Container'

const StyledHeader = styled.header`
  height: ${heights.header}px;
  padding: 0 ${dimensions.containerPadding}rem;
  background-color: ${darken(0.1, colors.brand)};
  color: ${transparentize(0.5, colors.white)};
  font-family: Abel, monospace;
`

const HeaderInner = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`

const HomepageLink = styled(Link)`
  color: ${colors.white};
  font-size: 1.8rem;
  font-weight: 900;
  text-transform: capitalize;
  width: 310px;

  &:hover,
  &:focus {
    text-transform: lowercase;
    text-decoration: underline;
  }

  & > .hidden {
    color: rgba(0, 0, 0, 0);
  }

  &:hover > .hidden,
  &:focus > .hidden {
    color: ${colors.white};
  }
`

const MainMenuLink = styled(Link)`
  color: ${colors.white};
  font-size: 1.3rem;
  font-weight: 600;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

interface HeaderProps {
  title: string
}

const fragmentTitle = (stringUrl: string) => {
  const domainsStructure = stringUrl.split('.')
  const firstSubDomain = domainsStructure[0]
  const parentDomains = domainsStructure.slice(1)

  return (
    <>
      <span>{firstSubDomain}</span>
      <span className="hidden">.{parentDomains.join('.')}</span>
    </>
  )
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <StyledHeader>
    <HeaderInner>
      <HomepageLink to="/">{fragmentTitle(title)}</HomepageLink>
      <ul style={{ listStyle: 'none', float: 'right', margin: 0 }}>
        <li style={{ display: `inline-block`, marginRight: `1rem`, paddingRight: '70px' }}>
          <MainMenuLink to="/cv/">CV</MainMenuLink>
        </li>
      </ul>
    </HeaderInner>
    <GithubCorner
      href="https://github.com/clement-casse/clement-casse.github.io"
      octoColor={darken(0.1, colors.brand)}
      bannerColor={`${colors.white}`}
      size={heights.header}
    />
  </StyledHeader>
)

export default Header
