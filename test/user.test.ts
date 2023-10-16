import 'dotenv/config';
import { describe } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import app from '../config/express';

describe('User API', () => {
	let testUserId: string;
	let adminToken: string;

	before(async () => {
		const response = await request(app).post('/auth/login').send({
			email: process.env.ADMIN_EMAIL,
			password: process.env.ADMIN_PASSWORD
		});
		expect(response.status).to.equal(200);
		expect(response.body).to.have.property('token');

		adminToken = response.body.token;
	});

	beforeEach(async () => {
		const response = await request(app).post('/auth/register').send({
			email: 'test@voucher.blog',
			password: 'testPassword'
		});
		expect(response.status).to.equal(201);
		testUserId = response.body.data.id;
	});

	afterEach(async () => {
		const response = await request(app).delete(`/users/${testUserId}`).set('Authorization', `Bearer ${adminToken}`);
		expect(response.status).to.be.oneOf([200, 404]);
	});

	describe('GET /users', () => {
		it('should return a list of users', async () => {
			const response = await request(app).get('/users').set('Authorization', `Bearer ${adminToken}`);
			expect(response.status).to.equal(200);
			expect(response.body.message).to.equal('Success');
			expect(response.body.data).to.exist;
		});
	});

	describe('GET /users/:id', () => {
		it('should return a user by id', async () => {
			const response = await request(app)
				.get(`/users/${testUserId}`)
				.set('Authorization', `Bearer ${adminToken}`);
			expect(response.status).to.equal(200);
			expect(response.body.message).to.equal('Success');
			expect(response.body.data).to.exist;
			expect(response.body.data.id).to.equal(testUserId);
		});

		it('should return 404 if user is not found', async () => {
			const response = await request(app).get('/users/999').set('Authorization', `Bearer ${adminToken}`);
			expect(response.status).to.equal(404);
			expect(response.body.message).to.equal('User not found');
		});
	});

	describe('PATCH /users/:id', () => {
		it('should update a user by id', async () => {
			const updatedUser = {
				name: 'Jane Doe'
			};
			const response = await request(app)
				.patch(`/users/${testUserId}`)
				.send({ data: updatedUser })
				.set('Authorization', `Bearer ${adminToken}`);
			expect(response.status).to.equal(200);
			expect(response.body.message).to.equal('Success');
			expect(response.body.data).to.exist;
			expect(response.body.data.name).to.equal(updatedUser.name);
		});

		it('should return 404 if user is not found', async () => {
			const response = await request(app)
				.patch('/users/999')
				.send({ data: { name: 'Jane Doe' } })
				.set('Authorization', `Bearer ${adminToken}`);
			expect(response.status).to.equal(404);
			expect(response.body.message).to.equal('User not found');
		});
	});

	describe('DELETE /users/:id', () => {
		it('should delete a user by id', async () => {
			const response = await request(app)
				.delete(`/users/${testUserId}`)
				.set('Authorization', `Bearer ${adminToken}`);
			expect(response.status).to.equal(200);
			expect(response.body.message).to.equal('Success');
			expect(response.body.data).to.exist;
			expect(response.body.data.id).to.equal(testUserId);
		});

		it('should return 404 if user is not found', async () => {
			const response = await request(app).delete('/users/999').set('Authorization', `Bearer ${adminToken}`);
			expect(response.status).to.equal(404);
			expect(response.body.message).to.equal('User not found');
		});
	});
});
