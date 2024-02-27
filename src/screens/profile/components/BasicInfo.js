import React from 'react';
import { StyleSheet ,View, Text, } from 'react-native';
import { useSelector } from 'react-redux';
import { globalStyles } from '../../../../assets/styles/Global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors} from '../../../../assets/styles/Colors';
import { Divider } from 'react-native-paper'; 

export default function BasicInfo({data, personal}) {
  const state = useSelector(state => state);

  function diff_years(birthday) { // birthday is a date
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  

  function gender()
  {
    if (state.profile.genero == 'A_0') {
      return 'Hombre'
    }
    else if (state.profile.genero == 'A_1') {
      return 'Mujer'
    } else if (state.profile.genero == 'A_2') {
      return 'No especificado'
    } else {
      return 'No informado'
    }
  }

  function genderSearch()
  {
    if (data.genero) {
      if (data.genero == 'A_0') {
        return 'Hombre'
      }
      else if (data.genero == 'A_1') {
        return 'Mujer'
      } else if (data.genero == 'A_2') {
        return 'No especificado'
      } else {
        return 'No informado'
      }
    } else {
      if (data.sexo == 'A_0') {
        return 'Hombre'
      }
      else if (data.sexo == 'A_1') {
        return 'Mujer'
      } else if (data.sexo == 'A_2') {
        return 'No especificado'
      } else {
        return 'No informado'
      }
    }
  }


  return(
    <View>
    {
      personal ? 
        <View>
          <View style={{ alignItems: 'center'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.name}>{ state.profile.name + ' ' + state.profile.lastname }</Text>
              { state.profile.valido ? 
                <MaterialCommunityIcons
                  name='check-circle'
                  size={19}
                  style={{ color: colors.link, marginLeft: 3 }}
                /> : <View></View>
              }
            </View>
            { state.isLogin.isProfesional ? 
              state.profile.tipoProfesional.map((tipo) => (
                <Text key={tipo.node.id}>{ tipo.node.nombre }</Text>
              )) : <Text>Usuario</Text>
            }
          </View>
          <View style={{ width: '100%', marginTop: 25, marginBottom: 10 }}>
            <Text style={globalStyles.segmentTitle}>Información personal</Text>
            <Divider />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <MaterialCommunityIcons
                  name='account'
                  size={24}
                  style={{ color: colors.primary, marginRight: 7 }}
                />
              <View>
                <Text style={{ fontSize: 15}}>
                  <Text style={{ fontWeight: 'bold' }}>Email: </Text><Text>{ state.profile.email }</Text>
                </Text>
                <Text style={{ fontSize: 15}}>
                  <Text style={{ fontWeight: 'bold' }}>Género: </Text><Text>{ gender() }</Text>
                </Text>
                <Text style={{ fontSize: 15}}>
                  <Text style={{ fontWeight: 'bold' }}>Edad: </Text>
                  <Text>{ diff_years(new Date(String(state.profile.fechaNacimiento))) } años</Text>
                </Text>
              </View>
            </View>
          </View>
        </View> 
        :
        <View>
          <View style={{ alignItems: 'center'}}>
            <Text style={styles.name}>{ data.nombre + ' ' + data.apellido }</Text>
          </View>
          <View style={{ width: '100%', marginTop: 25, marginBottom: 10 }}>
            <Text style={globalStyles.segmentTitle}>Información personal</Text>
            <Divider />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <MaterialCommunityIcons
                  name='account'
                  size={24}
                  style={{ color: colors.primary, marginRight: 7 }}
                />
              <View>
                <Text style={{ fontSize: 15}}>
                  <Text style={{ fontWeight: 'bold' }}>Email: </Text><Text>{ data.email }</Text>
                </Text>
                <Text style={{ fontSize: 15}}>
                  <Text style={{ fontWeight: 'bold' }}>Género: </Text><Text>{ genderSearch() }</Text>
                </Text>
                <Text style={{ fontSize: 15}}>
                  <Text style={{ fontWeight: 'bold' }}>Edad: </Text>
                  <Text>{ diff_years(new Date(String(data.fechaNacimiento))) } años</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: '500',
  }
})
