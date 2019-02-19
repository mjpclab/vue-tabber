const invalidNormalizedPosition = {
	index: -1,
	key: undefined
};

function normalizePosition(entries, position) {
	if (typeof position === 'number') {
		return {
			index: position,
			key: entries[position] && entries[position].key
		}
	} else if (isFinite(position)) {
		const index = parseInt(position);
		return {
			index,
			key: entries[index].key
		}
	} else if (position) {
		let result = undefined;

		entries.some((entry, i) => {
			if (entry.key === position) {
				result = {
					index: i,
					key: entry.key
				};
				return true;
			}
			return false;
		});

		return result || invalidNormalizedPosition;
	} else {
		return invalidNormalizedPosition;
	}
}

export {invalidNormalizedPosition, normalizePosition};
