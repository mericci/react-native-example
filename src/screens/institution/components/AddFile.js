import React, {useState} from 'react';
import { View, Keyboard } from 'react-native';
import { TextInput, Divider, } from 'react-native-paper';

const { ReactNativeFile } = require('apollo-upload-client');
//import { ReactNativeFile } from 'extract-files';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';



export default function AddFile({file, filesUpload, setFilesUpload}) {
    const [textValue, setTextValue] = useState('')

    pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: '*/*',
            copyToCacheDirectory: true,
        });
        setTextValue(result.name)
        if(result.type === "success"){
            setFilesUpload((prevState) => {
                return ({ ...prevState, [file.node.id]: result})
            })
        } else {
            setFilesUpload((prevState) => {
                return ({ ...prevState, [file.node.id]: ''})
            })
        }  
    }
    

    return (
        <View>
            <TextInput
                style={{ marginTop: 8, }}
                mode='outlined'
                dense={true}
                label={file.node.nombre}
                onFocus={()=>{Keyboard.dismiss(); pickDocument()}}
                value={textValue}
            />
        </View>
    );

}