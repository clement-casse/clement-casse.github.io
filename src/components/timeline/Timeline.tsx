/* Inspired by https://www.w3schools.com/howto/howto_css_timeline.asp */
import * as React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../styles/variables'


export interface TimelineContainerProps {
  title: string
  pos?: string
}

export const Timeline = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;

  &::after {
    content: '';
    position: absolute;
    width: 6px;
    background-color: ${colors.brand};
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
  }
`

const BaseTimelineContainer = styled.div`
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;

  &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    right: -13px;
    background-color: white;
    border: 4px solid ${colors.brand};
    top: 20px;
    border-radius: 50%;
    z-index: 1;
  }
`

const RightTimelineContainer = styled(BaseTimelineContainer)`
  left: 50%;

  &::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 22px;
    width: 0;
    z-index: 1;
    left: 30px;
    border: medium solid ${colors.brand};
    border-width: 10px 10px 10px 0;
    border-color: transparent ${colors.brand} transparent transparent;
  }

  &::after {
    left: -12px;
  }
`

const LeftTimelineContainer = styled(BaseTimelineContainer)`
  left: 0;

  &::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 22px;
    width: 0;
    z-index: 1;
    right: 30px;
    border: medium solid ${colors.brand};
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent ${colors.brand};
  }
`

const TimelineContainerContent = styled.div`
  padding: 20px 30px;
  background-color: white;
  position: relative;
  border: 1px solid ${colors.brand};
  border-radius: 6px;
`


const ContentTitle = styled.strong`
`


export const TimelineContainer: React.FC<TimelineContainerProps> = ({title, pos, children}) => {
  if (pos == "right") {
    return (
      <RightTimelineContainer>
        <TimelineContainerContent>
          <p>
            <ContentTitle>{title}</ContentTitle>
          </p>
          {children}
        </TimelineContainerContent>
      </RightTimelineContainer>
    )
  } else {
    return (
      <LeftTimelineContainer>
        <TimelineContainerContent>
          <p>
            <ContentTitle>{title}</ContentTitle>
          </p>
          {children}
        </TimelineContainerContent>
      </LeftTimelineContainer>
    )
  }
}
