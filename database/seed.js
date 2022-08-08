const sequelize = require("./config");

const User = require("../models/user");

const users = [
  { name: "test1", email: "test1@test.com", password: 123456 },
  { name: "test2", email: "test2@test.com", password: 123456 },
  { name: "test3", email: "test3@test.com", password: 123456 },
  { name: "test4", email: "test4@test.com", password: 123456 },
  { name: "test5", email: "test5@test.com", password: 123456 },
  { name: "test6", email: "test6@test.com", password: 123456 },
  { name: "test7", email: "test7@test.com", password: 123456 },
  { name: "test8", email: "test8@test.com", password: 123456 },
  { name: "test9", email: "test9@test.com", password: 123456 },
  { name: "test10", email: "test10@test.com", password: 123456 },
];

const insert = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("db online");

    users.forEach(async (user) => {
      await User.create(user);
    });
  } catch (error) {
    console.log("error");
  }
};

insert();
