import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";
import type { OAuthStrategy } from "@clerk/types";

import { handleOAuthSignIn } from "~/utils/auth";
import { getBaseUrl } from "~/utils/get-base-url";

export function SignInScreen() {
  const { push } = useRouter();

  const { isLoaded, signIn, setSession } = useSignIn();
  if (!setSession) return null;
  if (!isLoaded) return null;

  const redirectIfSignedIn = async () => {
    if (signIn.status == "complete") {
      await push("/");
    }
  };

  const handleOAuthSignInWithPress = async (strategy: OAuthStrategy) => {
    await handleOAuthSignIn(strategy, setSession, signIn);
    await redirectIfSignedIn();
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <button
        className="btn btn-primary"
        onClick={() => handleOAuthSignInWithPress("oauth_google")}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default SignInScreen;
