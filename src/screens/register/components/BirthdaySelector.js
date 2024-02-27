import React, {useState} from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {OutlinedTextField} from 'react-native-material-textfield';
import Modal from 'react-native-modal';

export default function BirthdaySelector({formikProps}) {
  var inputRef = React.createRef();
  var inputRefAnd = React.useRef(null);
  const [dates, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  
  const onChangeIos = (event, selectedDate) => {
    setDate(selectedDate);
    formikProps.values.birthdate = String(selectedDate.getFullYear()) + '-' + String(selectedDate.getMonth() + 1) +  '-' + String(selectedDate.getDate())
    inputRef.current.setValue(String(selectedDate.getDate()) + '-' + String(selectedDate.getMonth() + 1) +  '-' + String(selectedDate.getFullYear()));
  };
  
  const onChangeAndroid = (event, date) => {
    if (date !== undefined){
      setShow(false)
      setDate(date);
      formikProps.values.birthdate = String(date.getFullYear()) + '-' + String(date.getMonth() + 1) +  '-' + String(date.getDate());
      inputRefAnd.current.setValue(String(date.getDate()) + '-' + String(date.getMonth() + 1) +  '-' + String(date.getFullYear()));
    }
    if (date === undefined) {
      setShow(false)
    }
  };
  
  if (Platform.OS ==='ios'){
    return (
      <View>
        <Modal visible={show} animationType='slide' transparent={false} style={{margin:200}} >
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',}}
          >   
            <View style={{width: 300, height: 300}}>
              <DateTimePicker
                testID="dateTimePicker"
                //timeZoneOffsetInMinutes={0}
                value={dates}
                display="default"
                onChange={onChangeIos}
                locale="es-ES"
              />
              <Button title="Confirmar" onPress={()=>{setShow(false)}}/>
            </View>
          </View>
        </Modal>

        <TouchableWithoutFeedback onPress={() => {setShow(true)}} >
          <View>
            <OutlinedTextField 
              ref={inputRef}
              label='Fecha de Nacimiento'
              value={String(new Date().getDate()) + '-' + String(new Date().getMonth() + 1) +  '-' + String(new Date().getFullYear())}
              editable={false}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  } else if (Platform.OS ==='android'){
    return (
      <View>
        { show && (
          <DateTimePicker
            testID="dateTimePicker"
            mode="date"
            value={dates}
            onChange={onChangeAndroid}
            locale="es-ES"
          />
        )}

        <TouchableOpacity onPress={() => {setShow(true)}} >
          <OutlinedTextField 
            ref={inputRefAnd}
            label='Fecha de Nacimiento'
            value={String(new Date().getDate()) + '-' + String(new Date().getMonth() + 1) +  '-' + String(new Date().getFullYear())}
            //value={formikProps.values.birthdate}
            editable={false}    
          />
        </TouchableOpacity>
      </View>
    )
  }
}