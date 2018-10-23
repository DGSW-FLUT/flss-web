<template>
  <div id="login">
    <div class="background"></div>
    <div class="header">
      <span class="title">Flipped Learning Support System</span><br>
      <span class="text">선생과 학생을 잇는, 플립드러닝 지원 시스템</span>
    </div>
    <div class="copyright">Copyright ⓒ <a href="https://github.com/DGSW-FLUT" target="_blank">FLUT</a> 2018, All rights reserved.</div>

    <div class="area-box">
      <div class="area-form">
        <div class="text">FLSS에 로그인하기</div>
        <div class="form">
          <div class="input">
            <input type="text" placeholder="ID">
          </div>
          <div class="input">
            <input type="password" placeholder="Password">
          </div>
          <button class="input base" @click="login()">
            로그인
          </button>
          <button class="input classting" @click="loginViaClassting()">
            Classting으로 로그인
          </button>
          <button class="input google" @click="login()">
            Google+로 로그인
          </button>
          <button class="input facebook" @click="login()">
            Facebook으로 로그인
          </button>
          <div class="signup">
            아이디가 없으신가요?&nbsp;&nbsp;<a>회원 가입</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {
    login() {
      alert(
        "이 메뉴는 현재 준비중입니다. 클래스팅을 통한 로그인을 이용해주세요."
      );
    },
    loginViaClassting() {
      let redirectUri = `http://${location.host}/classting_handle`;
      let string = `https://oauth.classting.com/v1/oauth2/authorize?client_id=31f1b0011be18bf840dfdef3e78261b8&redirect_uri=${redirectUri}&response_type=token`;
      console.log("uri", string);
      window.location = string;
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  list-style-type: none;
  font: {
    family: "Spoqa Han Sans", sans-serif;
  }
  z-index: 0;
  color: #2c3e50;
}

a {
  text-decoration: none;
}

html,
body {
  height: 100%;

  .background {
    background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
      url("../assets/landing_bg.jpg") center center no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: fixed;
  }

  .header {
    position: fixed;
    top: 144px;
    left: 72px;
    .title {
      font-size: 4.5em;
      color: #ecf0f1;
    }
    .text {
      font-size: 2em;
      color: #ecf0f1;
    }
  }

  .copyright {
    position: fixed;
    bottom: 36px;
    left: 36px;
    color: #ecf0f1;
    a {
      color: #46aaed;
      transition: color 0.4s;
      text-decoration: none;
      &:hover {
        color: #3498db;
        cursor: pointer;
      }
    }
  }

  .area-box {
    background: #ecf0f1;
    width: 460px;
    height: 100%;
    position: fixed;
    margin-left: calc(100% - 460px);
    z-index: 100;
    .area-form {
      text-align: center;
      width: 360px;
      margin-left: 50px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      .text {
        font-size: 1.25em;
        color: #3c4e60;
      }
      .form {
        margin-top: 40px;
        .input {
          width: 100%;
          padding: 6px;
          margin-bottom: 12px;
          border: 1px solid #dce0e1;
          border-radius: 4px;
          input {
            width: 100%;
            text-align: left;
            background: #ecf0f1;
          }
          &.base {
            margin-bottom: 24px;
          }
        }
        button {
          background-color: #2ecc71;
          transition: background-color 0.4s;
          color: #ffffff;
          &:hover {
            cursor: pointer;
            background-color: #27ae60;
          }
          &.facebook {
            background-color: #3498db;
            margin-bottom: 24px;
            &:hover {
              background-color: #2980b9;
            }
          }
          &.google {
            background-color: #e74c3c;
            &:hover {
              background-color: #c0392b;
            }
          }
          &.classting {
            background-color: #1abc9c;
            &:hover {
              background-color: #16a085;
            }
          }
        }
        .signup {
          color: #95a5a6;
          a {
            color: #3498db;
            transition: color 0.4s;
            text-decoration: none;
            &:hover {
              color: #2980b9;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
