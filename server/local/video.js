import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
export const Videos = new Mongo.Collection("videos");
import { getLastWeek } from "../../imports/ui/helpers/date";

Meteor.methods({
  "videos.all"() {
    return Videos.find({}, { sort: { created_at: -1 } }).fetch();
  },
  "videos.weekly"() {
    return Videos.find(
      {
        added: { $gte: getLastWeek() },
        promo: false
      },
      { sort: { created_at: -1 } }
    ).fetch();
  },
  "videos.search"(q) {
    var querystring = new RegExp(["\\b", q].join(""), "gim");

    return Videos.find({
      $or: [
        {
          name: querystring
        },
        {
          slug: querystring
        },
        {
          description: querystring
        },
        {
          tags: querystring
        }
      ]
    }).fetch();
  },
  "videos.promo"() {
    return Videos.findOne({ promo: true }, { sort: { created_at: -1 } });
  },
  "videos.producer"(id) {
    return Videos.find({ "producer._id": id }).fetch();
  },
  "videos.model"(id) {
    return Videos.find({ "model._id": id }).fetch();
  },
  "videos.countProducer"(id) {
    return Videos.find({ "producer._id": id }).count();
  },
  "videos.channel"(id) {
    return Videos.find({ "channel._id": id }).fetch();
  },
  "videos.id"(id) {
    return Videos.findOne({ _id: id });
  },
  "videos.clap"(_id) {
    Videos.update({ _id }, { $inc: { clap: 1 } });
    return true;
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
