import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema

const sellerSchema = new Schema({
  firstName:{
    type:String,
  },
  lastName:{
    type:String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile:{
    type:String,
    unique:true,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  
})

// static signup method
sellerSchema.statics.signup = async function(firstName, lastName, email, mobile, address, password) {
    
    // validation
    if (!email || !password) {
        throw Error('Email and Password must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    if (!validator.isMobilePhone(mobile)) {
        throw Error('Mobile Number not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email already in use')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  
    const seller = await this.create({ firstName, lastName, email, mobile, address, password: hash })
  
    return seller
  }

  // static login method
  sellerSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const seller = await this.findOne({ email })
    if (!seller) {
      throw Error('Incorrect email')
    }
  
    const match = await bcrypt.compare(password, seller.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return seller
  }

//Export the model
const seller = mongoose.model('Seller', sellerSchema);
export default seller;