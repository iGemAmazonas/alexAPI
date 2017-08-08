import chai from 'chai';
import td from 'testdouble';
import app from '../../app';


global.expect = chai.expect;
global.td = td;
global.app = app;
