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
    /**
     ** user
     {
      id: '105281008597604287013',
      name: '검은냥냥이',
      email: 'phongdaegi58@gmail.com',
      image: 'https://lh3.googleusercontent.com/a-/AFdZucrkhPevLtplYMyg3S5ohvEoJt0B7lvLeMy5GPlsog=s96-c'
    }
    ** account
    {
      provider: 'google',
      type: 'oauth',
      providerAccountId: '105281008597604287013',
      access_token: 'ya29.A0AVA9y1sG6JxE2VoTaJN4Gz4HGZ_82qlMbgk-h7l-NQEQ7MPnDZEgtjCoanWhs9rQ2x4RvqM9nUm-dVmuA5ALLdQ5YeHeU-9hRA2WQUa_Zd5yttIfXmootXH0Mp_pEAfR3UKIFBOYYFopHQeukPkjjQkQO4QYYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4SnV1S181WlVLQ0ZnVHZLOHdLNDVJdw0163',
      expires_at: 1659119877,
      scope: 'https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile',
      token_type: 'Bearer',
      id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjA3NGI5MjhlZGY2NWE2ZjQ3MGM3MWIwYTI0N2JkMGY3YTRjOWNjYmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyODEwMzkwNDg5NzQtZnNvMjR2ZTFyMTJpZGo2ZW5uYjZvdW9uZG51am5sbzQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyODEwMzkwNDg5NzQtZnNvMjR2ZTFyMTJpZGo2ZW5uYjZvdW9uZG51am5sbzQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDUyODEwMDg1OTc2MDQyODcwMTMiLCJlbWFpbCI6InBob25nZGFlZ2k1OEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IklMa1pkQVd4cXp0ZnNyWnhDUGNzbVEiLCJuYW1lIjoi6rKA7J2A64Ol64Ol7J20IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BRmRadWNya2hQZXZMdHBsWU15ZzNTNW9odkVvSnQwQjdsdkxlTXk1R1Bsc29nPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IuuDpeuDpeydtCIsImZhbWlseV9uYW1lIjoi6rKA7J2AIiwibG9jYWxlIjoia28iLCJpYXQiOjE2NTkxMTYyNzYsImV4cCI6MTY1OTExOTg3Nn0.Ij9228HUxqWOQfLgcl50FGieVJz4cAp66HpWDq3673x8N5pCIH5oPGZtWjkn1OM7_9LzmADXZ6AxWcAegpMHSiAca8G9VYcwmB8f1fwhe7VexBgDm9ngGgRMd_XdD4yPjCbp8LYmOruhPJS30QAsNDKKa5MRu8Bx-EdCPvqgRbxoeKMg7N85d8a0vNZhLyRumwAAPiYf7lFa13SZ2n8yQQqorHaJUJ0_ecFN_OkbLq1eX7y2zVD1WCwpPeXvwGVVlGv9xQ72UMToftp6lcGiYFedMupivMtEx3olE1nLGOlz8MiLmzL7nG1k4tsUeXsxrlsrWOLbYd0ytIEIeBsCXA'
    }
    ** profile
    {
      iss: 'https://accounts.google.com',
      azp: '281039048974-fso24ve1r12idj6ennb6ouondnujnlo4.apps.googleusercontent.com',
      aud: '281039048974-fso24ve1r12idj6ennb6ouondnujnlo4.apps.googleusercontent.com',
      sub: '105281008597604287013',
      email: 'phongdaegi58@gmail.com',
      email_verified: true,
      at_hash: 'ILkZdAWxqztfsrZxCPcsmQ',
      name: '검은냥냥이',
      picture: 'https://lh3.googleusercontent.com/a-/AFdZucrkhPevLtplYMyg3S5ohvEoJt0B7lvLeMy5GPlsog=s96-c',
      given_name: '냥냥이',
      family_name: '검은',
      locale: 'ko',
      iat: 1659116276,
      exp: 1659119876
    }
    */
    async signIn({ user, account, profile }) {
      switch (account.provider) {
        case "google":
          user.provider = "google";
          break;
      }

      user.providerId = user.id;

      const response = await axios.post("/oauth/login", user);
      user.accessToken = response.data.result.access_token;
      user.refreshToken = response.data.result.refresh_token;
      return true;
    },
    async jwt({ token, user }) {
      let result = token;
      if (user) {
        if (Date.now() < token.accessTokenExpires) {
          result.user = user;
          result.accessTokenExpires = Date.now() + 10;

          result.accessToken = user.accessToken;
          result.refreshToken = user.refreshToken;
        } else {
          result = await refreshAccessToken(user.refreshToken);
        }
      }
      return result;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      delete token.user.accessToken;
      delete token.user.refreshToken;
      session.user = token.user;

      return session;
    },
  },
  secret: "AFAFAF wAFAWFA AFAWFWAF",
});

async function refreshAccessToken(token) {
  try {
    const response = await axios.post("/oauth/refresh", { token: token });
    const tokens = response.data.result;

    return {
      user: tokens.user,
      accessToken: tokens.access_token,
      accessTokenExpires: Date.now() + 10,
      refreshToken: tokens.refresh_token,
    };
  } catch (error) {
    return error;
  }
}
