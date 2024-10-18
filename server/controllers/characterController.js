const { UserInputError } = require('@apollo/server');
const { Hero, Build } = require('../models');

const resolvers = {
  Query: {
    heroes: async () => await Hero.find(),
    hero: async (_, { id }) => await Hero.findById(id),
    userBuilds: async () => await Build.find().populate('hero'), // Fetch all builds with associated heroes
  },
  Mutation: {
    addHero: async (_, { name, level, health, attack, defense, image, comments }) => {
      const newHero = new Hero({ name, level, health, attack, defense, image, comments });
      return await newHero.save();
    },
    updateHero: async (_, { id, name, level, health, attack, defense, image, comments }) => {
      const hero = await Hero.findById(id);
      if (!hero) throw new UserInputError('Hero not found');
      Object.assign(hero, { name, level, health, attack, defense, image, comments });
      return await hero.save();
    },
    deleteHero: async (_, { id }) => {
      const hero = await Hero.findById(id);
      if (!hero) throw new UserInputError('Hero not found');
      await hero.remove();
      return hero;
    },
    addBuild: async (_, { build }) => {
      const { heroId, buildName, level, health, attack, defense } = build;
      const hero = await Hero.findById(heroId);
      if (!hero) throw new UserInputError('Hero not found');

      const newBuild = new Build({ heroId, buildName, level, health, attack, defense });
      return await newBuild.save();
    },
    updateBuild: async (_, { id, build }) => {
      const existingBuild = await Build.findById(id);
      if (!existingBuild) throw new UserInputError('Build not found');

      Object.assign(existingBuild, build);
      return await existingBuild.save();
    },
    deleteBuild: async (_, { id }) => {
      const build = await Build.findById(id);
 if (!build) throw new UserInputError('Build not found');
      await build.remove();
      return build;
    },
  },
};

module.exports = resolvers;