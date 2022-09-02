import getUserId from '../utils/getUserId';
import { adminId } from '../keys';
const Sequelize = require('sequelize');

const User = {
  password: {
    resolve(parent, args, { models, request }, info) {
      //doing same thing as I'd do with function
      const userId = getUserId(request, false); //if logged in show only your hashed password
      if (userId && userId === parent.id) {
        return parent.password;
      } else return null; // else show no one's password
    },
  },
  userProfile: {
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false);
      if (userId && userId === parent.id) {
        return true;
      } else {
        return false;
      }
    },
  },
  school: {
    // fragment: 'fragment userId on User {id}', //fragment not needed beacuse we are returning everthing from Query-users
    resolve(parent, args, { models, request }, info) {
      const userId = getUserId(request, false);

      if (userId && userId === adminId) {
        return models.schools.findAll({
          where: {
            schoolAdmin: parent.id,
          },
        });
      }

      if (userId && userId === parent.id) {
        return models.schools.findAll({
          where: {
            schoolAdmin: parent.id,
            [Sequelize.Op.or]: {
              active: true,
              schoolAdmin: userId,
            },
          },
          order: [['createdAt', 'ASC']],
        });
      } else {
        return models.schools.findAll({
          where: {
            schoolAdmin: parent.id,
            active: true,
          },
          order: [['createdAt', 'ASC']],
        });
      }
    },
  },
};
export { User as default };
