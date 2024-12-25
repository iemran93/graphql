import { gql } from "@apollo/client"

export const getUser = gql`
  {
    user {
      id
      login
      attrs
      auditRatio
      xps(
        order_by: { amount: desc }
        where: { event: { object: { type: { _in: ["module", "piscine"] } } } }
      ) {
        amount
        originEventId
        event {
          path
          object {
            type
          }
        }
      }
    }
  }
`

export const getXps = gql`
  {
    transaction(
      where: {
        _and: [
          { type: { _eq: "xp" } }
          { event: { object: { type: { _in: ["module", "piscine"] } } } }
        ]
      }
    ) {
      amount
      event {
        object {
          name
          type
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
