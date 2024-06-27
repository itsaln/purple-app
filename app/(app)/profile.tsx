import { Image, StyleSheet, View } from 'react-native'
import { useState } from 'react'

import { Gaps } from '@/shared/tokens'
import { ImageUploader } from '@/shared/ImageUploader/ImageUploader'
import { Avatar } from '@/entities/user/ui/Avatar/Avatar'

export default function Profile() {
	const [image, setImage] = useState<string | null>(null)

	return (
		<View style={styles.container}>
			<Avatar image={image} />

			<ImageUploader onUpload={setImage} onError={(e) => console.log(e)} />
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
