var jwt = require('jsonwebtoken');

export const token = (data) => {
    var jwtToken = jwt.sign({ data }, process.env.jwt_key);
    console.log("token:", token);
    return jwtToken;
}