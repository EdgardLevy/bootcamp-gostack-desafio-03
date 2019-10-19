module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gympoint',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAllL: true,
  },
};

/*
  define: {
    timestamps = create createdAt and updatedAt fields
    underscored = remove default camelcase pattern to table names
    underscoredAllL = remove default camelcase pattern to others things
  },
*/
