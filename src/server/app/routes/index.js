module.exports = (app) => {
    app.get('/api/item', (req, res) => {
        return res.json({
            ok: true
        });
    });
};