const app = require('./app');
const db = require('./database');

app.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}`));