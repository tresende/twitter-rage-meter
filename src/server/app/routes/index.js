const metter = require('../repository/metter');

module.exports = (app) => {
    app.get('/api/item', (req, res) => {
        const data = metter.getMetter(['a', 'b'])
        return res.json({
            ok: true,
            data
        });
    });
};