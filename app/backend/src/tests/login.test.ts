import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { bodyInvalidEmail, bodyInvalidPassword, bodyWithoutEmail, bodyWithoutPassword, userMock, validBody, validBodyWrongPassword } from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST Login', () => {

  beforeEach(() => {
    sinon.restore();
  })
  describe('POST /login', () => { 
    it('It should return a token with login successful', async () => {
      const userInstance = SequelizeUser.build(userMock);
      sinon.stub(SequelizeUser, 'findOne').resolves(userInstance);

      const response = await chai.request(app).post('/login').send(validBody)
      // console.log(response);
      
      expect(response.status).to.be.eq(200);
      expect(response.body).to.have.key('token');
    });
    it('It should return a error message when email is missing', async () => {
      const response = await chai.request(app).post('/login').send(bodyWithoutEmail)

      expect(response.status).to.be.eq(400);
      expect(response.body).to.have.key('message');
    })
    it('It should return a error message when password is missing', async () => {
      const response = await chai.request(app).post('/login').send(bodyWithoutPassword)

      expect(response.status).to.be.eq(400);
      expect(response.body).to.have.key('message');
    })
    it('It should return a error message when email is invalid', async () => {
      const response = await chai.request(app).post('/login').send(bodyInvalidEmail)

      expect(response.status).to.be.eq(401);
      expect(response.body).to.have.key('message');
    })
    it('It should return a error message when password is invalid', async () => {
      const response = await chai.request(app).post('/login').send(bodyInvalidPassword)

      expect(response.status).to.be.eq(401);
      expect(response.body).to.have.key('message');
    })
    it('It should return a error message when users email is not found', async () => {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const response = await chai.request(app).post('/login').send(validBody)

      expect(response.status).to.be.eq(401);
      expect(response.body).to.have.key('message');
    })
    it('It should return a error message when users password is wrong', async () => {
      const userInstance = SequelizeUser.build(userMock);
      sinon.stub(SequelizeUser, 'findOne').resolves(userInstance);

      const response = await chai.request(app).post('/login').send(validBodyWrongPassword)

      expect(response.status).to.be.eq(401);
      expect(response.body).to.have.key('message');
    })
   })
  describe('GET /login/role', () => {
    it('It should return the user role using a valid token', async function () {

      const parameters = validBody;
      const validUser = SequelizeUser.build(userMock);
      sinon.stub(SequelizeUser, 'findOne').resolves(validUser);
      const response = await chai.request(app).post('/login').send(parameters);

      const { token } = response.body

      const { body, status } = await chai.request(app).get('/login/role').set('authorization', token);

      expect(status).to.be.equal(200)
      expect(body).to.deep.equal({ role: validUser.role });
    })
    it('It should return a error message with 401 status when the token is missing', async function () {
      const { body, status } = await chai.request(app).get('/login/role').set('authorization', '');

      expect(status).to.be.equal(401)
      expect(body.message).to.equal('Token not found');
    })
    it('It should return a error message with 401 status when the token is invalid', async function () {
      const { body, status } = await chai.request(app).get('/login/role').set('authorization', 'fakeToken');

      expect(status).to.be.equal(401)
      expect(body.message).to.equal('Token must be a valid token');
    })
  })
});