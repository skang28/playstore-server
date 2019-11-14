const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /playstore', () => {
    it('should return an array of apps', () => {
        return supertest(app)
            .get('/playstore')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const book = res.body[0];
                expect(book).to.include.all.keys(
                    'App','Rating','Genres','Category'
                );
            });
    })

    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/playstore')
            .query({sort: 'MISTAKE'})
            .expect(400, 'sort must be one of rating or app');
    });
});

