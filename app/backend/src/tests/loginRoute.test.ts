import * as sinon from 'sinon';
import * as chai from 'chai';
import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import * as bcrypt  from 'bcryptjs';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import UserModel from '../database/models/UsersModel'

chai.use(chaiHttp);

const { expect } = chai;

describe('Route Login', () => {

  describe('Route Login with correct user', () => {

    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves({
          id: 1,
          username: 'Admin',
          role: 'admin',
          email: 'admin@admin.com',
          password: 'secret_admin',
        } as UserModel);
      sinon
        .stub(fs, 'readFile')
        .resolves('super_senha');
      sinon
        .stub(jwt, 'sign')
        .resolves('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXIiOnsiaWQiOjEsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9fSwiaWF0IjoxNjUxMTU3ODk4LCJleHAiOjE2NTE3NjI2OTh9.k6yRoTvAf-UIAEKTpHVDFe_OGpI90pXCFt6HrsZFEa8');
      sinon
        .stub(bcrypt, 'compareSync')
        .returns(true)
    });

    after(()=>{
      (UserModel.findOne as sinon.SinonStub).restore();
      (fs.readFile as sinon.SinonStub).restore();
      (jwt.sign as sinon.SinonStub).restore();
      (bcrypt.compareSync as sinon.SinonStub).restore()
    })

    it('Post in route login and return status 200 with user and token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({email: 'admin@admin.com', password: 'secret_admin'})
        
      console.log(chaiHttpResponse.body)
      expect(chaiHttpResponse.status).to.be.equal(200)
    });

    it('Post in route login with incorrect email and return status 401', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({email: 'admin@admin.sim', password: 'secret_admin'})

      expect(chaiHttpResponse.status).to.be.equal(401)
    });

    it('Post in route login without email return status 400', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: 'secret_admin'})

      expect(chaiHttpResponse.status).to.be.equal(400)
    })

    it('Post in route login with inválid email return status 401', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin-admin.com', password: 'secret_admin'})

      expect(chaiHttpResponse.status).to.be.equal(401)
    })

    it('Post in route login without password return status 400', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({email: 'admin@admin.com'})

      expect(chaiHttpResponse.status).to.be.equal(400)
    })

    it('Post in route login with password under 6 characters return status 401', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({email: 'admin@admin.com', password: 'secret'})

      expect(chaiHttpResponse.status).to.be.equal(401)
    })

    it('Get in route login/validate and return status 200 with role', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set("authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXIiOnsiaWQiOjEsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9fSwiaWF0IjoxNjUxMTU3ODk4LCJleHAiOjE2NTE3NjI2OTh9.k6yRoTvAf-UIAEKTpHVDFe_OGpI90pXCFt6HrsZFEa8')


      expect(chaiHttpResponse.status).to.be.equal(200)
    })
    it('Get in route login/validate with wrong token returning status 401', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set("authorization", 'token-invalido')


      expect(chaiHttpResponse.status).to.be.equal(401)
    })

    it('Get in route login/validate without token and return status 401', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')


      expect(chaiHttpResponse.status).to.be.equal(401)
    })
  })
  describe('Route Login with incorrect User', () => {

    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves();
      sinon
        .stub(fs, 'readFile')
        .resolves('super_senha');
      sinon
        .stub(jwt, 'sign')
        .resolves('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXIiOnsiaWQiOjEsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9fSwiaWF0IjoxNjUxMTU3ODk4LCJleHAiOjE2NTE3NjI2OTh9.k6yRoTvAf-UIAEKTpHVDFe_OGpI90pXCFt6HrsZFEa8');
    });

    after(()=>{
      (UserModel.findOne as sinon.SinonStub).restore();
      (fs.readFile as sinon.SinonStub).restore();
      (jwt.sign as sinon.SinonStub).restore();
    })

    it('Post in route login with incorrect User and return status 401', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({email: 'admin@invalid.com', password: 'secret_admin'})
        
      expect(chaiHttpResponse.status).to.be.equal(401)
    });
  })
  describe('Route Login with incorrect password', () => {

    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves({
          id: 1,
          username: 'Admin',
          role: 'admin',
          email: 'admin@admin.com',
          password: 'secret_admin',
        } as UserModel);
      sinon
        .stub(bcrypt, 'compareSync')
        .returns(false)
    });

    after(()=>{
      (UserModel.findOne as sinon.SinonStub).restore();
      (bcrypt.compareSync as sinon.SinonStub).restore()
    })

    it('Post in route login with incorrect password and return status 401', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({email: 'admin@admin.com', password: 'secret_admin'})
        
      expect(chaiHttpResponse.status).to.be.equal(401)
    });
  })

});