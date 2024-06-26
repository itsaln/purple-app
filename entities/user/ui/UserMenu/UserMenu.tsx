import { Image, View, StyleSheet, Text } from 'react-native'

import { IUser } from '@/entities/user/model/user.model'

import { Colors, Fonts, Gaps } from '@/shared/tokens'

export function UserMenu({ user }: { user: IUser | null }) {
	if (!user) return

	return (
		<View style={styles.container}>
			{user.photo ? (
				<Image style={styles.image} source={{ uri: user.photo }} />
			) : (
				<Image style={styles.image} source={require('../../../../assets/images/avatar.png')} />
			)}
			<Text style={styles.name}>{user.name} {user.surname}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: Gaps.g8,
		marginTop: 30
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 30,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: Colors.white,
		objectFit: 'cover'
	},
	name: {
		fontFamily: Fonts.regular,
		fontSize: Fonts.f16,
		color: Colors.white,
		marginTop: 5
	}
})
