const School = {
  schoolAdmin(parent, args, { models }, info) {
    return models.users.findOne({
      where: {
        id: parent.schoolAdmin,
      },
    });
  },
};

export { School as default };
