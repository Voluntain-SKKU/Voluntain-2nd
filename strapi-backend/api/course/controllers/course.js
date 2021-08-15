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


    //과목의 id 와 title 정보를 전달하는 controller
    findTitle: async ctx => {
        const result = await strapi.query('course').model.fetchAll({
            columns: ['id', 'title'],
            withRelated : [] //lecture 및 logo_img 관련 정보를 제외
        });

        ctx.send(result);

    }

};






