import { v4 as uuidv4 } from 'uuid';
import { validate as isValidUUID } from 'uuid';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { secretKey, adminId } from '../keys';
import getUserId from '../utils/getUserId';
import { CLOSED } from 'ws';

const Mutation = {
  async signup(parent, args, { models }, info) {
    if (!args.data.name) {
      throw new Error('You must provide a username!');
    }
    const isEmail = validator.isEmail(args.data.email); //email format validation through validator package
    if (!isEmail) {
      throw new Error('Invalid Email format!');
    }
    const emailTaken = await models.users.findOne({
      where: { email: args.data.email },
    });
    if (emailTaken !== null) {
      throw new Error('Email already taken!');
    }

    const isValidPassword = validator.isLength(args.data.password, { min: 5 }); //setting password length
    if (!isValidPassword) {
      throw new Error(
        'Password is too short! At least 5 or more characters required.'
      );
    }

    const hashedPassword = await bcrypt.hash(args.data.password, 10); //hashing password

    const user = await models.users.create({
      id: uuidv4(),
      name: args.data.name,
      email: args.data.email,
      password: hashedPassword,
    });

    return {
      message: `User signed up successully!`,
      user: user,
      token: `Bearer ${JWT.sign(
        {
          id: user.id,
        },
        secretKey,
        { expiresIn: 3600000 } //creating and returning token
      )}`,
    };
  },

  async adminSignup(parent, args, { models }, info) {
    const isEmail = validator.isEmail(args.data.email); //email format validation through validator package
    if (!isEmail) {
      throw new Error('Invalid Email format!');
    }
    const emailTaken = await models.admins.findOne({
      where: { email: args.data.email },
    });
    if (emailTaken !== null) {
      throw new Error('Email already taken!');
    }

    const isValidPassword = validator.isLength(args.data.password, { min: 5 }); //setting password length
    if (!isValidPassword) {
      throw new Error(
        'Password is too short! At least 5 or more characters required.'
      );
    }

    const hashedPassword = await bcrypt.hash(args.data.password, 10); //hashing password

    const user = await models.admins.create({
      id: uuidv4(),
      name: args.data.name,
      email: args.data.email,
      password: hashedPassword,
    });

    return {
      message: `Admin signed up successully!`,
      user: user,
      token: `Bearer ${JWT.sign(
        {
          id: user.id,
        },
        secretKey,
        { expiresIn: 3600000 } //creating and returning token
      )}`,
    };
  },

  async signin(parent, args, { models }, info) {
    const user = await models.users.findOne({ where: { email: args.email } });
    if (user === null) {
      throw new Error('Invalid Credentials');
    }

    const isUser = await bcrypt.compare(args.password, user.password);
    if (!isUser) {
      throw new Error('Wrong Password');
    }

    return {
      message: `Sign in complete!`,
      user: user,
      token: `Bearer ${JWT.sign({ id: user.id }, secretKey, {
        //returning token
        expiresIn: 3600000,
      })}`,
    };
  },

  async adminSignin(parent, args, { models }, info) {
    const user = await models.admins.findOne({ where: { email: args.email } });
    if (user === null) {
      throw new Error('Invalid email address!');
    }

    const isUser = await bcrypt.compare(args.password, user.password);
    if (!isUser) {
      throw new Error('Wrong password!');
    }

    return {
      message: `Sign in complete!`,
      admin: user,
      token: `Bearer ${JWT.sign({ id: user.id }, secretKey, {
        //returning token
        expiresIn: 3600000,
      })}`,
    };
  },

  async deleteUser(parent, args, { models, request }, info) {
    const userId = getUserId(request);

    models.users.destroy({
      where: {
        id: userId,
      },
    });
    return `Your account deleted successfully!`;
  },

  async adminDeleteUser(parent, args, { models, request }, info) {
    const userId = getUserId(request);

    const userFound = await models.users.findOne({
      where: { id: args.usersId },
    });
    if (userFound === null) {
      throw new Error('User not found!');
    }

    if (userId === adminId) {
      models.users.destroy({
        where: {
          id: args.usersId,
        },
      });
      return `User deleted successfully!`;
    } else {
      return `Unauthorized Operation!`;
    }
  },

  async updateUser(parent, args, { models, request }, info) {
    const userId = getUserId(request);

    const isEmail = validator.isEmail(args.data.email); //email format validation through validator package
    if (!isEmail) {
      throw new Error('Invalid Email format!');
    }
    if (args.data.password) {
      const isValidPassword = validator.isLength(args.data.password, {
        min: 5,
      }); //setting password length
      if (!isValidPassword) {
        throw new Error(
          'Password is too short! At least 5 or more characters required.'
        );
      }
    }
    if (args.data.email) {
      const emailTaken = await models.users.findOne({
        where: { email: args.data.email },
      });
      if (emailTaken !== null && emailTaken.id !== userId) {
        throw new Error('Email already taken!');
      }
    }

    if (!args.data.password) {
      return await models.users
        .update(
          {
            name: args.data.name,
            email: args.data.email,
          },
          {
            where: {
              id: userId,
            },
            returning: true,
            plain: true,
          }
        )
        .then((result) => {
          return result[1];
        });
    }

    return await models.users
      .update(
        {
          name: args.data.name,
          email: args.data.email,
          password: `${await bcrypt.hash(args.data.password, 10)}`, //updation password and storing after hashing
        },
        {
          where: {
            id: userId,
          },
          returning: true,
          plain: true,
        }
      )
      .then((result) => {
        return result[1];
      });
  },

  async addSchool(parent, args, { models, request }, info) {
    const userId = getUserId(request);

    const addedSchool = await models.schools.create({
      id: uuidv4(),
      name: args.data.name,
      address: args.data.address,
      email: args.data.email,
      contact: args.data.contact,
      schoolAdmin: userId,
      active: false,
    });

    return addedSchool;
  },

  async deleteSchool(parent, args, { models, request }, info) {
    const userId = getUserId(request);

    if (!isValidUUID(args.id)) {
      return Promise.reject('Invalid ID!');
    }
    const schoolFound = await models.schools.findOne({
      where: { id: args.id },
    });
    if (schoolFound === null) {
      throw new Error('School not found!');
    }
    if (schoolFound.schoolAdmin !== userId) {
      throw new Error('Invalid Operation!!');
    }

    models.schools.destroy({
      where: {
        id: args.id,
        schoolAdmin: userId,
      },
    });

    return `School info deleted successfully!`;
  },

  async updateSchool(parent, args, { models, request }, info) {
    if (!isValidUUID(args.id)) {
      return Promise.reject('Invalid ID!');
    }
    const schoolFound = await models.schools.findOne({
      where: { id: args.id },
    });
    if (schoolFound === null) {
      throw new Error('School not found!');
    }

    const userId = getUserId(request);

    if (schoolFound.schoolAdmin !== userId) {
      throw new Error('Invalid Operation!!');
    }

    models.schools
      .update(
        {
          name: args.data.name,
          address: args.data.address,
          email: args.data.email,
          contact: args.data.contact,
        },
        {
          where: {
            id: args.id,
            schoolAdmin: userId,
          },
          returning: true, //must set returning 'true' to return object
          plain: true, // musts set plain true to not get unuseful messy data
        }
      )
      .then((result) => {
        return result[1]; //for postgres result = [x, y] and data is in 'y'
      });
  },

  async schoolInfoActiveStatus(parent, args, { models, request }, info) {
    const userId = getUserId(request);
    const schoolFound = await models.schools.findOne({
      where: { id: args.schoolId },
    });
    if (schoolFound === null) {
      throw new Error('School not found!');
    }
    if (userId === adminId) {
      return await models.schools
        .update(
          {
            active: args.active,
          },
          {
            where: {
              id: args.schoolId,
            },
            returning: true, //must set returning 'true' to return object
            plain: true,
          } // musts set plain true to not get unuseful messy data
        )
        .then((result) => {
          return result[1]; //for postgres result = [x, y] and data is in 'y'
        });
    } else {
      throw new Error('Unauthorized Operation!');
    }
  },
};

export { Mutation as default };
