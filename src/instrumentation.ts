import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn: "https://b12ee904bd9dcb537fbd75790c01b971@o4506928614080512.ingest.us.sentry.io/4507158573481984",
      tracesSampleRate: 1.0,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,

      // uncomment below line to enable Spotlight (https://spotlightjs.com)
      // spotlight: process.env.NODE_ENV === 'development',
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: "https://b12ee904bd9dcb537fbd75790c01b971@o4506928614080512.ingest.us.sentry.io/4507158573481984",
      tracesSampleRate: 1.0,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,
    });
  }
}
