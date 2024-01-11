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
    describe('User actions', () => {
        let agent = request.agent(app);
        const email = `test-${Math.random().toString(36).substring(2, 15)}@voucher.blog`;
        const password = 'password';

        // Tester should manually create a business, a campaign, and a voucher
        let businessId = 'test-business';
        let voucherId = 'test-voucher';
        let campaignId = 'test-campaign';

        before(async () => {
            const registerRes = await agent.post('/auth/register').send({ email, password });
            agent.set('Authorization', `Bearer ${registerRes.body.token}`);
        });

        it('should collect and discard voucher', async () => {
            const initialVoucherResponse = await agent.get(`/vouchers/${voucherId}`);
            expect(initialVoucherResponse.body).to.have.property('data').that.have.property('collected_count');
            const initialCollectedCount = initialVoucherResponse.body.data.collected_count;

            const collectResponse = await agent.post(`/users/collectVoucher/${voucherId}`);
            expect(collectResponse.status).to.equal(200);

            const errorCollectResponse = await agent.post(`/users/collectVoucher/${voucherId}`);
            expect(errorCollectResponse.status).to.equal(400);

            const afterCollectedVoucherResponse = await agent.get(`/vouchers/${voucherId}`);
            expect(afterCollectedVoucherResponse.body.data.collected_count).to.equal(initialCollectedCount + 1);

            const discardResponse = await agent.post(`/users/discardVoucher/${voucherId}`);
            expect(discardResponse.status).to.equal(200);

            const errorDiscardResponse = await agent.post(`/users/discardVoucher/${voucherId}`);
            expect(errorDiscardResponse.status).to.equal(400);

            const afterDiscardedVoucherResponse = await agent.get(`/vouchers/${voucherId}`);
            expect(afterDiscardedVoucherResponse.body.data.collected_count).to.equal(initialCollectedCount);
        });

        it('should save and unsave campaign', async () => {
            const initialCampaignResponse = await agent.get(`/campaigns/${campaignId}`);
            expect(initialCampaignResponse.body).to.have.property('data').that.have.property('saves_count');
            const initialSavesCount = initialCampaignResponse.body.data.saves_count;

            const saveResponse = await agent.post(`/users/saveCampaign/${campaignId}`);
            expect(saveResponse.status).to.equal(200);

            const errorSaveResponse = await agent.post(`/users/saveCampaign/${campaignId}`);
            expect(errorSaveResponse.status).to.equal(400);

            const afterSavedCampaignResponse = await agent.get(`/campaigns/${campaignId}`);
            expect(afterSavedCampaignResponse.body.data.saves_count).to.equal(initialSavesCount + 1);

            const unsaveResponse = await agent.post(`/users/unsaveCampaign/${campaignId}`);
            expect(unsaveResponse.status).to.equal(200);

            const errorUnsaveResponse = await agent.post(`/users/unsaveCampaign/${campaignId}`);
            expect(errorUnsaveResponse.status).to.equal(400);

            const afterUnsavedCampaignResponse = await agent.get(`/campaigns/${campaignId}`);
            expect(afterUnsavedCampaignResponse.body.data.saves_count).to.equal(initialSavesCount);
        });

        it('should love and unlove campaign', async () => {
            const initialCampaignResponse = await agent.get(`/campaigns/${campaignId}`);
            expect(initialCampaignResponse.body).to.have.property('data').that.have.property('loves_count');
            const initialLovesCount = initialCampaignResponse.body.data.loves_count;

            const loveResponse = await agent.post(`/users/loveCampaign/${campaignId}`);
            expect(loveResponse.status).to.equal(200);

            const errorLoveResponse = await agent.post(`/users/loveCampaign/${campaignId}`);
            expect(errorLoveResponse.status).to.equal(400);

            const afterLovedCampaignResponse = await agent.get(`/campaigns/${campaignId}`);
            expect(afterLovedCampaignResponse.body.data.loves_count).to.equal(initialLovesCount + 1);

            const unloveResponse = await agent.post(`/users/unloveCampaign/${campaignId}`);
            expect(unloveResponse.status).to.equal(200);

            const errorUnloveResponse = await agent.post(`/users/unloveCampaign/${campaignId}`);
            expect(errorUnloveResponse.status).to.equal(400);

            const afterUnlovedCampaignResponse = await agent.get(`/campaigns/${campaignId}`);
            expect(afterUnlovedCampaignResponse.body.data.loves_count).to.equal(initialLovesCount);
        });

        it('should follow and unfollow business', async () => {
            const initialBusinessResponse = await agent.get(`/businesses/${businessId}`);
            expect(initialBusinessResponse.body).to.have.property('data').that.have.property('followers_count');
            const initialFollowersCount = initialBusinessResponse.body.data.followers_count;

            const followResponse = await agent.post(`/users/follow/${businessId}`);
            expect(followResponse.status).to.equal(200);

            const errorFollowResponse = await agent.post(`/users/follow/${businessId}`);
            expect(errorFollowResponse.status).to.equal(400);

            const afterFollowedBusinessResponse = await agent.get(`/businesses/${businessId}`);
            expect(afterFollowedBusinessResponse.body.data.followers_count).to.equal(initialFollowersCount + 1);

            const unfollowResponse = await agent.post(`/users/unfollow/${businessId}`);
            expect(unfollowResponse.status).to.equal(200);

            const errorUnfollowResponse = await agent.post(`/users/unfollow/${businessId}`);
            expect(errorUnfollowResponse.status).to.equal(400);

            const afterUnfollowedBusinessResponse = await agent.get(`/businesses/${businessId}`);
            expect(afterUnfollowedBusinessResponse.body.data.followers_count).to.equal(initialFollowersCount);
        });
    });
});
