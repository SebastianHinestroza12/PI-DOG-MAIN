const session = require('supertest-session');
const app = require('../../src/app.js');
const { Raza, conn } = require('../../src/db.js');
const { expect } = require('chai');

const agent = session(app);
const dog = {
  name: 'Pug',
  heightMin: 25,
  heightMax: 30,
  weightMin: 6,
  weightMax: 8
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Raza.sync({ force: true })
    .then(() => Raza.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});