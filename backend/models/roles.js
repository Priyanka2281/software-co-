import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  roleName: { 
    type: String, 
    required: true
 },
  accessModules: {
    type:Array
   },
  active: { 
    type: Boolean, 
    default: true
 }
},{
    timestamps:true
});

export default mongoose.model('roles', roleSchema);
