import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam'

// @ts-ignore
import chaiHttp = require('chai-http');
import teams  from './mocks/Teams.mock';
chai.use(chaiHttp);

const { expect } = chai;

describe('Team test', () => {
  describe('GET /teams', () => {
    it('return all teams', async () => {
      sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any)

      const { status, body } = await chai.request(app).get('/teams');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(teams);
    });
  });
});