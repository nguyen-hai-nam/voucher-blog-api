import 'dotenv/config';
import { describe } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import app from '../config/express.js';

describe('User API', () => {
    describe('CRUD operations', () => {
        let agent = request.agent(app);
        const email = `test-${Math.random().toString(36).substring(2, 15)}@voucher.blog`;
        const password = 'password';
        let userId;

        before(async () => {
            const registerRes = await agent.post('/auth/register').send({ email, password });
            agent.set('Authorization', `Bearer ${registerRes.body.token}`);
            const getMeRes = await agent.get('/auth/me');
            userId = getMeRes.body.data.id;
        });

        it("should get the user's information", async () => {
            const res = await agent.get(`/users/${userId}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('data').that.is.an('object');
        });

        it("should update the user's information", async () => {
            const name = 'Updated Name';
            const res = await agent.patch(`/users/${userId}`).send({ name });
            expect(res.status).to.equal(200);
        });

        it('should not delete the user', async () => {
            const res = await agent.delete(`/users/${userId}`);
            expect(res.status).to.equal(401);
        });
    });
    describe('Admin CRUD operations', () => {
        let adminAgent = request.agent(app);
        let agent = request.agent(app);
        const adminEmail = process.env.TEST_ADMIN_ACCOUNT_EMAIL;
        const adminPassword = process.env.TEST_ADMIN_ACCOUNT_PASSWORD;
        const email = `test-${Math.random().toString(36).substring(2, 15)}@voucher.blog`;
        const password = 'password';
        let userId;

        before(async () => {
            const adminLoginRes = await adminAgent
                .post('/auth/login')
                .send({ email: adminEmail, password: adminPassword });
            adminAgent.set('Authorization', `Bearer ${adminLoginRes.body.token}`);
            const registerRes = await agent.post('/auth/register').send({ email, password });
            agent.set('Authorization', `Bearer ${registerRes.body.token}`);
            const getMeRes = await agent.get('/auth/me');
            userId = getMeRes.body.data.id;
        });

        it('should get all users', async () => {
            const res = await adminAgent.get('/users');
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('data').that.is.an('array');
        });

        it('should delete the user', async () => {
            const res = await adminAgent.delete(`/users/${userId}`);
            expect(res.status).to.equal(200);
        });
    });
});
