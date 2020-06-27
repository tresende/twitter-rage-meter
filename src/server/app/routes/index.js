const metter = require('../repository/metter');

module.exports = (app) => {
    app.get('/api/item', async (req, res) => {
        const data = await metter.getMetter(['a', 'b'])
        return res.json({
            ok: true,
            data
        });
    });
};