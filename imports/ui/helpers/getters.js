export const getProducers = () => {
  Meteor.call("producers.all", (error, result) => {
    if (result) return result;
    else return error;
  });
};

export const getModels = () => {
  Meteor.call("models.all", (error, result) => {
    if (result) return result;
    else return error;
  });
};
