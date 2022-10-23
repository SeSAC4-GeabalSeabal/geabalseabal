const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const Model = require("../model");

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:8000/login/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    console.info("___new GoogleStrategy()");
    console.log("___google profile", profile);
    Model.User.findOne({
      where: { user_id: profile.id },
    })
      .then((result) => {
        console.log("여기가결과", result);
        if (result === null) {
          // DB에 사용자 저장되어 있지 않으면 새로 저장
          let object = {
            user_email: profile._json.email,
            user_id: profile.id,
            user_name: profile._json.name,
          };
          Model.User.create(object)
            .then((result) => {
              return done(null, profile);
            })
            .catch((e) => {
              return console.log(e);
            });
        } else {
          // DB 사용자 정보 있으면 그냥 리턴
          return done(null, profile);
        }
      })
      .catch((err) => {
        return console.log(err);
      });
  }
);
