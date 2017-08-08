import Joi from 'joi';
import chai from 'chai';
import joiAssert from 'joi-assert';
import supertest from 'supertest';
import app from '../../app';


global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.joiAssert = joiAssert;
global.Joi = Joi;
