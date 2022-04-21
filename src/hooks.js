import cookie from 'cookie'

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.user = cookies.user
	event.locals.userId = cookies.userId
	const response = await resolve(event);
	response.headers['set-cookie'] = `user=${event.locals.user || ''};  path=/; HttpOnly`;
	response.headers['set-cookie'] = `userId=${event.locals.userId || ''};  path=/; HttpOnly`;
	return response
}

export async function getSession(request) {
	return {
		user: request.locals.user
		userId: request.locals.userId
	}
}