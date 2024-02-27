import React from 'react';
import { View,} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { colors } from '../../../../assets/styles/Colors';
import { TextInput }from 'react-native-paper';

export default function ModalidadSelector({modalidadSelect, setModalidadSelect, formikProps, modalidades}) {

  return (
      <View>
        <TextInput
          mode='outlined'
          label='Modalidad(es)'
          value=' '
          dense
          style={{ marginTop: 8, }}
          render={ props => 
            <SectionedMultiSelect 
              items={modalidades}
              uniqueKey="id"
              subKey="children"
              selectText="Selecciona las modalidades"
              showChips={false}
              confirmText='Confirmar'
              searchPlaceholderText='Buscar'
              selectedText='seleccionados'
              readOnlyHeadings={true}
              onSelectedItemsChange={setModalidadSelect}
              selectedItems={modalidadSelect, formikProps.values.modalidades = modalidadSelect}
              showDropDowns={false}
              modalWithSafeAreaView={true}
              colors={{
                primary: colors.primary,
                success: colors.success
              }}
              styles={{
                selectToggle: {
                  margin: 8,
                  padding: 0,
                }
              }}
            />
          }
        />
      </View>
    )
}