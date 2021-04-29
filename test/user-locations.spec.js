const knex = require('knex');
const app = require('../src/app');
const jwt = require('jsonwebtoken');


function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.email,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}


describe('Ratings API:', function () {
  let db;
  let testUsers = [{
    "id": 1,
    "email": "email@email.com",
    "password": "$2a$12$puiYyy7dAMOBuL.vMwp8kephkPWl8puUkGaY40JYvJHNClFWLnZ2G"
  },
  {
    "id": 2,
    "email": "email1@email.com",
    "password": "$2a$12$puiYyy7dAMOBuL.vMwp8kephkPWl8puUkGaY40JYvJHNClFWLnZ2G"
  }];
  let testLocations = [{
    "id": 1,
    "user_id": 1,
    "image": "",
    "title": "title",
    "content": "content",
    "keyword": "place"
  }];
  let testUserLocations = [{
    "id": 1,
    "user_id": 1,
    "location_id": 1
  }];

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  before('cleanup', () => db.raw('TRUNCATE TABLE users, locations, user_locations RESTART IDENTITY CASCADE;'));

  afterEach('cleanup', () => db.raw('TRUNCATE TABLE users, locations, user_locations RESTART IDENTITY CASCADE;'));

  after('disconnect from the database', () => db.destroy());


  beforeEach('insert some user locations', async () => {
    await db('users').insert(testUsers);
    await db('locations').insert(testLocations);
    await db('user_locations').insert(testUserLocations);

    return db.transaction(async trx => {
      await trx.raw(
        `SELECT setval('users_id_seq', ?)`,
        [testUsers[testUsers.length - 1].id],
      );
      await trx.raw(
        `SELECT setval('locations_id_seq', ?)`,
        [testLocations[testLocations.length - 1].id],
      );
      await trx.raw(
        `SELECT setval('user_locations_id_seq', ?)`,
        [testUserLocations[testUserLocations.length - 1].id],
      );

    });
  });


  describe('GET all user_locations', () => {
    //get
    it('should respond to GET `/api/userloc` with an array of user_locations and status 200', function () {
      return supertest(app)
        .get('/api/userloc/user')
        .set('Authorization', makeAuthHeader(testUsers[0]))
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(testUserLocations.length);
          res.body.forEach((item) => {
            expect(item).to.be.a('object');
            expect(item).to.include.keys('content', 'id', 'image', 'is_public', 'keyword', 'location_id', 'title', 'user_id');
          });
        });
    });

  });

  // post 
  it('should create and return a new user_location when provided valid data', function () {
    const newItem = {
      "id": 1,
      "user_id": 1,
      "location_id": 1
    };

    return supertest(app)
      .post(`/api/userloc/${newItem.user_id}`)
      .set('Authorization', makeAuthHeader(testUsers[0]))
      .send(newItem)
      .expect(201)
      .expect(res => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('user_id', 'image', 'title', 'content', 'keyword');
        expect(res.body.title).to.equal(newItem.title);
      });
  });

});