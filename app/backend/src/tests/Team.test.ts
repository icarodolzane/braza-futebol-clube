import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam'

// @ts-ignore
import chaiHttp = require('chai-http');
import { teams, teamWithValidID }  from './mocks/Teams.mock';
chai.use(chaiHttp);

const { expect } = chai;

describe('Team test', () => {
  afterEach(() => {
    sinon.restore();
  })
  describe('GET /teams', () => {
    it('return all teams', async () => {
      sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any)
      const { status, body } = await chai.request(app).
      get('/teams');
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(teams);
    });
  });
  describe('GET /teams/:id', () => {
    it('It should return a message when the team is not found', async () => {
      sinon.stub(SequelizeTeam, 'findByPk').resolves(null)     
      const { status, body } = await chai.request(app).get('/teams/:99');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Team not found'});
    });
    it('It returns the team correctly when the team is found', async () => {
      const teamFound = SequelizeTeam.build(teamWithValidID);
      sinon.stub(SequelizeTeam, 'findByPk').resolves(teamFound)
      const invalidID = 99;
      const { status, body } = await chai.request(app).get(`/teams/:${invalidID}`);

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(teamWithValidID);
    });
  });
});