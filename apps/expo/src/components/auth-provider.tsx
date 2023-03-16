import { type ReactNode } from "react";
import { ClerkProvider } from "@clerk/clerk-expo";

import { tokenCache } from "../utils/cache";

const frontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  if (typeof frontendApi === "undefined")
    throw new Error(
      "Clerk API key not found. Please add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file.",
    );

  return (
    <ClerkProvider frontendApi={frontendApi} tokenCache={tokenCache}>
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;
