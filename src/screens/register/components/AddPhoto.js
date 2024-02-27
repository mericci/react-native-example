import React, {useState, useEffect} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { OutlinedTextField,} from 'react-native-material-textfield';

const { ReactNativeFile } = require('apollo-upload-client');
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';



export default function AddPhoto({profilePhoto, setProfilePhoto, askPhoto, setAskPhoto}) { 
    const [textValue, setTextValue] = useState('')

    var inputRef = React.createRef();

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      };
    
    useEffect(() => {
        if(!askPhoto){
            getPermissionAsync()
        }
    })

    _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            var res = result.uri.split('/')
            var name = res[res.length - 1]
            inputRef.current.setValue(name)
            const image = new ReactNativeFile({
                uri: result.uri,
                name: name,
                type: result.type + '/*'
            })
            setProfilePhoto(image);
          } else {
            inputRef.current.setValue('')
            setProfilePhoto({})
          }
        } catch (E) {
          {}
        }
      };

    return (
        <View>
            <TouchableWithoutFeedback onPress={setAskPhoto(true) , _pickImage}>
                <View>
                <OutlinedTextField 
                    ref={inputRef}
                    label='Foto de Perfil'
                    editable={false}
                    value={textValue}
                />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );

}