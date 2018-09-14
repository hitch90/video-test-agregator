import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
export const Producers = new Mongo.Collection("producers");

Meteor.methods({
  "producers.all"() {
    return Producers.find({}, { sort: { name: 1 } }).fetch();
  },
  "producers.id"(id) {
    return Producers.findOne({ _id: id });
  },
  "producers.slug"(slug) {
    return Producers.findOne({ slug });
  },
  "producers.add"(product) {
    const isAdded = Producers.find({ _id: product._id }).count();
    if (isAdded == 0) {
      Producers.insert(product);
      return true;
    }
    return false;
  },
  "producers.update"(id, product) {
    //const isAdded = Producers.findOne({ _id: product._id });
    Producers.update({ _id: id }, product);
    return true;
  },
  "producers.remove"(id) {
    Producers.remove(id);
    return true;
  }
});
