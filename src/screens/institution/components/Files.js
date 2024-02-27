import React, {useEffect} from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import AddFile from './AddFile';


export default function Files({ filesUpload, setFilesUpload }) {

  const { loading, data, error } = useQuery(queries.allRequerimientosArchivosSolicitud('INS'));

  useEffect(() => {
    const onCompleted = (data) => {
      {}
    }
    const onError = (error) => {
      {}
    }
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error){
        onCompleted(data)
      } else if (onError && !loading && error){
        onError(error)
      }
    }
  }, [loading, data, error])

  const renderFile = (file) => {
    return (
      <View key={file.node.id}>
        <AddFile file={file} filesUpload={filesUpload} setFilesUpload={setFilesUpload}/>
      </View>
      
      );
    }

  return(
    <View>
      {
        loading ? 
          <View></View>
        :
          data.allRequerimientosArchivosSolicitud.edges[0] && 
            data.allRequerimientosArchivosSolicitud.edges[0].node.tipoArchivos.edges.map((file) => renderFile(file))
      }
    </View>
    
    
  )
}