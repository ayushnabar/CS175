# Assignment4 Concentrator

> Brandon Tran and Jai Radhakrishnan
> CS110 - Lab 4

## Project Description
<!-- you can include known bugs, design decisions, external references used... -->
> Please run "npm install" in the terminal before running this code.

> In this lab, we created a chatroom using localhost, port 8080, and mongoDB. The user can create chatrooms, send messages, and read messages.

> For this lab, instead of routing a chatroom through localhost:8080/:roomID, we chose to route the website through localhost:8080/:roomName/:roomID. This change allows multiple chatrooms with the same room name, since they will be differentiated by their roomID as well. In addition, since the roomID is the unique identifier, we have changed the method for accessing chatroom messages through the GET method. Instead of using localhost:8080/:roomName/messages, please use localhost:8080/:roomID/messages.

## Ethics Questions

### Question 1

> Give two possible chatroom moderation features and the reasons that you should implement each one

<!-- Put your answer to question 1 here -->
> For chatroom moderation features, we could implement a blacklist for certain usernames as well as a chat filter for certain messages. This is to prevent offensive or explicit usernames and messages. Without this feature, users could use offensive or triggering usernames and send inappropriate or toxic messages.