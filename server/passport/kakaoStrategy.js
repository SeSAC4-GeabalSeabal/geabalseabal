const KakaoStrategy = require("passport-kakao").Strategy;
const Model = require("../model");

module.exports = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
    callbackURL: "http://localhost:8000/login/kakao/callback", // 카카오 로그인 Redirect URI 경로
  },
  async (accessToken, refreshToken, profile, done) => {
    console.info("___new KakaoStrategy()");
    Model.User.findOne({
      where: { user_id: profile.id },
    })
      .then((result) => {
        console.log("여기가결과", result);
        if (result === null) {
          // DB에 사용자 저장되어 있지 않으면 새로 저장
          let object = {
            user_email: profile._json && profile._json.email,
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
