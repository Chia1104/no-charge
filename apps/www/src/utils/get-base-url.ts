interface Options {
  isServer?: boolean;
}

export const getBaseUrl = (opts?: Options) => {
  if (typeof window !== "undefined" && !opts?.isServer) return "";
  if (process.env.ZEABUR_URL)
    return `https://${process.env.ZEABUR_URL.replace(/\/$/, "")}`;
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;

  return (
    process.env.NODE_ENV === "production"
      ? process.env.BASE_URL
      : "http://localhost:3000"
  )?.replace(/\/$/, "");
};
