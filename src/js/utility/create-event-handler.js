function createEventHandler(events, handler) {
	const eventHandlers = {};
	events.forEach(function (event) {
		var eventName = 'on' + event[0].toUpperCase() + event.substring(1).toLowerCase()
		eventHandlers[eventName] = handler;
	});
	return eventHandlers;
}

export default createEventHandler;
