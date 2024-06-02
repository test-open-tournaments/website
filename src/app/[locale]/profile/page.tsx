import { getSession } from '@session'
import SignInButton from '~/components/sign-in-button'

export default async function ProfilePage() {
	const session = await getSession()

	return (
		<main>
			<h1>Profile</h1>
			{session && <p>Username: {session.user.osu_name}</p>}
			{!session && (
				<div>
					<p>Not logged in</p>
					<SignInButton />
				</div>
			)}
		</main>
	)
}
