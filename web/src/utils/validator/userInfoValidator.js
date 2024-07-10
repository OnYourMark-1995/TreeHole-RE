import { isEmail, isStringEmpty, patternCheck, stringLengthCheck } from "./commonValidator";

const userInfoValidator = {
  username: (value) => {
    if(isStringEmpty(value)){
      throw new Error("用户名不能为空！")
    }

    if( stringLengthCheck(value, 1, 30) != 0 
        || !patternCheck(value, '^[\\u4e00-\\u9fa5a-zA-Z0-9_-]{1,30}$')
    ) {
      throw new Error("用户名由汉字、数字、_、-组成，长度为1 ~ 30个字符！")
    }
  },

  password: (value) => {
    if(stringLengthCheck(value, 6, 30) != 0){
      throw new Error("密码由6 ~ 30个字符组成！")
    }
  },

  email: (value) => {
    if(isStringEmpty(value)){
      throw new Error("电子邮箱不能为空")
    }
    if(!isEmail(value)){
      throw new Error("电子邮箱格式错误")
    }
  },

  gender: (value) => {
    if(isStringEmpty(value)){
      throw new Error("性别不能为空")
    }
    // const genderValues = ['man', 'woman', 'secret'];
    // if(!genderValues.includes(value)){
    //   throw new Error("性别的值只能是 man、woman、secret")
    // }
  }
}

export default userInfoValidator