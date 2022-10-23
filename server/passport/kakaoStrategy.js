const KakaoStrategy = require("passport-kakao").Strategy;
const Model = require("../model");

module.exports = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
    callbackURL: "http://localhost:8000/login/kakao/callback", // 카카오 로그인 Redirect URI 경로
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("kakao profile: ", profile);
    Model.User.findOne({
      where: { user_id: profile.id },
    })
      .then((result) => {
        console.log("여기가결과", result);
        if (result) {
          // DB에 없는 새로운 유저
          let object = {
            user_email: profile._json && profile._json.account_email,
            user_id: profile.id,
            user_name: profile_nickname,
          };
          Model.User.create(object)
            .then((result) => {
              console.log("create new user");
              done(result, profile); // 회원가입 하고 로그인
            })
            .catch((e) => {
              return console.log(e);
            });
        } else {
          // DB 사용자 정보 있으면 그냥 리턴
          console.log("already registerd user");
          done(null, profile);
        }
      })
      .catch((err) => {
        return console.error(err);
        done(err);
      });
  }
);
