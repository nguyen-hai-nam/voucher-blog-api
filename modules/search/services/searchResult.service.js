import prisma from "../../../config/prisma.js";
import { calculateDistance } from "../utils/sphereDistance.util.js";

const getSearchResult = async (currentPosition, keyword) => {
    try {
        const businesses = await prisma.business.findMany({
            include: {
                images: {
                    where: {
                        type: {
                            in: ['FRONT', 'INSIDE']
                        }
                    }
                },
                category: true,
                campaigns: true,
                products: true
            },
            where: {
                OR: [
                    { name: { contains: keyword } },
                    { products: { some: { name: { contains: keyword } } } },
                ]
            }
        })
        const businessWithDistance = businesses.map(async (business) => {
            business.distance = calculateDistance(business, currentPosition);
            return business;
        })

        return await Promise.all(businessWithDistance)

    } catch (error) {
        throw error;
    }
}

const getSearchResultQuery = async (currentPosition, keyword) => {
    try {
        const result = await prisma.$queryRaw`
            With TK1 as (
            select distinct thong_tin_business.id ,
                thong_tin_business.avatar_image_url,
                thong_tin_business.name,
                test.Category.name as hang_muc,
                thong_tin_business.open_hour,
                thong_tin_business.close_hour,
                thong_tin_business.address_name,
                thong_tin_business.url,
                thong_tin_business.description,
                thong_tin_business.followers_count,
                thong_tin_business.khoang_cach
            from 
            (select test.Business.id, test.Business.category_id, test.Business.description, 
                    test.Business.avatar_image_url, test.Business.address_name, test.Business.open_hour, test.Business.close_hour,
                    test.Business.followers_count, test.Business.name, 
                    St_distance_sphere (
                    point (${currentPosition.lng}, ${currentPosition.lat}),
                    point (test.Business.lng, test.Business.lat)
                    )as khoang_cach,
                    test.BusinessImage.url 
            from Business 
            left join BusinessImage 
            on test.Business.id = test.BusinessImage.business_id
            where test.BusinessImage.type in ('FRONT', 'INSIDE')) as thong_tin_business
            left join test.Category
            on thong_tin_business.category_id = test.Category.id
            ),
            TK2 as (
            select test.Business.id, avg(rating) as danh_gia_trung_binh
            from test.Business
            group by test.Business.id),
            TK3 as (
            select TK1.id, TK1.avatar_image_url, TK1.name, TK1.hang_muc, TK1.open_hour, TK1.close_hour, TK1.address_name, TK1.url,
                TK1.description, TK1.followers_count, 
                TK1.khoang_cach,
                TK2.danh_gia_trung_binh
                
            from TK1
            left join TK2
            on TK1.id = TK2.id),
            TK4 as (
            select CTK3.id, CTK3.avatar_image_url, CTK3.name, CTK3.hang_muc, CTK3.open_hour, CTK3.close_hour, CTK3.address_name, CTK3.url,
                CTK3.description, CTK3.followers_count, 
                CTK3.danh_gia_trung_binh, 
                CTK3.khoang_cach,
                CTK3.id_chien_dich,
                CTK3.start_date,
                CTK3.end_date
            from (select TK3.id, TK3.avatar_image_url, TK3.name, TK3.hang_muc, TK3.open_hour, TK3.close_hour, TK3.address_name, TK3.url,
                TK3.description, TK3.followers_count, 
                TK3.danh_gia_trung_binh, 
                TK3.khoang_cach,
                test.Campaign.id as id_chien_dich,
                test.Campaign.start_date,
                test.Campaign.end_date
                from TK3
                left join test.Campaign
                on TK3.id = test.Campaign.business_id) as CTK3
                left join Product 
                on CTK3.id = test.Product.business_id 
                where end_date <= CURDATE() and (CTK3.name = ${keyword} or test.Product.name = ${keyword})
                ),
            TK5 as (
            select distinct TK4.id, TK4.avatar_image_url, TK4.name, TK4.hang_muc, TK4.open_hour, TK4.close_hour, TK4.address_name, TK4.url,
                TK4.description, TK4.followers_count, 
                TK4.danh_gia_trung_binh, 
                TK4.khoang_cach,
                TK4.id_chien_dich,
                TK4.start_date,
                TK4.end_date,
                test.UserSaveCampaign.user_id as user_luu_campaign
            from TK4
            left join test.UserSaveCampaign
            on TK4.id_chien_dich = test.UserSaveCampaign.campaign_id ),
            TK6 as (
            select distinct TK5.id, TK5.avatar_image_url, TK5.name, TK5.hang_muc, TK5.open_hour, TK5.close_hour, TK5.address_name, TK5.url,
                TK5.description, TK5.followers_count, 
                TK5.danh_gia_trung_binh, 
                TK5.khoang_cach,
                TK5.user_luu_campaign,
                TK5.id_chien_dich,
                TK5.start_date,
                TK5.end_date,
                test.UserLoveCampaign.campaign_id as uesr_love_campaign
            from TK5 
            left join test.UserLoveCampaign
            on TK5.id_chien_dich = test.UserLoveCampaign.campaign_id)

            select distinct TK6.id, TK6.avatar_image_url, TK6.name, TK6.hang_muc, TK6.open_hour, TK6.close_hour, TK6.address_name, TK6.url,
                TK6.description, TK6.followers_count, 
                TK6.danh_gia_trung_binh, 
                TK6.khoang_cach,
                TK6.user_luu_campaign,
                TK6.id_chien_dich,
                TK6.start_date,
                TK6.end_date,
                TK6.uesr_love_campaign,
                test.Voucher.media_url
            from TK6
            left join test.Voucher
            on TK6.id_chien_dich = test.Voucher.campaign_id         
        `

        return result;
    } catch (error) {
        throw error;
    }
}


export default {
    getSearchResult,
    getSearchResultQuery
}