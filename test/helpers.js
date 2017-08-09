import Joi from 'joi';
import chai from 'chai';
import joiAssert from 'joi-assert';
import supertest from 'supertest';
import td from 'testdouble';
import app from '../app';


global.app = app;
global.td = td;
global.request = supertest(app);
global.expect = chai.expect;
global.joiAssert = joiAssert;
global.Joi = Joi;
