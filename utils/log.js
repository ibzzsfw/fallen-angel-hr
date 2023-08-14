const fmt = (type, msg) => `[${type}] ${msg}`;

let log = {
    INFO: (msg) => console.log(fmt('INFO', msg)),
    WARN: (msg) => console.log(fmt('WARN', msg)),
    ERROR: (msg) => console.log(fmt('ERROR', msg))
}

export {
    log,
}