# passport-oauth2 (Improved Version)

General-purpose OAuth 2.0 authentication strategy for [Passport](https://www.passportjs.org/).

This project is based on [passport-oauth2](https://github.com/jaredhanson/passport-oauth2) by Jared Hanson, with significant enhancements to improve functionality and ease of use. It allows seamless integration of OAuth 2.0 authentication into your Node.js applications. By leveraging Passport, you can easily integrate OAuth 2.0-based sign-ins into any application or framework that supports [Connect](https://github.com/senchalabs/connect#readme)-style middleware, such as [Express](https://expressjs.com/).

This strategy provides generic OAuth 2.0 support. For provider-specific requirements, we recommend using dedicated strategies, which simplify configuration and handle quirks specific to each provider. You can find a [list of supported providers](https://github.com/jaredhanson/passport/wiki/Strategies).

If your project requires authentication against a provider not yet supported, you can subclass this strategy and contribute it to the open-source community.

---

## Key Enhancements in This Fork

- Improved error handling and logging for better debugging.
- Enhanced token management with support for token refresh flows.
- Streamlined configuration for easier integration.
- Updated documentation to clarify usage and integration patterns.

---

## Installation

Install the module using npm:

```bash
$ npm install passport-oauth2
```

# Usage

## Configure Strategy

The OAuth 2.0 authentication strategy requires specifying the provider's endpoints, along with a client identifier and secret. A verify callback handles the access token and user profile.

```javascript
passport.use(new OAuth2Strategy({
    authorizationURL: 'https://www.example.com/oauth2/authorize',
    tokenURL: 'https://www.example.com/oauth2/token',
    clientID: EXAMPLE_CLIENT_ID,
    clientSecret: EXAMPLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/example/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

```