const { response } = require("express");
const Event = require("../models/Event");
const { default: mongoose } = require("mongoose");

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');
    
    res.json({
		ok: true,
        events
	});
};

const createEvents = async(req, res = response) => {
	const event = new Event(req.body);

	try {
		event.user = req.uid;

		const savedEvent = await event.save();

		res.json({
			ok: true,
			event: savedEvent,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			ok: false,
			msg: "Something went wrong.",
		});
	}
};

const updateEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({
            ok: false,
            msg: "Invalid event ID.",
        });
    }

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event does not exists.",
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User not authorized.'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

        res.json({
            ok: true,
            event: updatedEvent
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
			ok: false,
			msg: "Something went wrong.",
		});
    }
};

const removeEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event does not exists.",
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User not authorized.'
            })
        }

        await Event.findByIdAndDelete(eventId)

        res.json({
            ok: true
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Something went wrong."
        })
    }
};

module.exports = {
	getEvents,
	createEvents,
	updateEvent,
	removeEvent,
};
