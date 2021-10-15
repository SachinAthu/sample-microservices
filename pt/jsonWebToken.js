// jsonwebtoken
// current version - 8.5.3

// 1
var jwt = require('jsonwebtoken');

// 2
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

// 3
var privateKey = fs.readFileSync('private.key');

// 4
var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});

// 5
jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
    console.log(token);
});

// 6
var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

// 7
jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: 'foobar'
}, 'secret');

// 8
jwt.sign({
    data: 'foobar'
}, 'secret', { expiresIn: 60 * 60 });
   
// 9
jwt.sign({
data: 'foobar'
}, 'secret', { expiresIn: '1h' });

// 10
var decoded = jwt.verify(token, 'shhhhh');
console.log(decoded.foo)
 
// 11
jwt.verify(token, 'shhhhh', function(err, decoded) {
  console.log(decoded.foo)
});
 
// 12
try {
  var decoded = jwt.verify(token, 'wrong-secret');
} catch(err) {}
 
// 13
jwt.verify(token, 'wrong-secret', function(err, decoded) {});
 
// 14
var cert = fs.readFileSync('public.pem');
jwt.verify(token, cert, function(err, decoded) {
  console.log(decoded.foo)
});
 
// 15
var cert = fs.readFileSync('public.pem');
jwt.verify(token, cert, { audience: 'urn:foo' }, function(err, decoded) {});
 
// 16
var cert = fs.readFileSync('public.pem');
jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer' }, function(err, decoded) {});
 
// 17
var cert = fs.readFileSync('public.pem');
jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid' }, function(err, decoded) {});
 
// 18
var cert = fs.readFileSync('public.pem');
jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid', subject: 'subject' }, function(err, decoded) {});
 
// 19
var cert = fs.readFileSync('public.pem');
jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, payload) {});
 
// 20
var jwksClient = require('jwks-rsa');

// 21
var client = jwksClient({
  jwksUri: 'https://sandrino.auth0.com/.well-known/jwks.json'
});

// 22
function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// 23
jwt.verify(token, getKey, options, function(err, decoded) {
  console.log(decoded.foo) // bar
});

