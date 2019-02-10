const RE_WHITESPACES = /\s+/;

function getValidEvents(eventList) {
	if (eventList) {
		const validEvents = [];
		const events = Array.isArray(eventList) ? eventList : String(eventList).split(RE_WHITESPACES);
		events.length && events.forEach(eventName => {
			eventName && validEvents.push(eventName);
		});
		return validEvents;
	}
}

export default getValidEvents;
