import 'server-only'

import { REST } from '@discordjs/rest'
import Auth, { DiscordHTTPError } from 'discord-oauth2'
import { env } from '@env'

const rest = new REST({ version: '10' }).setToken(env.DISCORD_BOT_TOKEN)

export const discordAuth = new Auth({
  clientId: env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
  clientSecret: env.DISCORD_CLIENT_SECRET,
  redirectUri: env.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
  credentials: Buffer.from(
    `${env.NEXT_PUBLIC_DISCORD_CLIENT_ID}:${env.DISCORD_CLIENT_SECRET}`
  ).toString('base64')
})

export function getDiscordAuthUrl(redirectUri?: string) {
  return discordAuth.generateAuthUrl({
    scope: ['identify', 'guilds.members.read'],
    redirectUri: redirectUri ?? env.NEXT_PUBLIC_DISCORD_REDIRECT_URI
  })
}

export function needRefresh(err: unknown) {
  return err instanceof DiscordHTTPError && err.code === 401
}

// export async function refreshDiscordToken(tokens: Tables<'tokens'>) {
// 	const newTokens = await discordAuth.tokenRequest({
// 		refreshToken: tokens.discord_refresh_token,
// 		grantType: 'refresh_token',
// 		scope: 'identify guilds.members.read'
// 	})

// 	const supabase = createClient(cookies())
// 	const { error } = await supabase
// 		.from('tokens')
// 		.update({
// 			discord_access_token: newTokens.access_token,
// 			discord_refresh_token: newTokens.refresh_token
// 		})
// 		.eq('osu_id', tokens.osu_id)

// 	if (error) return null
// 	return newTokens.access_token
// }

// export async function getGuildMember(tokens: Tables<'tokens'>) {
// 	try {
// 		return await discordAuth.getGuildMember(
// 			tokens.discord_access_token,
// 			env.GUILD_ID
// 		)
// 	} catch (err) {
// 		if (needRefresh(err)) {
// 			const newAccessToken = await refreshDiscordToken(tokens)
// 			if (!newAccessToken) return null
// 			return await discordAuth.getGuildMember(newAccessToken, env.GUILD_ID)
// 		}
// 		return null
// 	}
// }

// interface AddGuildMemberParams {
// 	osuName: string
// 	discordId: string
// 	roles: string[]
// 	tokens: Tables<'tokens'>
// }

// export async function addGuildMember({
// 	osuName,
// 	discordId,
// 	roles,
// 	tokens
// }: AddGuildMemberParams) {
// 	const updateInfo = {
// 		guildId: env.GUILD_ID,
// 		botToken: env.BOT_TOKEN,
// 		userId: discordId,
// 		roles,
// 		nickname: osuName
// 	}

// 	try {
// 		return await discordAuth.addMember({
// 			...updateInfo,
// 			accessToken: tokens.discord_access_token
// 		})
// 	} catch (err) {
// 		if (needRefresh(err)) {
// 			const newAccessToken = await refreshDiscordToken(tokens)
// 			if (!newAccessToken) return null
// 			return await discordAuth.addMember({
// 				...updateInfo,
// 				accessToken: newAccessToken
// 			})
// 		}
// 		return null
// 	}
// }

// type UpdateGuildMemberParams = Partial<AddGuildMemberParams> & {
// 	discordId: string
// 	tokens: Tables<'tokens'>
// }

// export async function updateGuildMember({
// 	osuName,
// 	discordId,
// 	roles
// }: UpdateGuildMemberParams) {
// 	try {
// 		return (await rest.patch(Routes.guildMember(env.GUILD_ID, discordId), {
// 			body: { nick: osuName, roles }
// 		})) as OAuth.Member
// 	} catch (err) {
// 		return null
// 	}
// }

// export async function sendMessage(
// 	channelId: string,
// 	content: RESTPostAPIChannelMessageJSONBody
// ) {
// 	try {
// 		return (await rest.post(Routes.channelMessages(channelId), {
// 			body: content
// 		})) as APIMessage
// 	} catch (err) {
// 		return null
// 	}
// }
