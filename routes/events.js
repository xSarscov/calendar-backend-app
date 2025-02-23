const { Router } = require("express");
const { check } = require("express-validator");

const { validateJwt } = require("../middlewares/validateJwt");
const {
	getEvents,
	createEvents,
	updateEvent,
	removeEvent,
} = require("../controllers/events");
const { fieldsValidator } = require("../middlewares/fieldsValidator");
const { isDate } = require("../helpers/isDate");

const router = Router();

router.use(validateJwt);

router.get("/", getEvents);

router.post(
	"/new",
	[
		check('title', 'Title is required.').not().isEmpty(),
		check('start', 'Start Date is required.').custom(isDate),
		check('end', 'End Date is required.').custom(isDate),
		fieldsValidator
	],
	createEvents
);

router.put("/:id", updateEvent);

router.delete("/:id", removeEvent);

module.exports = router;
