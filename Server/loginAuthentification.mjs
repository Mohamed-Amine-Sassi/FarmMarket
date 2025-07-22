import passport from "passport";
import { Strategy } from "passport-local";
import { farmer, buyer } from "./Mongoose Schemas/mongooseUserSchema.mjs";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let findUser = await farmer.findOne({ _id: id });
    if (!findUser) {
      findUser = await buyer.findOne({ _id: id });
    }
    if (!findUser) return done({ message: "User doesn't exist" }, false);
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const requestedRole = req.body.role;
        let findUser = null;
        if (requestedRole === "farmer") {
          findUser = await farmer.findOne({ username });
        } else if (requestedRole === "buyer") {
          findUser = await buyer.findOne({ username });
        } else {
          return done(null, false, { message: "Invalid role selected" });
        }
        if (!findUser) return done("User doesn't exist", false);
        if (findUser && password != findUser.password)
          return done("Wrong password", false);
        done(null, findUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
