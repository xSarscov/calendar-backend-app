const { Router } = require("express");

const { validateJwt } = require("../middlewares/validateJwt");
const {
	getEvents,
	createEvents,
	updateEvent,
	removeEvent,
} = require("../controllers/events");

const router = Router();

router.use(validateJwt);

router.get("/", getEvents);

router.post("/new", createEvents);

router.put("/:id", updateEvent);

router.delete("/:id", removeEvent);

module.exports = router;
