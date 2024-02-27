import React, {useState} from 'react';
import { View } from 'react-native';
import {OutlinedTextField,} from 'react-native-material-textfield';

import HightSpecialtyModal from './HightSpecialtyModal';
import LowerSpecialtyModal from './LowerSpecialtyModal';
import MediumSpecialtyModal from './MediumSpecialtyModal'
import ProfesionalTypeModal from './ProfesionalTypeModal';

export default function Specialties({ formikProps }) {
  const [tipoProfesionalSelect, setTipoProfesionalSelect] = useState([]);
  const [hightEspecialidadSelect, setHightEspecialidadSelect] = useState([]);
  const [mediumEspecialidadSelect, setMediumEspecialidadSelect] = useState([]);
  const [lowEspecialidadSelect, setLowEspecialidadSelect] = useState([]);

  const hightSpecialtyDisplay = () => {
    var children = []
    state.register.especialidades.forEach(item => {
      if(!mediumEspecialidadSelect.includes(item.node.id) && !lowEspecialidadSelect.includes(item.node.id)){
        children.push({ 'name': item.node.nombre, 'id': item.node.id })
      }
    });
    return [{ 'name': 'Especialidades', 'children': children }];
  }

  const mediumSpecialtyDisplay = () => {
    var children = []
    state.register.especialidades.forEach(item => {
      if(!hightEspecialidadSelect.includes(item.node.id) && !lowEspecialidadSelect.includes(item.node.id)){
        children.push({ 'name': item.node.nombre, 'id': item.node.id })
      }
    });
    return [{ 'name': 'Especialidades', 'children': children }];
  }

  const lowSpecialtyDisplay = () => {
    var children = []
    state.register.especialidades.forEach(item => {
      if(!hightEspecialidadSelect.includes(item.node.id) && !mediumEspecialidadSelect.includes(item.node.id)){
        children.push({ 'name': item.node.nombre, 'id': item.node.id })
      }
    });
    return [{ 'name': 'Especialidades', 'children': children }];
  }

  const profesionalTypeDisplay = () => {
    var children = state.register.tipoProfesional.map(item => {
      return { 'name': item.node.nombre, 'id': item.node.id }
    });
    return [{ 'name': 'Tipo profesional', 'children': children }]
  }

  return(
    <View>
      <View style={{marginTop: 18}}>
        <OutlinedTextField 
          label='Tipo de Profesional'
          value=' '
          editable={false}
          error={formikProps.touched.profesional_type && formikProps.errors.profesional_type}
          onBlur={formikProps.handleBlur('profesional_type')}
        />
        <View style={{position: 'relative', bottom:67}}>
          <ProfesionalTypeModal 
            tipoProfesionalSelect={tipoProfesionalSelect} 
            setTipoProfesionalSelect={setTipoProfesionalSelect} 
            formikProps={formikProps}
            profesionalType={profesionalTypeDisplay()}
          />
        </View>
      </View>
      <View style={{marginVertical: -52}}>
        <OutlinedTextField 
          label='Especialidad(es) Prioridad Alta'
          value=' '
          editable={false}
          error={formikProps.touched.hight_specialty && formikProps.errors.hight_specialty}
          onBlur={formikProps.handleBlur('hight_specialty')}
        />
        <View style={{position: 'relative', bottom:67}}>
          <HightSpecialtyModal 
            especialidadSelect={hightEspecialidadSelect} 
            setEspecialidadSelect={setHightEspecialidadSelect} 
            formikProps={formikProps} 
            especialidades={hightSpecialtyDisplay()}
          />
        </View>
      </View>
    
      <View style={{marginVertical: 0}}>
        <OutlinedTextField 
          label='Especialidad(es) Prioridad Media'
          value=' '
          editable={false}
          error={formikProps.touched.medium_specialty && formikProps.errors.medium_specialty}
          onBlur={formikProps.handleBlur('medium_specialty')}
        />
        <View style={{position: 'relative', bottom:67}}>
          <MediumSpecialtyModal 
            especialidadSelect={mediumEspecialidadSelect} 
            setEspecialidadSelect={setMediumEspecialidadSelect} 
            formikProps={formikProps} 
            especialidades={mediumSpecialtyDisplay()}
          />
        </View>
      </View>
      
      <View style={{marginVertical: -52}}>
        <OutlinedTextField 
          label='Especialidad(es) Prioridad Baja'
          value=' '
          editable={false}
          error={formikProps.touched.low_specialty && formikProps.errors.low_specialty}
          onBlur={formikProps.handleBlur('low_specialty')}
        />
        <View style={{position: 'relative', bottom:67}}>
          <LowerSpecialtyModal 
            especialidadSelect={lowEspecialidadSelect} 
            setEspecialidadSelect={setLowEspecialidadSelect} 
            formikProps={formikProps} 
            especialidades={lowSpecialtyDisplay()}
          />
        </View>
      </View>
    </View>
  )
}