// Controller handler to handle functionality in meal page

// const roomGenerator = require('../util/roomIdGenerator.js');


// Example for handle a get request at '/:roomName' endpoint.
function createMeal(request, response){
    //response.render('rooms', {title: 'chatroom', roomName: request.params.roomName, newRoomId: roomGenerator.roomIdGenerator()});

    response.render('meal', {title: "Meal"});

}





module.exports = {
    createMeal
};
