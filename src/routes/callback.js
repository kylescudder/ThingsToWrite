const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

export async function get(request) {
	const code = request.url.searchParams.get('code')

	const token = await getToken(code)
	const user = await getUser(token)
	request.locals.userName = user.name
	request.locals.userId = user.id
	return {
		status: 302,
		headers: {
			location: '/',
			'set-cookie': [
				`userName=${user.name || ''}; Path=/; HttpOnly`,
				`userId=${user.id || ''}; Path=/; HttpOnly`
			]
		}
	};
}
function getToken(code) {
	const url = 'https:github.com/login/oauth/access_token';
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			code
		})
	})
		.then((response) => response.json())
		.then((data) => data.access_token);
}
function getUser(token) {
	const url = 'https://api.github.com/user';
	return fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => response.json())
}
