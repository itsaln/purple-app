import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useAtom } from 'jotai'

import { Avatar } from '@/entities/user/ui/Avatar/Avatar'
import { updateProfileAtom } from '@/entities/user/model/user.state'

import { Gaps } from '@/shared/tokens'
import { ImageUploader } from '@/shared/ImageUploader/ImageUploader'
import { Button } from '@/shared/Button/Button'

export default function Profile() {
	const [image, setImage] = useState<string | null>(null)
	const [user, updateProfile] = useAtom(updateProfileAtom)

	const submitProfile = async () => {
		if (!image) return

		await updateProfile({ photo: image })
	}

	useEffect(() => {
		if (user && user.profile?.photo) setImage(user.profile?.photo)
	}, [user])

	return (
		<View>
			<View style={styles.container}>
				<Avatar image={image} />
				<ImageUploader onUpload={setImage} onError={(e) => console.log(e)} />
			</View>
			<Button text='Сохранить' onPress={submitProfile} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Gaps.g20,
		paddingHorizontal: 30,
		paddingVertical: 20
	}
})
