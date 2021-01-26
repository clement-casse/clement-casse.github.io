import * as React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'

interface IdentityProps {
  identity: IdentitySpec
}

export interface IdentitySpec {
  firstName: string
  lastName: string
  emailAddress: string
  address: {
    line1: string
    zipCode: string
    city: string
  }
  phoneNumber: string
  age: string
}

export const query = graphql`
  fragment IdentityInfo on CvYamlIdentity {
    firstName
    lastName
    emailAddress
    phoneNumber
    address {
      line1
      zipCode
      city
    }
    age
  }
`

const StyledAddress = styled.address`
  flex-grow: 1;
  font-family: 'Source Sans Pro', sans-serif;
  font-style: normal;
  margin: 0 0 10px;
`

const StyledName = styled.strong`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgb(0, 59, 53);
`

const Identity: React.FC<IdentityProps> = ({ identity }) => (
  <StyledAddress>
    <StyledName>
      {identity.firstName} {identity.lastName}
    </StyledName>
    <p>{identity.emailAddress}</p>
    <p>
      {identity.address.line1} <br />
      {identity.address.zipCode} {identity.address.city.toUpperCase()}
    </p>
    <p>{identity.phoneNumber}</p>
    <p>{identity.age}</p>
  </StyledAddress>
)

export default Identity
