const heroes = require('../db/heroData');

const resolvers = {
  Query: {
    heroes: () => heroes,
    hero: (_, { id }) => heroes.find(hero => hero.id === id),
  },
  Mutation: {
    addHero: (_, { name, level, health, attack, defense, image, comments }) => {
      const newHero = {
        id: String(heroes.length + 1),
        name,
        level,
        health,
        attack,
        defense,
        image,
        comments,
      };
      heroes.push(newHero);
      return newHero;
    },
    updateHero: (_, { id, name, level, health, attack, defense, image, comments }) => {
      const heroIndex = heroes.findIndex(hero => hero.id === id);
      if (heroIndex === -1) throw new Error('Hero not found');
      const updatedHero = {
        ...heroes[heroIndex],
        name: name !== undefined ? name : heroes[heroIndex].name,
        level: level !== undefined ? level : heroes[heroIndex].level,
        health: health !== undefined ? health : heroes[heroIndex].health,
        attack: attack !== undefined ? attack : heroes[heroIndex].attack,
        defense: defense !== undefined ? defense : heroes[heroIndex].defense,
        image: image !== undefined ? image : heroes[heroIndex].image,
        comments: comments !== undefined ? comments : heroes[heroIndex].comments,
      };
      heroes[heroIndex] = updatedHero;
      return updatedHero;
    },
    deleteHero: (_, { id }) => {
      const heroIndex = heroes.findIndex(hero => hero.id === id);
      if (heroIndex === -1) throw new Error('Hero not found');
      const deletedHero = heroes.splice(heroIndex, 1);
      return deletedHero[0];
    },
  },
};

module.exports = resolvers;