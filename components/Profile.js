import React, { Component } from 'react'
import { View, Text, Image, ImageEditor, TouchableOpacity, StyleSheet } from 'react-native'
import { ImagePicker } from 'expo'

class Profile extends Component {
    state = {
        image: null,
    }
    pickImage = () => {
        ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [2,1]
        })
            .then((result) => {
                if (result.cancelled) {
                    return
                }

                ImageEditor.cropImage(
                    result.uri,
                    {
                        offset: { x: 0, y: 0 },
                        size: { width: result.width, height: result.height },
                        displaySize: { width: 200, height: 100 },
                        resizeMode: 'contain',
                    },
                    (uri) => this.setState(() => ({ image: uri })),
                    () => console.log('Error')
                )
            })
    }
    render() {
        const { image } = this.state
        return (
            <View>
                <TouchableOpacity onPress={this.pickImage}>
                    <Text>Open Camera Roll</Text>
                </TouchableOpacity>
                {image && (
                    <Image style={styles.img} source={{uri: image}}/>
                )}
            </View>
        )
    }
}

export default Profile

const styles = StyleSheet.create({
    img: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
        backgroundColor: 'black',
    }
})