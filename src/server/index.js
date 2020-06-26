const app = require('./config/express')();
const express = require('express');

app.listen(3000, () => console.log("servidor rodando"))