import * as React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface PlaceSpec {
  name: string
  city: string
  area: string
  country?: string
}

interface PlaceProps {
  place: PlaceSpec
}

interface DatesProps {
  start?: string
  end?: string
}

interface MissionSpec {
  desc: string
}

interface ExperienceProps {
  title: string
  start?: string
  end?: string
  place?: PlaceSpec
  missions?: MissionSpec[]
  topics?: string[]
  notes?: string[]
}

interface TopicsProps {
  topics: string[]
}

interface MissionsProps {
  missions: string[]
}

interface NotesProps {
  notes: string[]
}

const Dates: React.FC<DatesProps> = ({ start, end }) => {
  const startDate = start ? new Date(start) : undefined
  const endDate = end ? new Date(end) : undefined

  if (!startDate && endDate) return <strong>{endDate.getUTCFullYear()}</strong>
  else if (startDate && !endDate)
    return (
      <strong>
        {startDate.getUTCFullYear()} - <FontAwesomeIcon icon="map-marker-alt" size="lg" />
      </strong>
    )
  else if (startDate && endDate)
    return (
      <strong>
        {startDate.getUTCFullYear()} - {endDate.getUTCFullYear()}
      </strong>
    )
  else return null
}

const Place: React.FC<PlaceProps> = ({ place }) => (
  <em className="place">
    {place.name}
    <br />
    {[place.city, place.area].join(', ')}
  </em>
)

const Topics: React.FC<TopicsProps> = ({ topics }) => <p>{topics.join(', ')}</p>

const StyledMissions = styled.ul`
  list-style-type: none;
  padding: 0;
`

const Missions: React.FC<MissionsProps> = ({ missions }) => (
  <StyledMissions>
    {missions?.map((mission, index) => (
      <li key={index}>
        <FontAwesomeIcon icon="check-square" fixedWidth /> {mission}
      </li>
    ))}
  </StyledMissions>
)

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

const NoteContent = styled.ul`
  flex-grow: 11;
  flex-basis: 0;
  list-style-type: none;
  padding: 0;
  font-weight: 300;
`

const Notes: React.FC<NotesProps> = ({ notes }) => (
  <StyledNoteBox>
    <NoteIconWrapper>
      <FontAwesomeIcon icon="info-circle" fixedWidth />
    </NoteIconWrapper>
    <NoteContent>
      {notes.map((n, i) => (
        <li key={i}>— {n}</li>
      ))}
    </NoteContent>
  </StyledNoteBox>
)

const StyledExperience = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: baseline;
`

const InfoColumn = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  text-align: right;
  border-right: solid 5px rgb(0, 99, 90);
  padding-right: 10px;
`

const DetailsColumn = styled.div`
  flex-grow: 3;
  flex-basis: 0;
  padding-left: 10px;
`

const Experience: React.FC<ExperienceProps> = props => (
  <StyledExperience>
    <InfoColumn>
      <Dates start={props.start} end={props.end} />
      <br />
      {props.place ? <Place place={props.place} /> : null}
    </InfoColumn>
    <DetailsColumn>
      <p>
        <strong>{props.title}</strong>
      </p>
      {props.topics ? <Topics topics={props.topics} /> : null}
      {props.missions ? <Missions missions={props.missions?.map(m => m.desc)} /> : null}
      {props.notes ? <Notes notes={props.notes} /> : null}
    </DetailsColumn>
  </StyledExperience>
)

export default Experience
