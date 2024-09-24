export const getGoogleOauthUrl = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  if (
    !process.env.NEXT_PUBLIC_GOOGLE_OATH_REDIRECT_URL ||
    !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  )
    return "/";

  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OATH_REDIRECT_URL,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};
