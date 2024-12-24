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
    transaction(
      order_by: { createdAt: asc }
      where: {
        _and: [
          { type: { _eq: "xp" } }
          { object: { type: { _eq: "project" } } }
        ]
      }
    ) {
      id
      amount
      path
      object {
        name
      }
    }
  }
`

export const getSkills = gql`
  {
    transaction_type {
      type
      transactions_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`
