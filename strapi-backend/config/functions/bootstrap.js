'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

//super admin 계정 생성 안 돼있는 경우 super admin 계정 생성(환경 변수 이용)
//development 환경에서만 코드 실행

module.exports = async () => {
    if (process.env.NODE_ENV === 'development') {
      const params = {
        username: process.env.DEV_USER,
        password: process.env.DEV_PASS,
        firstname: process.env.DEV_USER_FIRST,
        lastname: process.env.DEV_USER_LAST,
        email: process.env.DEV_EMAIL,
        blocked: false,
        isActive: true,
      };
      //super admin 계정 존재 여부 확인
      const admins = await strapi.query('user', 'admin').find();
      
      //super admin 계정이 없는 경우
      if (admins.length === 0) {
       try {
          let tempPass = params.password;

          //super admin 권한 부여 (해당 권한 없을 경우 super admin 권한 새로 생성)
          let verifyRole = await strapi.query('role', 'admin').findOne({ code: 'strapi-super-admin' });
          if (!verifyRole) {
          verifyRole = await strapi.query('role', 'admin').create({
            name: 'Super Admin',
            code: 'strapi-super-admin',
            description: 'Super Admins can access and manage all features and settings.',
           });
          }
          params.roles = [verifyRole.id];
          params.password = await strapi.admin.services.auth.hashPassword(params.password);
          await strapi.query('user', 'admin').create({
            ...params,
          });

          strapi.log.info('Admin account was successfully created.');
          strapi.log.info(`Email: ${params.email}`);
          strapi.log.info(`Password: ${tempPass}`);
        } catch (error) {
          strapi.log.error(`Couldn't create Admin account during bootstrap: `, error);
        }
      } else { //super admin 계정이 이미 있는 경우
        strapi.log.info(`Super Admin already exists`);
      }
    }
  };

