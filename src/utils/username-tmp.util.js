export function createTmpUsername(lastName, firstName) {
    return `${firstName}.${lastName}`
        .toLowerCase()
        .replace(/\s+/g, '')
        .normalize('NFKD')
        .replace(/[^\w.]/g, '');
}
