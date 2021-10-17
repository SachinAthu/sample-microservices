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