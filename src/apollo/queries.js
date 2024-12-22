import { gql } from "@apollo/client"

export const getUser = gql`
  {
    user {
      id
      login
      attrs
      auditRatio
      xps(order_by: { amount: desc }) {
        amount
        originEventId
        event {
          path
        }
      }
    }
  }
`

export const getProgress = gql`
  {
    progress(order_by: { createdAt: desc }) {
      grade
      updatedAt
      path
    }
  }
`

export const getProgressTime = gql`
  {
    transaction(order_by: { amount: asc }, where: { type: { _eq: "xp" } }) {
      id
      amount
      path
      object {
        name
      }
    }
  }
`
