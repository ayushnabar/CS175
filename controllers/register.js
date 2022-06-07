// Controller handler to handle functionality in room page

// const roomGenerator = require('../util/roomIdGenerator.js');



// Example for handle a get request at '/:roomName' endpoint.
function registerUser(request, response){
    //response.render('rooms', {title: 'chatroom', roomName: request.params.roomName, newRoomId: roomGenerator.roomIdGenerator()});
    response.render('register', {title: "Registration"});
}





module.exports = {
    registerUser
};
