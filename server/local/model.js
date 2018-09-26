import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
export const Models = new Mongo.Collection("models");

Meteor.methods({
  "models.all"() {
    return Models.find({}, { sort: { slug: 1 } }).fetch();
  },
  "models.search"(q) {
    var querystring = new RegExp(["\\b", q].join(""), "i");

    return Models.find({
      $or: [
        {
          name: querystring
        },
        {
          slug: querystring
        },
        {
          description: querystring
        }
      ]
    }).fetch();
  },
  "models.homepage"() {
    return Models.find({}, { sort: { _id: 1 }, limit: 8 }).fetch();
  },
  "models.id"(id) {
    return Models.findOne({ _id: id });
  },
  "models.slug"(slug) {
    return Models.findOne({ slug });
  },
  "models.add"(product) {
    const isAdded = Models.find({ _id: product._id }).count();
    if (isAdded == 0) {
      Models.insert(product);
      return true;
    }
    return false;
  },
  "models.producer"(id) {
    return Models.find({ producer: id }).fetch();
  },
  "models.update"(id, product) {
    //const isAdded = Models.findOne({ _id: product._id });
    Models.update({ _id: id }, product);
    return true;
  },
  "models.remove"(id) {
    Models.remove(id);
    return true;
  }
});
