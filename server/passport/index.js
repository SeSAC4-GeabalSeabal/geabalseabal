const passport = require('passport');
const google = require('./googleStrategy');

// login이 최초로 성공했을 때만 호출되는 함수
passport.serializeUser(function(user, done) {
    done(null, user);
  }); 
  
  // 사용자가 페이지를 방문할 때마다 호출되는 함수
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });