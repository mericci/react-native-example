import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../../assets/styles/Global';
import AutofillAddress from './AutofillAddress';
import { useQuery } from '@apollo/react-hooks';
import RNPickerSelect from 'react-native-picker-select';
import { queries } from '../../../handlers/Queries';
import { TextInput } from 'react-native-paper';

export default function UbicationForm({ props }) {
  state = useSelector(state => state);
  dispatch = useDispatch();
  const { data, loading, error } = useQuery(queries.getRegionsAndCities);
  const [cities, setCities] = useState([])

  const onRegionSelected = (id) => {
    if (id) {
      var region = data.allRegiones.edges.find(item => item.node.id == id )
      setCities(region.node.ciudadSet.edges.map(item => ({ label: item.node.nombre, value: item.node.id })))
    } else {
      setCities([])
    }
  }

  return(
    <View>
      { loading ? <ActivityIndicator/> : 
        <View>
          <TextInput 
            label='Región'
            mode='outlined'
            dense={true}
            value=' '
            error={ props.touched.region && props.errors.region }
            style={{ marginTop: 8, }}
            render={ (inputProps) => 
              <RNPickerSelect 
                items={ data.allRegiones.edges.map(item => ({label: item.node.nombre, value: item.node.id, key: item.node.id}))}
                onOpen={inputProps.onFocus}
                onClose={inputProps.onBlur}
                onValueChange={(value) => {
                  if (value) {
                    props.values.region = value
                    inputProps.onChangeText(value)
                  } else {
                    props.values.region = ''
                    inputProps.onChangeText(' ')
                  }
                  onRegionSelected(value)
                }}
                style={{...pickerSelectStyles}}
              />
            }
          />
          { props.touched.region && props.errors.region ? 
            <Text style={globalStyles.errorText}>{props.touched.region && props.errors.region}</Text> : <View></View> 
          }

          <TextInput 
            label='Ciudad/comuna'
            mode='outlined'
            dense={true}
            value=' '
            error={ props.touched.city && props.errors.city }
            style={{ marginTop: 8, }}
            render={ (inputProps) => 
              <RNPickerSelect 
                items={cities}
                onOpen={inputProps.onFocus}
                onClose={inputProps.onBlur}
                onValueChange={(value) => {
                  if (value) {
                    props.values.city = value;
                    inputProps.onChangeText(value)
                  } else {
                    props.values.city = '';
                    inputProps.onChangeText(' ')
                  }
                }}
                style={{...pickerSelectStyles}}
              />
            }
          />
          { props.touched.city && props.errors.city ? 
            <Text style={globalStyles.errorText}>{props.touched.city && props.errors.city}</Text> : <View></View> 
          }

        </View>
      }
      <AutofillAddress props={props} />
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    paddingHorizontal: 14
  },
  inputAndroid: {
    height: 40,
    paddingHorizontal: 14,
  },
});