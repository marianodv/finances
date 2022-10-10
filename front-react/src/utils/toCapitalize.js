const toCapitalize = (value) => {
    return String(value).replace(/\b\w/g, l => l.toUpperCase())
}

export default toCapitalize