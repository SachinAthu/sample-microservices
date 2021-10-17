// jwt-decode
// current version - 3.1.2

// 1
import jwt_decode from "jwt-decode";
 
// 2
var token = "eyJ0eXAiO.../// jwt token";

// 3
var decoded = jwt_decode(token);
 
// 4
console.log(decoded);
 
// 5
var decodedHeader = jwt_decode(token, { header: true });

// 6
console.log(decodedHeader);

// 7
const jwt_decode = require('jwt-decode');

// 8
<script src="jwt-decode.js"></script>




















