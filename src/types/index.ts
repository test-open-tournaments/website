export interface MetadataProps {
	params: { locale: string }
}

export interface Session {
	sub: string
	user: {
		osu_name: string
		osu_avatar: string
		restricted: string
		discord_id: string
	}
	expires: Date
}
