import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import {OutlinedTextField,} from 'react-native-material-textfield';

import * as DocumentPicker from 'expo-document-picker';

export default function AddFile({file, filesUpload, setFilesUpload}) {

    var inputRef = React.createRef();

    pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: '*/*',
            copyToCacheDirectory: true,
        });
        inputRef.current.setValue(result.name)
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
        <View key={file.node.id}>
            <TouchableWithoutFeedback onPress={pickDocument}>
                <View>
                <OutlinedTextField 
                    ref={inputRef}
                    label={file.node.nombre}
                    editable={false}
                />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );

}