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