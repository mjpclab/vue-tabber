function createEventHandler(events, handler) {
	const eventHandlers = {};
	events.forEach(function (event) {
		eventHandlers[event] = handler;
	});
	return eventHandlers;
}

export default createEventHandler;
