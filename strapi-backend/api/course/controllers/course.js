'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */



module.exports = {
    findData: async ctx => {
        const result = await strapi
        .query('course')
        .model.query((qb) => {
            qb.select('id', 'title', 'about', 'level'); //필요한 field만 선택
        })
        .fetchAll({
            withRelated: [] //lecture relations에 대한 정보 제외
        });

        ctx.send(result);

    } ,

    findTitle: async ctx => {
        const result = await strapi
        .query('course')
        .model.query((qb) => {
            qb.select('id', 'title'); //필요한 field만 선택
        })
        .fetchAll({
            withRelated: [] //lecture relations에 대한 정보 제외
        });

        ctx.send(result);

    }

};






