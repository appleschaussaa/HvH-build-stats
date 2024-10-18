const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const typeDefs = require('./db/heroSchema');
const resolvers = require('./controllers/characterController');
const populateDatabase = require('./scripts/populateDatabase');
require('dotenv').config();

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  try {
    await server.start();
    app.use('/graphql', express.json(), expressMiddleware(server));

    const PORT = process.env.PORT || 8000;
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      console.error('MONGODB_URI is not defined in the environment variables.');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);

    console.log('Connected to MongoDB');

    await populateDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

startServer();