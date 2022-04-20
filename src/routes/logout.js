export async function get(request) {
	request.locals.user = { user: null }

	return {
		status: 302,
		headers: {
			location: '/',
			'set-cookie': `user=; expires=Thu, 18 Dec 2013 12:00:00 UTC; Path=/; HttpOnly`
		}
	};
}