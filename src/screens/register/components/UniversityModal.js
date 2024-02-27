import React from 'react';
import { View,} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';


export default function UniverstyModal({universidadSelect, setUniversidadSelect, formikProps, universidades}) {

  return (
      <View>
        <SectionedMultiSelect 
          items={universidades}
          uniqueKey="id"
          subKey="children"
          selectText="Selecciona tus universidades"
          confirmText='Confirmar'
          searchPlaceholderText='Buscar'
          selectedText='seleccionados'
          modalWithSafeAreaView={true}
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={setUniversidadSelect}
          selectedItems={universidadSelect, formikProps.values.university = universidadSelect}
        />
      </View>
    )
}