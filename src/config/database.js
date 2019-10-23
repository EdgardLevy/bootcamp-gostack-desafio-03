require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

/*

  define: {
    timestamps = create created_at and updated_at fields
    underscored = remove default camelcase pattern to table names
    underscoredAllL = remove default camelcase pattern to others things
  },
*/
