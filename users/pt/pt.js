// jsonwebtoken, jwt-decode, passport-local

var decoded = jwt.verify(token, 'shhhhh');
console.log(decoded.foo)
 
jwt.verify(token, 'shhhhh', function(err, decoded) {
  console.log(decoded.foo)
});
 
try {
  var decoded = jwt.verify(token, 'wrong-secret');
} catch(err) {}
 
jwt.verify(token, 'wrong-secret', function(err, decoded) {});
 
var cert = fs.readFileSync('public.pem');
jwt.verify(token, cert, function(err, decoded) {
  console.log(decoded.foo)
});
 
var cert = fs.readFileSync('public.pem');
jwt.verify(token, cert, { audience: 'urn:foo' }, function(err, decoded) {});
 
var cert = fs.readFileSync('public.pem');
jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer' }, function(err, decoded) {});
 
var cert = fs.readFileSync('public.pem');
jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid' }, function(err, decoded) {});
 
var cert = fs.readFileSync('public.pem');
jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid', subject: 'subject' }, function(err, decoded) {});
 
var cert = fs.readFileSync('public.pem');
jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, payload) {});
 
var jwksClient = require('jwks-rsa');

var client = jwksClient({
  jwksUri: 'https://sandrino.auth0.com/.well-known/jwks.json'
});

import jwt_decode from "jwt-decode";
 
var token = "eyJ0eXAiO.../// jwt token";

var decoded = jwt_decode(token);
 
console.log(decoded);
 
var decodedHeader = jwt_decode(token, { header: true });

passport.use(new LocalStrategy(
  function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
      });
  }
));

passport.use(new LocalStrategy(
  function(username, password, done) {}
));

passport.use(new LocalStrategy());

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
  res.redirect('/');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }));