const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Hero {
    id: ID!
    name: String!
    level: Int!
    health: Int!
    attack: Int!
    defense: Int!
    image: String
    comments: [String]
  }

  type Query {
    heroes: [Hero]
    hero(id: ID!): Hero
  }

  type Mutation {
    addHero(name: String!, level: Int!, health: Int!, attack: Int!, defense: Int!, image: String, comments: [String]): Hero
    updateHero(id: ID!, name: String, level: Int, health: Int, attack: Int, defense: Int, image: String, comments: [String]): Hero
    deleteHero(id: ID!): Hero
  }
`;

module.exports = typeDefs;