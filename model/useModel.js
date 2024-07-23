import  mongoose  from 'mongoose';
const { Schema,model } = mongoose;
import bcrypt from 'bcrypt'
import crypto from 'crypto';
import JWT from 'jsonwebtoken' ;
const userSchema =new mongoose.Schema({
  fullName: {
        type: String,
        require: [true, 'user name is Required'],
        minLength: [5, 'Name must be at least 5 characters'],
        maxLength: [50, 'Name must be less than 50 characters'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'user email is required'],
        unique: true,
        lowercase: true,
        unique: [true, 'already registered'],
     
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false,
      },
      subscription: {
        id: String,
        status: String,
      },
address:{
  type: String,
},
phone:{
  type: String,
},
      role:{
        type: String,
        enum:['ADMIN','USER'],
        default:'USER'
      
      },
      forgotPasswordToken: {
        type: String,
      },
      forgotPasswordExpiryDate: {
        type: Date,
      },
    },
    { timestamps: true }

)
userSchema.pre('save', async function (next) {
  // If password is not modified then do not hash it
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});
userSchema.methods = {
  jwtToken() {
    return JWT.sign(
      { id: this._id, email: this.email,role:this.role, subscription: this.subscription},
      process.env.SECRET_KEY,
      { expiresIn: '24h' } // 24 hours
    );
  },

  //userSchema method for generating and return forgotPassword token
  getForgotPasswordToken() {
    const forgotToken = crypto.randomBytes(20).toString('hex');
    //step 1 - save to DB
    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(forgotToken)
      .digest('hex');

    /// forgot password expiry date
    this.forgotPasswordExpiryDate = Date.now() + 20 * 60 * 1000; // 20min

    //step 2 - return values to user
    return forgotToken;
  },
}
const  User=  model("User",userSchema);
export default User;


