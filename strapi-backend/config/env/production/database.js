//production 환경일 때 database setting 정보
////mysql, bookshelf orm 이용
////환경 변수 (HOST, PORT, NAME, USERNAME, PASSWORD) 정보 이용하여 db 연결

module.exports = ({ env }) => ({
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'mysql',
          host: process.env.DATABASE_HOST || 'localhost',
          port: process.env.DATABASE_PORT || 3306,
          database: process.env.DATABASE_NAME || 'strapi',
          username: process.env.DATABASE_USERNAME || 'strapi',
          password: process.env.DATABASE_PASSWORD || 'strapi',
        },
        options: {},
      },
    },
  });