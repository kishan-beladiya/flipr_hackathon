# flipr_hackathon

This is backend server code.

App code (github) : https://github.com/kishan-beladiya/flicker_hackathon_server_and_app

## Database

- mongodb
- total 4 cluster
  1. user cluster (Admin + Employee).
  2. task - work.
  3. task - meeting.
  4. task = break.
  
  
## End-points

URL : https://flipr-kishan.herokuapp.com/

POST register : /register
POST login : /login
POST add task : /task
GET get task : /task/todat/{username}
               /task/yesterday/{username}

Block user : /status/block/{username}
             /status/unblock/{username}
             
