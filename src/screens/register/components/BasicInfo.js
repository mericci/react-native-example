import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {OutlinedTextField,} from 'react-native-material-textfield';
import BirthdaySelector from './BirthdaySelector';
import RNPickerSelect from 'react-native-picker-select';

export default function BasicInfo({formikProps, profesional}) {
  const [gender, setGender] = useState(0);
  const [date, setDate] = useState(String(new Date().getFullYear()) + '-' + String(new Date().getMonth() + 1) +  '-' + String(new Date().getDate()));
  
  if(profesional){
    var sex_props = [
      {label: 'Mujer', value: 'Mujer' },
      {label: 'Hombre', value: 'Hombre' },
    ];
  } else {
    var sex_props = [
      {label: 'Mujer', value: 'Mujer' },
      {label: 'Hombre', value: 'Hombre' },
      {label: 'Otro', value: 'Otro' },
      {label: 'Prefiero no decirlo', value: 'Vacio' },
    ];
  }
  

  return(
    <View>
      <OutlinedTextField 
        label='Nombre'
        onChangeText={formikProps.handleChange('name')}
        value={formikProps.values.name}
        error={formikProps.touched.name && formikProps.errors.name}
        onBlur={formikProps.handleBlur('name')}
        autoCorrect={false} 
      />
      
      <OutlinedTextField 
        label='Apellido'
        onChangeText={formikProps.handleChange('lastname')}
        value={formikProps.values.lastname}
        error={formikProps.touched.lastname && formikProps.errors.lastname}
        onBlur={formikProps.handleBlur('lastname')}
        autoCorrect={false} 
      />
    
      <OutlinedTextField 
        label='Email'
        onChangeText={formikProps.handleChange('email')}
        value={formikProps.values.email}
        error={formikProps.touched.email && formikProps.errors.email}
        onBlur={formikProps.handleBlur('email')}
        autoCapitalize="none" 
        autoCorrect={false} 
      />
      
      <OutlinedTextField 
        label='Contraseña'
        onChangeText={formikProps.handleChange('password')}
        value={formikProps.values.password}
        secureTextEntry={true}
        error={formikProps.touched.password && formikProps.errors.password}
        onBlur={formikProps.handleBlur('password')}
        autoCorrect={false} 
      />

      <OutlinedTextField 
        label='Confirmar Contraseña'
        onChangeText={formikProps.handleChange('password2')}
        value={formikProps.values.password2}
        secureTextEntry={true}
        error={formikProps.touched.password2 && formikProps.errors.password2}
        onBlur={formikProps.handleBlur('password2')}
        autoCorrect={false} 
      />
            
      
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 3, marginRight:7}}>
          <OutlinedTextField 
            label='RUT'
            onChangeText={formikProps.handleChange('rut')}
            value={formikProps.values.rut}
            error={formikProps.touched.rut && formikProps.errors.rut}
            onBlur={formikProps.handleBlur('rut')}
            keyboardType="number-pad" 
          />
        </View>
        <View style={{flex: 0.2, justifyContent: "center"}}>
          <Text>-</Text>
        </View>
        <View style={{flex: 1}}>
          <OutlinedTextField 
            label='DV'
            onChangeText={formikProps.handleChange('dv')}
            value={formikProps.values.dv}
            error={formikProps.touched.dv && formikProps.errors.dv}
            onBlur={formikProps.handleBlur('dv')}
          />
        </View>
      </View>
      
      <View>
        <OutlinedTextField 
          label='Género'
          value=' '
          editable={false}
          error={formikProps.touched.gender && formikProps.errors.gender}
        />
        <View style={{position: 'relative', bottom:48, marginBottom: -25}}>
          <RNPickerSelect
            items={ sex_props }
            style={{...pickerSelectStyles}}
            placeholder={{label: 'Seleccionar género'}}
            onValueChange={(value) => {
              if (value) {
                  formikProps.values.gender = value
              } else {
                  formikProps.values.gender = ''
              }
            }}
          />
        </View>
      </View>

      <View>
        <BirthdaySelector date={date} setDate={setDate} formikProps={formikProps}/>
      </View>
    </View>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: 'black',
    paddingLeft: 14,
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 25,
    fontSize: 16.5
  },
  inputAndroid: {
    color: 'black',
    paddingLeft: 14,
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 20,
    fontSize: 16.5
  },
});