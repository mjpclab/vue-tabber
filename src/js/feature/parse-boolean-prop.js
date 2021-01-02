function parseBooleanProp(propValue) {
	switch (propValue) {
		case false:
		case 'false':
		case undefined:
		case null:
			return false;
	}

	return true;
}

export default parseBooleanProp;
