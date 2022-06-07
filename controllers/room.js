// Controller handler to handle functionality in room page

// const roomGenerator = require('../util/roomIdGenerator.js');



// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response){
    //response.render('room', {title: 'chatroom', roomName: request.params.roomName, newRoomId: roomGenerator.roomIdGenerator()});
    response.render('room', {title: request.params.roomName, roomName: request.params.roomName, newRoomId: request.params.id, messagesHTML: request.param.messageHTML});
}





module.exports = {
    getRoom
};