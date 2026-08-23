db = db.getSiblingDB('tuition');
db.createUser({
  user: 'tuitionuser',
  pwd: 'tuitionpwd',
  roles: [
    { role: 'readWrite', db: 'tuition' }
  ]
});
