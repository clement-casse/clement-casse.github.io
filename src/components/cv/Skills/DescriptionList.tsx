import * as React from 'react'
import styled from '@emotion/styled'

interface DescriptionListProps {
  skills: {
    name: string
    desc?: string
  }[]
}

const StyledDescriptionList = styled.dl`
  margin-top: 0;
  margin-bottom: 10px;
  width: 100%;
`

const Line = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  justify-content: flex-start;
`

const Term = styled.dt`
  width: 30%;
  font-weight: 700;
  text-align: right;
  margin-right: 10px;
`

const Definition = styled.dd`
  flex: 3 1;
  margin-left: 10px;
`

const DescriptionList: React.FC<DescriptionListProps> = ({ skills }) => (
  <StyledDescriptionList>
    {skills.map(s => (
      <Line key={s.name}>
        <Term>{s.name}</Term>
        <Definition>{s.desc}</Definition>
      </Line>
    ))}
  </StyledDescriptionList>
)

export default DescriptionList
