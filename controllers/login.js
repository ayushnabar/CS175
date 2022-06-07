// Controller handler to handle functionality in room page

// const roomGenerator = require('../util/roomIdGenerator.js');


// Example for handle a get request at '/:roomName' endpoint.
function loginUser(request, response){
    //response.render('rooms', {title: 'chatroom', roomName: request.params.roomName, newRoomId: roomGenerator.roomIdGenerator()});

    response.render('login', {title: "Login"});

}





module.exports = {
    loginUser
};
