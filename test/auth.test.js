import 'dotenv/config';
import { describe } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import app from '../config/express.js';

describe('Auth API', () => {
    describe('Basic flow', () => {
        const phone_number = '0' + Math.floor(Math.random() * 1000000000).toString();
        const email = `test-${Math.random().toString(36).substring(2, 15)}@voucher.blog`;
        const password = 'password';
        const newPassword = 'newpassword';

        it('should register, login, change password, get me using email', async () => {
            const registerRes = await request(app).post('/auth/register').send({ email, password });
            expect(registerRes.status).to.equal(201);
            expect(registerRes.body).to.have.property('token');
            const loginRes = await request(app).post('/auth/login').send({ email, password });
            expect(loginRes.status).to.equal(200);
            expect(loginRes.body).to.have.property('token');
            const changePasswordRes = await request(app)
                .patch('/auth/change-password')
                .send({ oldPassword: password, newPassword })
                .set('Authorization', `Bearer ${loginRes.body.token}`);
            expect(changePasswordRes.status).to.equal(200);
            const reloginRes = await request(app).post('/auth/login').send({ email, password: newPassword });
            expect(reloginRes.status).to.equal(200);
            const getMeRes = await request(app).get('/auth/me').set('Authorization', `Bearer ${reloginRes.body.token}`);
            expect(getMeRes.status).to.equal(200);
            expect(getMeRes.body).to.have.property('data').that.is.an('object');
        });

        it('should register, login, change password, get me using number', async () => {
            const registerRes = await request(app).post('/auth/register').send({ phone_number, password });
            expect(registerRes.status).to.equal(201);
            expect(registerRes.body).to.have.property('token');
            const loginRes = await request(app).post('/auth/login').send({ phone_number, password });
            expect(loginRes.status).to.equal(200);
            expect(loginRes.body).to.have.property('token');
            const changePasswordRes = await request(app)
                .patch('/auth/change-password')
                .send({ oldPassword: password, newPassword })
                .set('Authorization', `Bearer ${loginRes.body.token}`);
            expect(changePasswordRes.status).to.equal(200);
            const reloginRes = await request(app).post('/auth/login').send({ phone_number, password: newPassword });
            expect(reloginRes.status).to.equal(200);
            const getMeRes = await request(app).get('/auth/me').set('Authorization', `Bearer ${reloginRes.body.token}`);
            expect(getMeRes.status).to.equal(200);
            expect(getMeRes.body).to.have.property('data').that.is.an('object');
        });
    });
});
