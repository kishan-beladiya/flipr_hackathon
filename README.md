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

1. POST register : /register
2. POST login : /login
3. POST add task : /task
4. ET get task : /task/todat/{username}
               /task/yesterday/{username}

5. Block user : /status/block/{username}
             /status/unblock/{username}
             
