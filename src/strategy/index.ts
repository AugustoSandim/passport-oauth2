/**
 * Creates an instance of `OAuth2Strategy`.
 *
 * The OAuth 2.0 authentication strategy authenticates requests using the OAuth
 * 2.0 framework.
 *
 * OAuth 2.0 provides a facility for delegated authentication, whereby users can
 * authenticate using a third-party service such as Facebook.  Delegating in
 * this manner involves a sequence of events, including redirecting the user to
 * the third-party service for authorization.  Once authorization has been
 * granted, the user is redirected back to the application and an authorization
 * code can be used to obtain credentials.
 *
 * Applications must supply a `verify` callback, for which the function
 * signature is:
 *
 *     function(accessToken, refreshToken, profile, done) { ... }
 *
 * The verify callback is responsible for finding or creating the user, and
 * invoking `done` with the following arguments:
 *
 *     done(err, user, info);
 *
 * `user` should be set to `false` to indicate an authentication failure.
 * Additional `info` can optionally be passed as a third argument, typically
 * used to display informational messages.  If an exception occured, `err`
 * should be set.
 */

import passport from "passport";

interface OAuth2StrategyOptions {
  authorizationURL: string;
  tokenURL: string;
  clientID: string;
  clientSecret?: string;
  callbackURL?: string;
  scope?: string | string[];
}

type VerifyCallback = (
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: (error: any, user?: any) => void
) => void;

/**
 * OAuth2Strategy class for Passport.js
 */

class OAuth2Strategy extends passport.Strategy {
  name: string;
  private _verify: VerifyCallback;

  constructor(options: OAuth2StrategyOptions, verify: VerifyCallback) {
    super();
    this.name = "oauth2";
    this._verify = verify;

    if (typeof options === "function") {
      verify = options;
      options = {} as OAuth2StrategyOptions; // Default to an empty object if not provided
    }

    if (!verify) {
      throw new TypeError("OAuth2Strategy requires a verify callback");
    }
    if (!options.authorizationURL) {
      throw new TypeError("OAuth2Strategy requires an authorizationURL option");
    }
    if (!options.tokenURL) {
      throw new TypeError("OAuth2Strategy requires a tokenURL option");
    }
    if (!options.clientID) {
      throw new TypeError("OAuth2Strategy requires a clientID option");
    }

    this.name = "oauth2";
    this._verify = verify;
  }
}

module.exports = OAuth2Strategy;
