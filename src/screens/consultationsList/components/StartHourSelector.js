import React, {useState} from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {OutlinedTextField} from 'react-native-material-textfield';


export default function StartHourSelector({formikProps}) {
    var hourRef = React.createRef();
    var hourRefAnd = React.useRef(null);
    const [hours, setHour] = useState(new Date());
    const [show, setShow] = useState(false);
    
    
    const onChangeIos = (event, selectedTime) => {
        setHour(selectedTime);
        var hour = String(selectedTime.getHours())
        var minutes = String(selectedTime.getMinutes())
        if(hour.length === 1){
            hour = '0' + hour;
        }
        if(minutes.length === 1){
            minutes = '0' + minutes;
        }
        formikProps.values.start_hour = hour + ':' + minutes +  ':00'
        hourRef.current.setValue(hour + ':' + minutes);
    };

    const onChangeAndroid = (event, date) => {
        if (date !== undefined){
            setShow(false)
            setHour(date);
            var hour = String(date.getHours())
            var minutes = String(date.getMinutes())
            if(hour.length === 1){
                hour = '0' + hour;
            }
            if(minutes.length === 1){
                minutes = '0' + minutes;
            }
            formikProps.values.start_hour = hour + ':' + minutes +  ':00'
            hourRefAnd.current.setValue(hour + ':' + minutes);
        }
        if (date === undefined) {
            setShow(false)
        }
    };

    if (Platform.OS ==='ios'){
        return (
            <View>
                
                <TouchableWithoutFeedback onPress={() => {setShow(!show)}} >
                    <View>
                        <OutlinedTextField 
                            ref={hourRef}
                            label='Hora de Inicio'
                            value='00:00'
                            editable={false}
                                
                        />
                    </View>
                </TouchableWithoutFeedback>
                { show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={hours}
                        onChange={onChangeIos}
                        locale="es-ES"
                        mode='time'
                    />
                )}
            </View>
        )
    } else if (Platform.OS ==='android'){
        return (
            <View>
                { show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={hours}
                        onChange={onChangeAndroid}
                        locale="es-ES"
                        mode='time'
                    />
                )}
                <TouchableOpacity onPress={() => {setShow(true)}} >
                    <View> 
                        <OutlinedTextField 
                            ref={hourRefAnd}
                            label='Hora de Inicio'
                            value='00:00'
                            editable={false}    
                        />
                    </View>
                </TouchableOpacity>
                
                
                
            </View>

        )
    }
  }