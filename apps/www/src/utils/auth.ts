import type {
  OAuthStrategy,
  SetSession,
  SignInResource,
  SignUpResource,
} from "@clerk/types";

import { getBaseUrl } from "~/utils/get-base-url";

export const handleOAuthSignUp = async (
  strategy: OAuthStrategy,
  setSession: SetSession,
  signUp: SignUpResource,
) => {
  try {
    await signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: `${getBaseUrl()}/signup/sso-oauth/${strategy}`,
      redirectUrlComplete: `${getBaseUrl()}/signup/sso-oauth/${strategy}`,
      unsafeMetadata: { sso: true },
    });

    //get session
    const { createdSessionId } = signUp;
    if (!createdSessionId) {
      throw "Something went wrong during the Sign up flow. Please ensure that all sign up requirements are met.";
    }
    await setSession(createdSessionId);
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    console.log("error signing up with oauth on web", err);
  }
};

export const handleOAuthSignIn = async (
  strategy: OAuthStrategy,
  setSession: SetSession,
  signIn: SignInResource,
) => {
  try {
    await signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: `${getBaseUrl()}/signup`,
      redirectUrlComplete: `${getBaseUrl()}/`,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    console.log("error signing in with oauth on web", err);
  }
};
