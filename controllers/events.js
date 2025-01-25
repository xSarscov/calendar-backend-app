const { response } = require('express');

const getEvents = (req, res = response) => {
    res.json({
        ok: true,
    })
}

const createEvents = (req, res = response) => {

    res.json({
        ok: true
    })
}

const updateEvent = (req, res = response) => {

    res.json({
        ok: true
    })
}

const removeEvent = (req, res = response) => {
    res.json({
        ok: true,
    })
}

module.exports = {
    getEvents,
    createEvents,
    updateEvent,
    removeEvent,
}