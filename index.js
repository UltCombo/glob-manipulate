'use strict';

module.exports = {
	negate: manipulator(function(glob) {
		return ~glob.lastIndexOf('!', 0) ? glob.slice(1) : '!' + glob;
	}),
	prefix: manipulator(function(glob, prefix) {
		return ~glob.lastIndexOf('!', 0) ? '!' + prefix + glob.slice(1) : prefix + glob;
	}),
	unprefix: manipulator(function(glob, prefix) {
		return glob.replace(new RegExp('^(!|)' + prefix.replace(/\W/g, '\\$&')), '$1');
	})
};

function manipulator(cb) {
	return function(globs) {
		if (typeof globs === 'string') return cb.apply(this, arguments);
		var args = [].slice.call(arguments, 1);
		return globs.map(function(glob) {
			return cb.apply(this, [glob].concat(args));
		}, this);
	};
}
