import models from '../../src'

test('create a user', () => {
	const user = new models.user({
		email: 'email',
		password: '123',
		refCode: 'qwe123',
		twoFactorSecret: '2fa'
	})
	expect(user.email).toBe('email')
})
