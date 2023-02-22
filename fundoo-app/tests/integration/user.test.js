import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
    before((done) => {
        const clearCollections = () => {
            for (const collection in mongoose.connection.collections) {
                mongoose.connection.collections[collection].deleteOne(() => {});
            }
        };

        const mongooseConnect = async() => {
            await mongoose.connect(process.env.DATABASE_TEST);
            clearCollections();
        };

        if (mongoose.connection.readyState === 0) {
            mongooseConnect();
        } else {
            clearCollections();
        }

        done();
    });

    //test case for Registration
    describe('Register /users', () => {
        it('should return user', (done) => {
            let userDetails = { "firstName": "Jitendra", "lastName": "Satyarathi", "email": "jitendra@gmail.com", "password": "Why5hould1te11" }

            request(app)
                .post('/api/v1/users/register')
                .send(userDetails)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(201);
                    done();
                });
        });

        it('should return invalid firstName', (done) => {
            let userDetails = { "firstName": "J", "lastName": "Satyarathi", "email": "jitendra@gmail.com", "password": "Why5hould1te11" }
            request(app)
                .post('/api/v1/users/register')
                .send(userDetails)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(500);
                    done();
                })
        })
        it('should return invalid lastName', (done) => {
            let userDetails = { "firstName": "Jitendra", "lastName": "S", "email": "jitendra@gmail.com", "password": "Why5hould1te11" }
            request(app)
                .post('/api/v1/users/register')
                .send(userDetails)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(500);
                    done();
                })
        })
        it('should return invalid email id', (done) => {
            let userDetails = { "firstName": "Jitendra", "lastName": "Satyarathi", "email": "Jitendragmail.com", "password": "Why5hould1te11" }
            request(app)
                .post('/api/v1/users/register')
                .send(userDetails)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(500);
                    done();
                })
        })
        it('should return invalid password', (done) => {
            let userDetails = { "firstName": "Jitendra", "lastName": "Satyarathi", "email": "jitendra@gmail.com", "password": "Why" }
            request(app)
                .post('/api/v1/users/register')
                .send(userDetails)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(500);
                    done();
                })
        })
    });

});