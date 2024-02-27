import React from 'react';
import { View,} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

export default function HightSpecialtyModal({especialidadSelect, setEspecialidadSelect, formikProps, especialidades}) {

  return (
      <View>
        <SectionedMultiSelect 
          items={especialidades}
          uniqueKey="id"
          subKey="children"
          selectText="Selecciona tus especialidades"
          confirmText='Confirmar'
          searchPlaceholderText='Buscar'
          selectedText='seleccionados'
          modalWithSafeAreaView={true}
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={setEspecialidadSelect}
          selectedItems={especialidadSelect, formikProps.values.hight_specialty = especialidadSelect}
        />
      </View>
    )
}