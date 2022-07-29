import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
axios.defaults.baseURL = process.env.SERVER_URL;
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // 원하는 소셜 provider를 같은 방식으로 추가
  ],
  callbacks: {
    signIn: async function signIn({ user, account, metadata }) {
      if (account.provider == "google") {
        user.provider = "google";
        user.providerId = user.id;
      }
      // 회원 가입과 로그인 동시에 진행할 수 있는 API => Token 발급
      const response = await axios.post("/oauth/login", user);
      user = response.data.result.user;
      user.accessToken = response.data.result.access_token;
      user.refreshToken = response.data.result.refresh_token;
      return true;
    },
    jwt: async function jwt({ token, user, account }) {
      // Initial sign in
      console.log(token, " JWT");
      if (user) {
        if (Date.now() > token.accessTokenExpires && user) {
          return refreshAccessToken(user.refreshToken);
        } else {
          return {
            accessToken: user.accessToken,
            accessTokenExpires: Date.now() + 12,
            refreshToken: user.refreshToken,
            user,
          };
        }
      }

      return token;

      // Return previous token if the access token has not expired yet
    },
    session: async function session({ session, token }) {
      session.accessToken = session.accessToken;
      session.refreshToken = session.refreshToken;
      session.user = token.user;
      console.log(token, "Session");
      console.log(session, "Session");
      // await axios.post("", session.user);

      return session;
    },
  },
  secret: "AFAFAF wAFAWFA AFAWFWAF",
});

async function refreshAccessToken(token) {
  try {
    const response = await axios.post("/oauth/refresh", { token: token });

    const tokens = response.data.result;
    console.log("Refresh Token");

    return {
      user: tokens.user,
      accessToken: tokens.access_token,
      accessTokenExpires: Date.now() + 12,
      refreshToken: tokens.refresh_token,
    };
  } catch (error) {
    return error;
  }
}
