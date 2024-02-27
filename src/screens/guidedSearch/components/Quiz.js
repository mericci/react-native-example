import React, { useState } from 'react';
import QuestionCount from './QuestionCount';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-paper';
import { colors } from '../../../../assets/styles/Colors';
import { TextInput } from 'react-native-paper'

export default function Quiz (props){
    const [selectedAges, setSelectedAges] = useState([])
    const [selectedPathologies, setSelectedPathologies] =  useState([])
    const [showCities, setShowCities] = useState(false)

    const onSelectedAge = (event) => {
      setSelectedAges(event)
      props.onAnswerSelected(event)
    }

    const onSelectedPahology = (event) => {
      setSelectedPathologies(event)
      props.onAnswerSelected(event)
    }

    const onSelectedRegion = (event) => {
      setShowCities(true)
      props.onAnswerSelected(event, 'region')
    }

    const buttonTitle = () => {
      if (props.answers) {
        if (props.questionKey === 'regions') {
          if (props.answers[0].length === 0) {
            return 'Saltar'
          }
          return 'Responder'
        } else if (props.questionKey === "priceRange") {
          if (props.answers[1] === -1) {
            return 'Saltar'
          }
          return 'Responder'
        } else {
          if (props.answers.length === 0) {
            return 'Saltar'
          }
          return 'Responder'
        }
      }
      return 'Saltar'
    }

    return (
      <View style={{ flex: 1}}>
        <QuestionCount
          counter={props.questionId}
          total={props.questionTotal}
        />
        <View style={{ flex: 1, padding: 10}}> 
          <Button
            onPress={props.toggleGuidedSearch}
          >Volver a búsqueda avanzada</Button>
          <ScrollView contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}>
            <Text style={{ marginVertical: 10, fontSize: 16, textAlign: 'center'}}>{props.question}</Text>
            {
              props.questionType === "price"?
              <View>

                <View style={{marginVertical: 20}}>
                  <TextInput 
                    label='Hasta'
                    onChangeText={(value) => props.onAnswerSelected(value, 'max')}
                    keyboardType='number-pad'  
                    dense={true}
                    mode='outlined'
                  />
                </View>
              </View>:
              props.questionKey === "ageRange"?
              <View>
                <TextInput 
                  label='Su edad'
                  onChangeText={(value) => props.onAnswerSelected(value)}
                  keyboardType='number-pad'
                  dense={true}
                  mode='outlined'  
                />
              </View>:
              props.questionKey === 'allPathologies'?
              <View>
                <SectionedMultiSelect 
                  items={props.answerOptions}
                  uniqueKey="id"
                  subKey="children"
                  confirmText='Confirmar'
                  searchPlaceholderText='Buscar'
                  selectedText='seleccionados'
                  selectText='Seleccionar'
                  modalWithSafeAreaView={true}
                  showDropDowns={false}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={onSelectedPahology}
                  selectedItems={selectedPathologies}
                />
              </View>:
              props.questionKey === 'regions'?
              <View>
                <TextInput
                  dense={true}
                  mode='outlined'
                  render={(inputProps) => (
                    <RNPickerSelect
                      items={props.answerOptions['regions']}
                      style={pickerSelectStyles}
                      placeholder={{ label: 'Seleccionar región' }}
                      onValueChange={(value) => {
                        onSelectedRegion(value)
                        inputProps.value = value
                      }}
                    />
                  )}
                />
                {
                  showCities ?
                  <TextInput
                    dense={true}
                    mode='outlined'
                    render={(inputProps) => (
                      <RNPickerSelect
                        items={props.answerOptions['cities'][props.region]}
                        style={pickerSelectStyles}
                        placeholder={{ label: 'Seleccionar ciudad/comuna' }}
                        onValueChange={(value) => {
                          props.onAnswerSelected(value, 'city')
                          inputProps.value = value
                        }}
                      />
                    )}
                  /> 
                  : <View></View>
                }
              </View>:
              <View>
                <TextInput
                  dense={true}
                  mode='outlined'
                  render={(inputProps) => (
                    <RNPickerSelect
                      items={props.answerOptions}
                      style={pickerSelectStyles}
                      placeholder={{ label: 'Seleccionar' }}
                      onValueChange={(value) => {
                        props.onAnswerSelected(value)
                      }}
                    />
                  )}
                />
              </View>
            }
          </ScrollView>
          {props.questionId !== 1 &&
            <Button
              onPress={props.onPrevious}
              style={{marginVertical: 2}}
            >Atrás</Button>}
          {props.questionId !== 1 && (props.questionId !== props.questionTotal? 
            <View>
              <Button
                onPress={props.onAnswerConfirmed}
                style={{marginVertical: 2}}
              >{buttonTitle()}</Button>
              {/* <Button 
                title='Saltar'
                onPress={props.onAnswerConfirmed}
              /> */}
            </View>
            :
            <Button
              onPress={props.onAnswerConfirmed}
              style={{marginVertical: 2}}
            >Guardar</Button>
          )}
          {props.questionId === 1 &&
            <View>
              <Button
                onPress={props.onAnswerConfirmed}
                style={{marginVertical: 2}}
              >{buttonTitle()}</Button>
              {/* <Button 
                title='Saltar'
                onPress={props.onAnswerConfirmed}
              /> */}
            </View>
          }
          <Button
            onPress={props.setFiltersVisible}
            color={colors.danger}
            mode='contained'
            style={{marginVertical: 2}}
          >Cerrar</Button>
        </View>
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