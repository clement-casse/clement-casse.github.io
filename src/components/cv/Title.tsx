import * as React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { colors } from '../../styles/variables'

export interface TitleProps {
  title: string
  subTitle?: string
}

export const query = graphql`
  fragment CvTitle on CvYamlHeader {
    title
    subTitle
  }
`

const StyledHeader = styled.div`
  text-align: right;
  border-right: solid 5px ${colors.brand};
  padding-top: 0;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
`

const StyledCVh1 = styled.h1`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 20px;
  color: rgb(0, 59, 53);
  letter-spacing: 1px;
`

const StyledCVSubtitle = styled.p`
  font-size: 16px;
  font-weight: 300;
`

const Title: React.FC<TitleProps> = ({ title, subTitle }) => (
  <StyledHeader>
    <StyledCVh1>{title}</StyledCVh1>
    <StyledCVSubtitle>{subTitle}</StyledCVSubtitle>
  </StyledHeader>
)

export default Title
