const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Model = require('../model');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET, 
    callbackURL: "http://localhost:8000/login/google/callback",  
  },
  function(accessToken, refreshToken, profile, done) {
    console.info('___new GoogleStrategy()');
    console.log('___google profile', profile);
    Model.User.findOne({
        where : { user_id : profile.id}
    })
    .then(result => {
      console.log('여기가결과',result);
      if (result === null) {
        // DB에 사용자 저장되어 있지 않으면 새로 저장
        let object = {
            user_email: profile._json && profile._json.email,
            user_id : profile.id
        };
        Model.User.create(object)
        .then((result) => {
            return done(null, profile);
        })
        .catch((e)=> console.log(e));
      }
      // DB 사용자 정보 있으면 그냥 리턴
      return done(null, profile);
    })
    .catch(err => {
      console.log(err);
    })
  }
));

// login이 최초로 성공했을 때만 호출되는 함수
passport.serializeUser(function(user, done) {
  done(null, user);
}); 

// 사용자가 페이지를 방문할 때마다 호출되는 함수
passport.deserializeUser(function(user, done) {
  done(null, user);
});