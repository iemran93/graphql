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
