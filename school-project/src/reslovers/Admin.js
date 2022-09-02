import getUserId from '../utils/getUserId';

const Admin = {
  adminProfile(parent, args, { models, request }, info) {
    const userId = getUserId(request, false);
    if (userId && userId === parent.id) {
      return true;
    } else {
      return false;
    }
  },
};

export { Admin as default };
