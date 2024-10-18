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

  type Build {
    id: ID!
    hero: Hero!
    buildName: String!
    level: Int!
    health: Int!
    attack: Int!
    defense: Int!
  }

  input BuildInput {
    heroId: ID!
    buildName: String!
    level: Int!
    health: Int!
    attack: Int!
    defense: Int!
  }

  type Query {
    heroes: [Hero]
    hero(id: ID!): Hero
    userBuilds: [Build]
  }

  type Mutation {
    addHero(name: String!, level: Int!, health: Int!, attack: Int!, defense: Int!, image: String, comments: [String]): Hero
    updateHero(id: ID!, name: String, level: Int, health: Int, attack: Int, defense: Int, image: String, comments: [String]): Hero
    deleteHero(id: ID!): Hero
    addBuild(build: BuildInput!): Build
    updateBuild(id: ID!, build: BuildInput!): Build
    deleteBuild(id: ID!): Build
  }
`;

module.exports = typeDefs;