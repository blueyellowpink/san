const characterMap =
    'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890'

const createRandomString = (len = 6, dictionary = characterMap) =>
    Array.from(
        { length: len },
        () => dictionary[Math.floor(Math.random() * dictionary.length)]
    ).join('')

export default createRandomString
