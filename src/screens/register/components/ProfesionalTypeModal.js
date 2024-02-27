import React from 'react';
import { View, TouchableWithoutFeedback} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';


export default function ProfesionalTypeModal({tipoProfesionalSelect, setTipoProfesionalSelect, formikProps, profesionalType}) {

  return (
      <View>
        <TouchableWithoutFeedback>
        <SectionedMultiSelect 
          items={profesionalType}
          uniqueKey="id"
          subKey="children"
          selectText="Selecciona tus tipos de profesión"
          confirmText='Confirmar'
          searchPlaceholderText='Buscar'
          selectedText='seleccionados'
          modalWithSafeAreaView={true}
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={setTipoProfesionalSelect}
          selectedItems={tipoProfesionalSelect, formikProps.values.profesional_type = tipoProfesionalSelect}
        />
        </TouchableWithoutFeedback>
      </View>
    )
}