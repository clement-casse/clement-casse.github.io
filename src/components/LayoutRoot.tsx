import * as React from 'react'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import normalize from '../styles/normalize'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckSquare,
  faInfoCircle,
  faMapMarkerAlt,
  faStickyNote,
  faPrint,
  faArrowRight,
  faCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faInfoCircle, faMapMarkerAlt, faStickyNote, faPrint, faArrowRight, faCircle)

const StyledLayoutRoot = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: 'rgb(230, 230, 230)';
`

interface LayoutRootProps {
  className?: string
}

const LayoutRoot: React.FC<LayoutRootProps> = ({ children, className }) => (
  <>
    <Global styles={() => css(normalize)} />
    <StyledLayoutRoot className={className}>{children}</StyledLayoutRoot>
  </>
)

export default LayoutRoot
