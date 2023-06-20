import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import MatchMock from './mocks/Match.mock';
import { teamWithValidID } from './mocks/Teams.mock';
import { validUser } from './mocks/login.mock';
import SequelizeMatches from '../database/models/SequelizeMatch';
import SequelizeTeams from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration Tests /matches', () => {
  beforeEach(() => {
    sinon.restore();
  })
  describe('GET /matches', function() {
    it('It should return all matches', async function() {
      sinon.stub(SequelizeMatches, 'findAll')
        .resolves(MatchMock.sequelizeMatches as any);  
    
      const { status, body } = await chai.request(app).get('/matches');
  
      expect(status).to.be.equal(200);      
      expect(body).to.be.deep.equal(MatchMock.matches);
    });
  
    it('It should return sorted in progress matches when route query is true', async function() {
      sinon.stub(SequelizeMatches, 'findAll')
        .resolves(MatchMock.sequelizeMatches as any);  
  
      const { status, body } = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: 'true' });
     
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(MatchMock.matches);
    })
  
    it('It should return sorted finished matches when route query is false', async function() {
      sinon.stub(SequelizeMatches, 'findAll')
        .resolves(MatchMock.sequelizeMatches as any);  
  
      const { status, body } = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: 'false' });
  
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(MatchMock.matches);
    });
  });

  describe('PATCH matches/:id/finish', function() {
    it('It should return status 200 and finish message', async function() {
      sinon.stub(SequelizeMatches, 'update').resolves([1]);
      sinon.stub(SequelizeMatches, 'findByPk').resolves(MatchMock.sequelizeMatch as any);
      sinon.stub(jwt, 'verify').returns(validUser as any);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('Authorization', 'valid token');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ message: 'Finished' });
    });
  });

  describe('PATCH /matches/:id', function() {
    it('It should return status 200 and message "Updated"', async function() {
      sinon.stub(jwt, 'verify').returns(validUser as any);
      sinon.stub(SequelizeMatches, 'update').resolves([1]);
      sinon.stub(SequelizeMatches, 'findByPk')
        .resolves(MatchMock.sequelizeMatch as any);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/48')
        .send({
          homeTeamGoals: 1,
          awayTeamGoals: 1,
        })
        .set('Authorization', 'valid token');

       const message = { "message": "Updated" };      
        

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(message);
    });
    it('It should return 404(NOT FOUND) if the message does not exist', async function() {
      sinon.stub(SequelizeMatches, 'update').resolves([0]);
      sinon.stub(SequelizeMatches, 'findByPk').resolves(null);
      sinon.stub(jwt, 'verify').returns(validUser as any);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/99999')
        .send({
          homeTeamGoals: 1,
          awayTeamGoals: 1,
        })
        .set('Authorization', 'invalid token');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Match not found' });
    });
  });
})