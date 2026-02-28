db.createUser({
  user: 'interviewuser',
  pwd: 'interviewpwd',
  roles: [
    { role: 'readWrite', db: 'interview-questions' }
  ]
});