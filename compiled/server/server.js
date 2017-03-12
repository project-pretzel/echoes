'use strict';

//DEPENDENCIES
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var session = require('express-session');
var app = express();

var appServer = require('./routes/appRoutes.js');
var authServer = require('./routes/authRoutes.js');
var newUserServer = require('./routes/newUserRoutes.js');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use('/public', express.static(path.join(__dirname, '/../client')));

// SESSION
app.use(session({
  secret: '666',
  resave: false,
  saveUninitialized: true
}));

// ROUTERS
app.use('/', appServer);
app.use('/querydb', appServer);
app.use('/signin', authServer);
app.use('/signup', newUserServer);
app.use('/logout', authServer);
app.use(function (req, res, next) {
  res.status(404).send('Sorry--we can\'t find that');
});

// LISTENER
app.listen(1337, function () {
  console.log('Satan is listening on port 1337.');
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9zZXJ2ZXIuanMiXSwibmFtZXMiOlsiZXhwcmVzcyIsInJlcXVpcmUiLCJib2R5UGFyc2VyIiwibW9yZ2FuIiwicGF0aCIsInNlc3Npb24iLCJhcHAiLCJhcHBTZXJ2ZXIiLCJhdXRoU2VydmVyIiwibmV3VXNlclNlcnZlciIsInVzZSIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJzdGF0aWMiLCJqb2luIiwiX19kaXJuYW1lIiwic2VjcmV0IiwicmVzYXZlIiwic2F2ZVVuaW5pdGlhbGl6ZWQiLCJyZXEiLCJyZXMiLCJuZXh0Iiwic3RhdHVzIiwic2VuZCIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFJQSxVQUFVQyxRQUFRLFNBQVIsQ0FBZDtBQUNBLElBQUlDLGFBQWFELFFBQVEsYUFBUixDQUFqQjtBQUNBLElBQUlFLFNBQVNGLFFBQVEsUUFBUixDQUFiO0FBQ0EsSUFBSUcsT0FBT0gsUUFBUSxNQUFSLENBQVg7QUFDQSxJQUFJSSxVQUFVSixRQUFRLGlCQUFSLENBQWQ7QUFDQSxJQUFJSyxNQUFNTixTQUFWOztBQUVBLElBQUlPLFlBQVlOLFFBQVEsdUJBQVIsQ0FBaEI7QUFDQSxJQUFJTyxhQUFhUCxRQUFRLHdCQUFSLENBQWpCO0FBQ0EsSUFBSVEsZ0JBQWdCUixRQUFRLDJCQUFSLENBQXBCOztBQUVBO0FBQ0FLLElBQUlJLEdBQUosQ0FBUVIsV0FBV1MsVUFBWCxDQUFzQixFQUFDQyxVQUFVLEtBQVgsRUFBdEIsQ0FBUjtBQUNBTixJQUFJSSxHQUFKLENBQVFSLFdBQVdXLElBQVgsRUFBUjtBQUNBUCxJQUFJSSxHQUFKLENBQVFQLE9BQU8sVUFBUCxDQUFSO0FBQ0FHLElBQUlJLEdBQUosQ0FBUSxTQUFSLEVBQW1CVixRQUFRYyxNQUFSLENBQWVWLEtBQUtXLElBQUwsQ0FBVUMsU0FBVixFQUFxQixZQUFyQixDQUFmLENBQW5COztBQUVBO0FBQ0FWLElBQUlJLEdBQUosQ0FBUUwsUUFBUTtBQUNkWSxVQUFRLEtBRE07QUFFZEMsVUFBUSxLQUZNO0FBR2RDLHFCQUFtQjtBQUhMLENBQVIsQ0FBUjs7QUFNQTtBQUNBYixJQUFJSSxHQUFKLENBQVEsR0FBUixFQUFhSCxTQUFiO0FBQ0FELElBQUlJLEdBQUosQ0FBUSxVQUFSLEVBQW9CSCxTQUFwQjtBQUNBRCxJQUFJSSxHQUFKLENBQVEsU0FBUixFQUFtQkYsVUFBbkI7QUFDQUYsSUFBSUksR0FBSixDQUFRLFNBQVIsRUFBbUJELGFBQW5CO0FBQ0FILElBQUlJLEdBQUosQ0FBUSxTQUFSLEVBQW1CRixVQUFuQjtBQUNBRixJQUFJSSxHQUFKLENBQVEsVUFBVVUsR0FBVixFQUFlQyxHQUFmLEVBQW9CQyxJQUFwQixFQUEwQjtBQUNoQ0QsTUFBSUUsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCLDRCQUFyQjtBQUNELENBRkQ7O0FBSUE7QUFDQWxCLElBQUltQixNQUFKLENBQVcsSUFBWCxFQUFpQixZQUFZO0FBQzNCQyxVQUFRQyxHQUFSLENBQVksa0NBQVo7QUFDRCxDQUZEIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vREVQRU5ERU5DSUVTXG52YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbnZhciBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbnZhciBtb3JnYW4gPSByZXF1aXJlKCdtb3JnYW4nKTtcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xudmFyIHNlc3Npb24gPSByZXF1aXJlKCdleHByZXNzLXNlc3Npb24nKTtcbnZhciBhcHAgPSBleHByZXNzKCk7XG5cbnZhciBhcHBTZXJ2ZXIgPSByZXF1aXJlKCcuL3JvdXRlcy9hcHBSb3V0ZXMuanMnKTtcbnZhciBhdXRoU2VydmVyID0gcmVxdWlyZSgnLi9yb3V0ZXMvYXV0aFJvdXRlcy5qcycpO1xudmFyIG5ld1VzZXJTZXJ2ZXIgPSByZXF1aXJlKCcuL3JvdXRlcy9uZXdVc2VyUm91dGVzLmpzJyk7XG5cbi8vIE1JRERMRVdBUkVcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDogZmFsc2V9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UobW9yZ2FuKCdjb21iaW5lZCcpKTtcbmFwcC51c2UoJy9wdWJsaWMnLCBleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLy4uL2NsaWVudCcpKSk7XG5cbi8vIFNFU1NJT05cbmFwcC51c2Uoc2Vzc2lvbih7XG4gIHNlY3JldDogJzY2NicsXG4gIHJlc2F2ZTogZmFsc2UsXG4gIHNhdmVVbmluaXRpYWxpemVkOiB0cnVlXG59KSk7XG5cbi8vIFJPVVRFUlNcbmFwcC51c2UoJy8nLCBhcHBTZXJ2ZXIpO1xuYXBwLnVzZSgnL3F1ZXJ5ZGInLCBhcHBTZXJ2ZXIpO1xuYXBwLnVzZSgnL3NpZ25pbicsIGF1dGhTZXJ2ZXIpO1xuYXBwLnVzZSgnL3NpZ251cCcsIG5ld1VzZXJTZXJ2ZXIpO1xuYXBwLnVzZSgnL2xvZ291dCcsIGF1dGhTZXJ2ZXIpO1xuYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoJ1NvcnJ5LS13ZSBjYW5cXCd0IGZpbmQgdGhhdCcpXG59KTtcblxuLy8gTElTVEVORVJcbmFwcC5saXN0ZW4oMTMzNywgZnVuY3Rpb24gKCkge1xuICBjb25zb2xlLmxvZygnU2F0YW4gaXMgbGlzdGVuaW5nIG9uIHBvcnQgMTMzNy4nKVxufSk7XG4iXX0=