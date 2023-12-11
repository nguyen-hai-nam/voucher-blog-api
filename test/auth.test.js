import 'dotenv/config';
import { describe } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import app from '../config/express.js';

describe('Auth API', () => {
    describe('POST /auth/register', () => {
        let adminAgent;

        before(async () => {
            adminAgent = request.agent(app);
            const res = await adminAgent.post('/auth/login').send({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
            });
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('token');
            adminAgent.set('Authorization', `Bearer ${res.body.token}`);
        });

        it('should return a JWT token when a valid email and password are provided', async () => {
            let userId;
            try {
                const res = await request(app).post('/auth/register').send({
                    email: 'test@voucher.blog',
                    password: 'password'
                });
                userId = res.body.data?.id;
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('data');
            } finally {
                if (userId) {
                    await adminAgent.delete(`/users/${userId}`);
                }
            }
        });

        it('should return a JWT token when a valid phone number and password are provided', async () => {
            let userId;
            try {
                const res = await request(app).post('/auth/register').send({
                    phoneNumber: '0987654321',
                    password: 'password'
                });
                userId = res.body.data?.id;
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('data');
            } finally {
                if (userId) {
                    await adminAgent.delete(`/users/${userId}`);
                }
            }
        });

        it('should return an error when an invalid email is provided', async () => {
            let userId;
            try {
                const res = await request(app).post('/auth/register').send({
                    email: 'invalid_email',
                    password: 'password'
                });
                userId = res.body.data?.id;
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property('error');
            } finally {
                if (userId) {
                    await adminAgent.delete(`/users/${userId}`);
                }
            }
        });

        it('should return an error when an invalid phone number is provided', async () => {
            let userId;
            try {
                const res = await request(app).post('/auth/register').send({
                    phoneNumber: 'invalid_phone_number',
                    password: 'password'
                });
                userId = res.body.data?.id;
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property('error');
            } finally {
                if (userId) {
                    await adminAgent.delete(`/users/${userId}`);
                }
            }
        });
    });

    describe('POST /auth/login', () => {
        it('should return a JWT token when a valid username and password are provided', async () => {
            const res = await request(app).post('/auth/login').send({
                email: 'admin@voucher.blog',
                password: 'admin'
            });
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('token');
        });

        it('should return an error when an invalid username or password are provided', async () => {
            const res = await request(app).post('/auth/login').send({
                email: 'admin@voucher.blog',
                password: 'wrongpassword'
            });
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('error');
        });

        it('should return an error when necessary credentials are not provided', async () => {
            const res = await request(app).post('/auth/login').send({
                password: 'password'
            });
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error');
        });
    });

    describe('PATCH /auth/change-password', () => {
        const testEmail = 'testuser@example.com';
        const testPassword = 'testpassword';
        let testUserId;
        let token;

        before(async () => {
            const res = await request(app).post('/auth/register').send({ email: testEmail, password: testPassword });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('token');
            expect(res.body).to.have.property('data');
            testUserId = res.body.data.id;
            token = res.body.token;
        });

        it('should return a 401 error if the user is not authenticated', async () => {
            const res = await request(app).patch('/auth/change-password').send({
                oldPassword: testPassword,
                newPassword: 'newpassword'
            });
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('error');
        });

        it('should return a 400 error if the old password is incorrect', async () => {
            const res = await request(app)
                .patch('/auth/change-password')
                .send({
                    oldPassword: 'wrongpassword',
                    newPassword: 'newpassword'
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error');
        });

        it('should update the user password if the old password is correct', async () => {
            const res = await request(app)
                .patch('/auth/change-password')
                .send({
                    oldPassword: testPassword,
                    newPassword: 'newpassword'
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            const loginRes = await request(app).post('/auth/login').send({
                email: testEmail,
                password: 'newpassword'
            });
            expect(loginRes.status).to.equal(200);
            expect(loginRes.body).to.have.property('token');
        });

        after(async () => {
            const adminRes = await request(app).post('/auth/login').send({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
            });
            await request(app).delete(`/users/${testUserId}`).set('Authorization', `Bearer ${adminRes.body.token}`);
        });
    });
});
