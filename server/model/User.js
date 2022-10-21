const User = (Sequelize, DataTypes) => {
  const model = Sequelize.define(
    // 모델 이름
    "user",
    // 컬럼 정의
    {
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      user_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_image: {
        type: DataTypes.STRING(100),
        defaultValue: "user_default.jpg",
      },
    },
    // 모델의 옵션
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      timestamps: false,
      tableName: "user",
      freezeTableName: true,
    }
  );
  return model;
};

module.exports = User;
