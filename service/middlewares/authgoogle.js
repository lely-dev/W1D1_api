import GoogleStrategy from "passport-google-oauth20";
import "dotenv/config";
import User from "../models/user.model.js";
import { generateJWT } from "./authentication.js";

const options = {
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_SECRET,
    callbackURL: process.env.G_CALLBACK
}

const googleStrategy = new GoogleStrategy(options, async( _, __, profile, passportNext)=>{

    try {
        // DESTRUTTURARE IL PROFILE
    const {email, given_name, family_name, sub, picture} = profile._json;

    const user = await User.findOne({email});

    if (user){
        const accToken = await createAccessToken({
            _id: user._id,
        });

        passportNext(null, {accToken});
    } else {

        const newUser = new User({
            username: email,
            googleId: sub,
        });

        await newUser.save();

        const accToken = await generateJWT({
            username: newUser.username,
        });

        passportNext(null, {accToken});

    }
    } catch (error) {
        passportNext(error);
    }

});


export default googleStrategy;
