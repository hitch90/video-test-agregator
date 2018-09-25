import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
export const Channels = new Mongo.Collection("channels");

Meteor.methods({
  "channels.all"() {
    return Channels.find({}, { sort: { slug: 1 } }).fetch();
  },
  "channels.homepage"() {
    return Channels.find({}, { limit: 5 }).fetch().reverse();
  },
  "channels.id"(id) {
    return Channels.findOne({ _id: id });
  },
  "channels.slug"(slug) {
    return Channels.findOne({ slug });
  },
  "channels.add"(product) {
    const isAdded = Channels.find({ _id: product._id }).count();
    if (isAdded == 0) {
      Channels.insert(product);
      return true;
    }
    return false;
  },
  "channels.update"(id, product) {
    //const isAdded = Channels.findOne({ _id: product._id });
    Channels.update({ _id: id }, product);
    return true;
  },
  "channels.remove"(id) {
    Channels.remove(id);
    return true;
  }
});
