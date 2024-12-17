import { gql } from "@apollo/client"

export const getUserId = gql`
  {
    user {
      id
    }
  }
`
