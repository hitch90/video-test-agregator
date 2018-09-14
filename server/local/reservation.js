import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import moment from "moment";
export const Reservation = new Mongo.Collection("reservation");

Meteor.methods({
  // "reservation.all"() {
  //   return Reservation.find().fetch();
  // },
  "reservation.id"(id) {
    console.log(Reservation.find({ product_id: id }).fetch());
    return Reservation.find({ product_id: id }).fetch();
  },
  "reservation.add"(reservation) {
    const start = moment(reservation.start).format("DD-MM-YYYY");
    const end = moment(reservation.end).format("DD-MM-YYYY");
    const a = moment(start.split("-").reverse());
    const b = moment(end.split("-").reverse());
    reservation.count = b.diff(a, "days");
    console.log(reservation);
    Reservation.insert(reservation);
    return true;
  },
  "reservation.check"(range) {
    return true;
  },
  // "reservation.update"(id, product) {
  //   //const isAdded = Reservation.findOne({ _id: product._id });
  //   Reservation.update({ _id: id }, product);
  //   return true;
  // },
  "reservation.remove"(id) {
    Reservation.remove(id);
    return true;
  }
});
