import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { queries } from '../../../handlers/Queries';
import { ActivityIndicator } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';

export default function Room({navigation}) {
  state = useSelector(state => state);
  dispatch = useDispatch();
  const chatId = navigation.getParam('chatId')

  var { loading } = useQuery(queries.chatMessages(chatId), {
    onCompleted: data => {
      const preparedMessages = prepareMessages(data.chat.mensajes.edges);
      setMessages(preparedMessages);
    },
    fetchPolicy: "network-only"
  });

  var { data } = useSubscription(queries.chatMessageSubscription, {
    variables: { chatId: chatId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;
      addMessage(subscriptionData.data.mensajeChat)
    }
  })

  
  const [createMessage, { dataMessage }] = useMutation(queries.createMessage)

  const [messages, setMessages] = useState([]);

  const prepareMessages = (data) => {
    return data.map(message => {
      var usuario;
      if (message.node.profesional){
        usuario = {
          _id: message.node.profesional.user.id,
          name: message.node.profesional.nombre + ' ' + message.node.profesional.apellido,
          avatar: message.node.profesional.fotoPerfil.url
        }
      } else {
        usuario = {
          _id: message.node.paciente.user.id,
          name: message.node.paciente.nombre + ' ' + message.node.paciente.apellido,
          avatar: message.node.paciente.fotoPerfil.url
        }
      }
      return {
        _id: message.node.id,
        text: message.node.texto,
        createdAt: message.node.creadoEn,
        user: usuario
      }
    }).sort((a, b) => a.createdAt < b.createdAt)
  }

  const inArray = (array, element) => {
    var inArray = false
    array.forEach(item => {
      if (item._id === element._id) {
        inArray = true
      }
    });
    return inArray
  }

  const addMessage = (message) => {
    var usuario;
    if (message.profesional) {
      usuario = {
        _id: message.profesional.user.id,
        name: message.profesional.nombre + ' ' + message.profesional.apellido,
        avatar: message.profesional.fotoPerfil.url
      }
    } else {
      usuario = {
        _id: message.paciente.user.id,
        name: message.paciente.nombre + ' ' + message.paciente.apellido,
        avatar: message.paciente.fotoPerfil.url
      }
    }
    const processedMessage = {
      _id: message.id,
      text: message.texto,
      createdAt: message.creadoEn,
      user: usuario
    }
    const previousMessages = messages
    if (inArray(previousMessages.slice(0, 2), processedMessage)){
      return
    } else {
      previousMessages.push(processedMessage)
      previousMessages.sort((a, b) => a.createdAt < b.createdAt)
      setMessages(previousMessages)
    }
  }

  const onSend = (messages = []) => {
    const text = messages[0].text
    const userId = messages[0].user._id
    createMessage({ variables: { text: text, chatId: chatId, userId: userId}})
  }

  useEffect(() => {
    return 
  })

  if (loading){
    return <ActivityIndicator/>
  } else {
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: state.isLogin.id,
        }}
      />
    )
  }
}