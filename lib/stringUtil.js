var placeholderRE = /\{\{\s*([^{}|]+?)(?:\s*\|\s*([^{}|]+))?\s*\}\}/g;
var capitalizeRE = /^\w/;
var camelizeRE = /-([a-z])/ig;

var filterMap = {
    'capitalize': capitalize,
    'xapitalize': xapitalize,
    'camelize': camelize,
    'toLowerCase': function(str) {
        return str.toLowerCase();
    },
    'toUpperCase': function(str) {
        return str.toUpperCase();
    }
};

function format(template, data) {
    if (!template) {
        return '';
    }

    if (data == null) {
        return template;
    }

    return template.replace(
        placeholderRE,
        function(match, key, filter) {
            var replacer = data[key];
            if (typeof replacer === 'function') {
                replacer = replacer(key);
            }

            filter = filter && filterMap[filter];
            return replacer == null ? '' : typeof filter === 'function' ? filter(replacer) : replacer;
        }
    );
}

function camelize(s) {
    return s.replace(camelizeRE, function(m,char) {
        return char.toUpperCase();
    });
}


function capitalize(str) {
    return str.replace(capitalizeRE, function(s) {
        return s.toUpperCase();
    });
}

function xapitalize(str) {
    return str.replace(capitalizeRE, function(s) {
        return s.toLowerCase();
    });
}

module.exports = {
    format: format,
    capitalize: capitalize,
    xapitalize: xapitalize
};