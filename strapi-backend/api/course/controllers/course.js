'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

//  strapi.query('products').model.fetchAll({
//     columns:['id','title','body'], //populate id, title, body fields for products
//     //Please note that its mandatory to get `id` in 'Products' columns, otherwise you won't be able to get Orders relation. 
//     withRelated: [
//       {
//         'orders': qb => { //populate 'Orders' relation
//           qb.columns([
//             'orders.amount' //populate only the 'amount' field of the 'Orders'
//           ]);
//         },
//       },
//     ],
//   });
// qb =>  {
//     qb.columns(['id', 'url']);
// }

module.exports = {

    findData: async ctx => {
        const result = await strapi.query('course').model.fetchAll({
            columns: ['id', 'title', 'about', 'level'],
            withRelated : [ 'logo_img' ]
            //     {
            //         'logo_img' :  qb =>  {
            //                  qb.columns(['id', 'url']);
            //              }
            //     }
            // ]
        });

        ctx.send(result);
    },

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






