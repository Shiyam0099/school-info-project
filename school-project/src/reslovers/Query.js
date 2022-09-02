import { adminId } from '../keys';
import getUserId from '../utils/getUserId';

const Sequelize = require('sequelize');

const paginate = ({ page = 0, pageSize = 5000 }) => {
  const offset = page * pageSize; //offset sets from which number, data will be presented
  const limit = pageSize; //limit set number of data per page

  return {
    offset,
    limit,
  };
};

const Query = {
  async schools(parent, args, { models, request }, info) {
    const userId = getUserId(request, false);

    const page = args.page;
    const pageSize = args.pageSize;

    if (userId && userId === adminId) {
      if (args.findSchool) {
        const schoolFound = await models.schools.findAll({
          where: {
            name: { [Sequelize.Op.iLike]: `%${args.findSchool}%` },
          },
          order: [['name', 'ASC']],
          ...paginate({ page, pageSize }),
        });

        if (!schoolFound.length) {
          throw new Error('No matching schools!');
        }

        return schoolFound;
      }

      return models.schools.findAll({
        order: [['name', 'ASC']],
        ...paginate({ page, pageSize }),
      });
    }

    if (args.id) {
      const schoolFound = await models.schools.findAll({
        where: {
          id: args.id,
        },
      });

      if (!schoolFound.length) {
        throw new Error('School not found!');
      }

      return schoolFound;
    }

    if (args.findSchool) {
      const schoolFound = await models.schools.findAll({
        where: {
          name: { [Sequelize.Op.iLike]: `%${args.findSchool}%` },
          active: true,
        },
        order: [['createdAt', 'ASC']],
        ...paginate({ page, pageSize }),
      });

      if (!schoolFound.length) {
        throw new Error('No matching schools!');
      }

      return schoolFound;
    }

    return models.schools.findAll({
      where: {
        active: true,
      },
      order: [['createdAt', 'ASC']],
      ...paginate({ page, pageSize }),
    });
  },

  async mySchool(parent, args, { models, request }, info) {
    const userId = getUserId(request);

    return models.posts.findAll({
      where: {
        schoolAdmin: userId,
      },
      order: [['createdAt', 'ASC']],
      ...paginate({ page: args.page, pageSize: args.pageSize }),
    });
  },
  users(parent, args, { models }, info) {
    if (!args.id) {
      return models.users.findAll({
        order: [['name', 'ASC']], //sorting data by name in ascending order
        ...paginate({ page: args.page, pageSize: args.pageSize }),
      });
    }

    return models.users.findAll({
      where: {
        id: args.id,
      },
      ...paginate({ page: args.page, pageSize: args.pageSize }),
    });
  },
};

export { Query as default };
