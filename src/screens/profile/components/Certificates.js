import React, {useEffect} from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import AddFile from '../../register/components/AddFile';

export default function Certificates({ filesUpload, setFilesUpload, setCountFiles }) {

  const { loading, data, error } = useQuery(queries.allRequerimientosArchivosSolicitud('EPRO'));

  useEffect(() => {
    const onCompleted = (data) => {
      if (data.allRequerimientosArchivosSolicitud.edges.length){
        setCountFiles(data.allRequerimientosArchivosSolicitud.edges[0].node.tipoArchivos.edges.length)
      } else {
        setCountFiles(0)
      }
    }
    const onError = (error) => {
      console.log(error)
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