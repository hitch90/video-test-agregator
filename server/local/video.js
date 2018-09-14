import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
export const Videos = new Mongo.Collection("videos");
import { getLastWeek } from "../../imports/ui/helpers/date";

Meteor.methods({
  "videos.all"() {
    return Videos.find().fetch();
  },
  "videos.weekly"() {
    return Videos.find({
      added: { $gte: getLastWeek() },
      promo: false
    }).fetch();
  },
  "videos.promo"() {
    return Videos.findOne({ promo: true }, { sort: { created_at: -1 } });
  },
  "videos.id"(id) {
    return Videos.findOne({ _id: id });
  },
  "videos.add"(product) {
    const isAdded = Videos.find({ _id: product._id }).count();
    if (isAdded == 0) {
      Videos.insert(product);
      return true;
    }
    return false;
  },
  "videos.update"(id, product) {
    //const isAdded = Videos.findOne({ _id: product._id });
    Videos.update({ _id: id }, product);
    return true;
  },
  "videos.remove"(id) {
    Videos.remove(id);
    return true;
  }
});
