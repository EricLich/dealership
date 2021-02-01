const mongoose = require('mongoose');

(async () => {
    const db = mongoose.connect('mongodb://localhost:27017/dealership', {useNewUrlParser: true, useUnifiedTopology: true})
                        .then(db => console.log("DB connected"))
                        .catch(err => console.log(err));
})();