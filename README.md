## A GraphQL learning project.

# Wich problems GraphQL solve?

- Overfetching
- Underfetching

# GraphQL Dificulties.

- Cache
- Errors

# A GraphQL query example:

```gql
query {
  users {
    id
    name
    github

    addresses {
      city
      state
      country
    }
  }
}
```
