import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/ddzsvm8i9/image/upload/v1765892493/profile-removebg-preview_njo03b.png",
    },
    role: {
      type: String,
      enum: ["admin", "user", "deliveryman"],
      default: "user",
    },
    addresses: [
      {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("DEBUG - User in matchPassword:", {
    _id: this._id,
    hasPassword: !!this.password,
    passwordType: typeof this.password,
  });

  if (!this.password) {
    throw new Error("Password field is missing from user document");
  }

  if (!enteredPassword) {
    throw new Error("No password provided for comparison");
  }

  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});



userSchema.pre("save", async function () {
  if (this.isModified("addresses")) {
    let foundDefault = false;

    this.addresses.forEach((add) => {
      if (add.isDefault) {
        if (!foundDefault) {
          foundDefault = true;
        } else {
          add.isDefault = false;
        }
      }
    });
  }
});


const User = mongoose.model("user", userSchema);

export default User;
