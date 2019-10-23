module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Student A',
          email: 'studenta@email.com',
          age: 36,
          height: 178,
          weight: 94,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Student B',
          email: 'studentb@email.com',
          age: 26,
          height: 158,
          weight: 74,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Student C',
          email: 'studentc@email.com',
          age: 16,
          height: 128,
          weight: 64,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('students', null, {});
  },
};
