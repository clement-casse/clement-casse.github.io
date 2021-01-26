import * as React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface NoteProps {
  content: string
}

const StyledNoteBox = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
`

const NoteIconWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  padding-right: 5px;
`

const NoteContent = styled.div`
  flex-grow: 11;
  flex-basis: 0;
  font-weight: 300;
`

const Note: React.FC<NoteProps> = ({ content }) => (
  <StyledNoteBox>
    <NoteIconWrapper>
      <FontAwesomeIcon icon="info-circle" fixedWidth />
    </NoteIconWrapper>
    <NoteContent>{content}</NoteContent>
  </StyledNoteBox>
)

export default Note
