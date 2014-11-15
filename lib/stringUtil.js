var placeholderRE = /\{\{(.+?)\}\}/g;
var capitalizeRE = /^\w/;

function format(template, data) {
    if (!template) {
        return '';
    }

    if (data == null) {
        return template;
    }

    return template.replace(
        placeholderRE,
        function(match, key) {
            var replacer = data[key];
            if (typeof replacer === 'function') {
                replacer = replacer(key);
            }

            return replacer == null ? '' : replacer;
        }
    );
}


function capitalize(str) {
    return str.replace(capitalizeRE, function(s) {
        return s.toUpperCase();
    });
};

function xapitalize(str) {
    return str.replace(capitalizeRE, function(s) {
        return s.toLowerCase();
    });
};

module.exports = {
    format: format,
    capitalize: capitalize,
    xapitalize: xapitalize
};