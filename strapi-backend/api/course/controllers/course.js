'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */


module.exports = {
    //과목에 속한 강의 정보 외의 정보를 전달하는 controller
    findData: async ctx => {
        const result = await strapi.query('course').model.fetchAll({
            columns: ['id', 'title', 'about', 'level'],
            withRelated : [ 'logo_img' ]
        });

        ctx.send(result);
    },

    //과목 id, 
    // findTitle: async ctx => {
    //     const result = await strapi
    //     .query('course')
    //     .model.query((qb) => {
    //         qb.select('id', 'title'); //필요한 field만 선택
    //     })
    //     .fetchAll({
    //         withRelated: [] //lecture relations에 대한 정보 제외
    //     });

    //     ctx.send(result);

    // }

    //과목의 id 와 title 정보를 전달하는 controller
    findTitle: async ctx => {
        const result = await strapi.query('course').model.fetchAll({
            columns: ['id', 'title'],
            withRelated : []
        });

        ctx.send(result);

    }

};






