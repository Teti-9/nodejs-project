function capitalize(body) {
    return body
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
}

export default capitalize