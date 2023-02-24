import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
    var token;
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
            let userDetails = { "firstName": "Jitendra", "lastName": "Satyarathi", "email": "jitendra123@gmail.com", "password": "Why5hould1te11" }

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
        it('should return invalid registration email id', (done) => {
            let userDetails = { "firstName": "Jitendra", "lastName": "Satyarathi", "email": "Jitendraaaagmail.com", "password": "Why5hould1te11" }
            request(app)
                .post('/api/v1/users/register')
                .send(userDetails)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(500);
                    done();
                })
        })
        it('should return invalid registration password', (done) => {
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

    //Test case for valid user login

    describe('User Login', () => {
        it('should return valid login', (done) => {
            let userDetails = { "email": "jitendra123@gmail.com", "password": "Why5hould1te11" }
            request(app)
                .post('/api/v1/users/login')
                .send(userDetails)
                .end((err, res) => {
                    token = res.body.data.token;
                    console.log("token is", token);
                    expect(res.statusCode).to.be.equal(201);
                    done();
                })
        })
        it('should return invalid login email Id', (done) => {
            let userDetails = { "email": "jitenbfds@gmail.com", "password": "Why5hould1te11" }
            request(app)
                .post('/api/v1/users/login')
                .send(userDetails)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    done();
                })
        })
        it('should return invalid login password', (done) => {
            let userDetails = { "email": "jitendra@gmail.com", "password": "" }
            request(app)
                .post('/api/v1/users/login')
                .send(userDetails)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    done();
                })
        })
    })

    // Test case for creating note
    var id;
    describe('Create Note', () => {
        let createNote = {
            "title": "Health checkup",
            "description": "Go to clinic",
        }
        it('note created sucessfully', (done) => {
            request(app)
                .post('/api/v1/notes/create')
                .set('Authorization', 'Bearer ' + token)
                .send(createNote)
                .end((err, res) => {
                    id = res.body.data._id;
                    console.log("get token", token);
                    expect(res.statusCode).to.be.equal(201);
                    done();
                });
        });

        //Test case for Validating title
        it('Must provide title', (done) => {
            let createNote = {
                "title": "",
                "description": "Go to clinic"
            }
            request(app)
                .post('/api/v1/notes/create')
                .set('Authorization', 'Bearer ' + token)
                .send(createNote)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(500);
                    done();
                });
        });

        //Test case for Validating description
        it('Must provide description', (done) => {
            let createNote = {
                "title": "Health checkup",
                "description": ""
            }
            request(app)
                .post('/api/v1/notes/create')
                .set('Authorization', 'Bearer ' + token)
                .send(createNote)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(500);
                    done();
                });
        });

        //Test case for getting All note
        it('All note of User', (done) => {
            request(app)
                .get('/api/v1/notes/get')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });

        //Test case for getting note by id
        it('get note of single User', (done) => {
            request(app)
                .get(`/api/v1/notes/${id}`)
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });

        //Test case for updating note by id
        it('Update note of single User', (done) => {
            let updateNote = {
                "title": "Health checkup",
                "description": "Cancle"
            }
            request(app)
                .get(`/api/v1/notes/${id}`)
                .set('Authorization', 'Bearer ' + token)
                .send(updateNote)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });

        //Test case for archiving note by id
        it('Archieve note of single noteId', (done) => {
            let updateNote = {
                "title": "Health checkup",
                "description": "Cancle",
            }
            request(app)
                .put(`/api/v1/notes/archive/${id}`)
                .set('Authorization', 'Bearer ' + token)
                .send(updateNote)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(202);
                    done();
                });
        });

        //Test case for trashing note by id
        it('Trash note of single noteid', (done) => {
            let updateNote = {
                "title": "Health checkup",
                "description": "Cancle",
            }
            request(app)
                .put(`/api/v1/notes/trash/${id}`)
                .set('Authorization', 'Bearer ' + token)
                .send(updateNote)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(202);
                    done();
                });
        });

        //Test case for deleting note by id
        it('Delete note by Id', (done) => {
            request(app)
                .delete(`/api/v1/notes/${id}`)
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });


    });
});