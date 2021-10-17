// passport, jsonwebtoken

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            return done(null, user);
        });
    }
));

passport.use(new LocalStrategy()); 

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {});

var app = express();

app.use(require('cookie-parser')());

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.post('/login', 
        passport.authenticate('local', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }));

var jwt = require('jsonwebtoken');

var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

var privateKey = fs.readFileSync('private.key');

var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});

jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
    console.log(token);
});

var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: 'foobar'
}, 'secret');

jwt.sign({
    data: 'foobar'
}, 'secret', { expiresIn: 60 * 60 });
   
jwt.sign({
data: 'foobar'
}, 'secret', { expiresIn: '1h' });

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
 