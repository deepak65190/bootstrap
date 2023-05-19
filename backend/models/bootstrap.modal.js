const mongoose=require("mongoose") ;
const BootstrapSchema = mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  published_year: {
    type: Number,
  },
  ISBN: {
    type: Number,
  },
  image_url:{
    type:String ,
  }
});
const BootstrapModal =mongoose.model("book", BootstrapSchema);
module.exports = {
  BootstrapModal
};