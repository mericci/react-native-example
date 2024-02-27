import React from 'react';
import { View, ScrollView } from 'react-native';
import { globalStyles } from '../../../assets/styles/Global';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { ActivityIndicator, List } from 'react-native-paper';
import { queries } from '../../handlers/Queries';
import UbicationAccordion from './components/UbicationAccordion';

export default function MyConsultations({navigation}) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const institution = navigation.getParam('institution');

  const { error: institutionError, loading: institutionLoading, data: institutionData } = useQuery(
    queries.getAllInstitutionInfo(institution.node.id), {
    pollInterval: 1000
  })

  return(
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 10, }}>
        <View style={{...globalStyles.segment, padding: 0 }}>
          { institutionLoading ? <ActivityIndicator /> : (
            <List.Section title='Sedes'>
              { institutionData.institucion.ubicacionSet.edges.map((ubication) => (
                <UbicationAccordion 
                  key={ubication.node.id}
                  ubication={ubication}
                  navigation={navigation}
                />
              ))}
            </List.Section>
          )}
        </View>
      </View>
    </ScrollView>
  );
}