const { generateHash } = require('./users')
const { comparePassword } = require('./users')

test('can generate a password hash for user with simple string', () => {
    const password = 'examplepassword'
    const password_hash = generateHash(password)
    expect(comparePassword(password, password_hash)).toBe(true)
    expect(comparePassword(password, 'incorrect password hash')).toBe(false)
});

test('can generate a password for user with numbers and special characters', () => {
    const password = '1h2u#u%I7B./'
    const password_hash = generateHash(password)
    expect(comparePassword(password, password_hash)).toBe(true)
    expect(comparePassword(password, 'incorrect password hash')).toBe(false)
});

describe('generateHash', () => {
    it('should throw an error if the users password is empty', () => {
        expect(() => {
            generateHash('')
        }).toThrow()
    })
})

describe('comparePassword', () => {
    it('should compare the users password with their stored hash', () => {
        expect(comparePassword('password', '$2b$10$O0lIeIs7KU8YFlfTMv7fJ.25iWrRrMFd46/Nd/P.ubQVVcimS.laK')).toBe(true)
    })
})

describe('comparePassword', () => {
    it('should throw an error if the users password is not a string', () => {
        expect(() => {
            comparePassword(12345, '$2b$10$O0lIeIs7KU8YFlfTMv7fJ.25iWrRrMFd46/Nd/P.ubQVVcimS.laK')
        }).toThrow()
    })
})

describe('comparePassword', () => {
    it('should throw an error if the users password is empty', () => {
        expect(() => {
            comparePassword('', '$2b$10$O0lIeIs7KU8YFlfTMv7fJ.25iWrRrMFd46/Nd/P.ubQVVcimS.laK')
        }).toThrow()
    })
})

