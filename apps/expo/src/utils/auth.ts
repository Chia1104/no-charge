import Constants from "expo-constants";
import type { OAuthStrategy, SetSession, SignInResource } from "@clerk/types";

const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   */
  const localhost = Constants.manifest?.debuggerHost?.split(":")[0];
  if (!localhost) {
    // return "https://your-production-url.com";
    throw new Error(
      "Failed to get localhost. Please point to your production server.",
    );
  }
  return `http://${localhost}:3000`;
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
