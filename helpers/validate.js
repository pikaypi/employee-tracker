function validateStr(input) {
    return typeof input === 'string' && input != ''
};

function validateNum(input) {
    return typeof input === 'number' && input > 0
}

module.exports = {validateStr, validateNum};