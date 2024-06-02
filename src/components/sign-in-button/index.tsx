import { headers } from 'next/headers'
import { signIn } from './actions'

export default function SignInButton() {
	const pathname = headers().get('x-pathname') ?? '/'

	return (
		<form action={signIn}>
			<input name='return-path' defaultValue={pathname} hidden />
			<button type='submit'>Sign In</button>
		</form>
	)
}
