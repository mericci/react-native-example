import React, { useState } from 'react';
import guidedSearch from '../../handlers/guidedSearchQuestions';
import { queries } from '../../handlers/Queries';

import Quiz from './components/Quiz';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { View, Alert, Text, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from '../../../assets/styles/Global';
import { ActivityIndicator } from 'react-native-paper';

export default function GuidedSearch({setFiltersVisible, toggleGuidedSearch}) {

    const dispatch = useDispatch();

    var answerOptions;
    var answers = {};

    const [searching, setSearching] = useState(false)

    const [searchQuestions, setSearchQuestions] = useState({
        questions:{}
    });

    const [guidedSearchMutation] = useMutation(queries.guidedSearch);

    const { loading, data, error } = useQuery(queries.getGuidedSearchInfo, {
        onCompleted: data => {
            const info = guidedSearch(data);
            setSearchQuestions(searchQuestion => ({
                ...searchQuestion,
                questions: info
            }));
            answerOptions = info.map((question) => question.answers);
            answers = {}
            for(var i=0; i < info.length; i++){
                answers[info[i].key] = [];
            }
            answers["priceRange"] = [-1, -1]
            answers['regions'] = [[], []]
            setQuestions(question => ({
                ...question,
                question: info[0].question,
                answerOptions: answerOptions[0],
                answers: answers,
                key: info[questions.counter].key,
                type: info[questions.counter].type
            }));
        }
    });

    const [questions, setQuestions] = useState({
        counter: 0,
        questionId: 1,
        question: '',
        answerOptions: [],
        answers: {},
        key:''
    });

    const handleAnswerSelected = (event, identifier=undefined) => {
      if (identifier === 'min' || identifier === 'max') {
        setPrice(event, identifier);
      } else if (identifier === 'region' || identifier === 'city') {
        setLocation(event, identifier)
      } else {
        setUserAnswer(event);
      }
    }

    const handleConfirmAnswer = () => {
        if (questions.questionId < searchQuestions.questions.length) {
            setTimeout(() => setNextQuestion(), 300);
        } else {
            setTimeout(() => search(), 300);
        }
    }

    const search = () => {
        setSearching(true)
        var socialWelfare;
        if (questions.answers.socialWelfare.length !== 0){
            socialWelfare = questions.answers.socialWelfare[0]
        } else {
            socialWelfare = "UHJldmlzaW9uTm9kZTo0"
        }
        guidedSearchMutation(
            { variables: 
              { 
                gender: questions.answers.gender[0] || "Cualquiera",
                cities: questions.answers.regions[1],
                ageRange: questions.answers.ageRange [0] || "-1",
                atentionType: questions.answers.atentionType[0] || "Cualquiera",
                professionalType: questions.answers.professionalType,
                modalities: questions.answers.allModalidades,
                maxPrice: questions.answers.priceRange[1] || "-1",
                regions: questions.answers.regions[0],
                pathologies: questions.answers.allPathologies,
                socialWelfare: socialWelfare
              }
            }
        ).then((data)=>{
          if("errors" in data) {
            setSearching(false)
            alert('Búsqueda Falló');
          } else if (data.data.guidedSearch.consultas.length == 0) {
            Alert.alert("Error", "No se obtuvieron resultados", [
              { text: "OK", onPress: () => {} }
            ], { cancelable: false });
            setSearching(false);
          } else {
            dispatch({ type: 'SET_SEARCH_RESULT', payload: data.data.guidedSearch })
            setSearching(false)
            setFiltersVisible()
          }   
        })
    }

    const setPrice = (answer, identifier) => {
      var answers = questions.answers;
      var minMax;
      if (identifier === 'min') {
        minMax = 0
      } else {
        minMax = 1
      }
      answers["priceRange"][minMax] = answer;
      setQuestions(question => ({
        ...question,
        answers: answers
      }));
    } 

    const setLocation = (answer, identifier) => {
      var answers = questions.answers;
      if (identifier === 'region') {
        answers['regions'][0] = [answer]
      } else {
        answers['regions'][1] = [answer]
      }
      setQuestions(question => ({
        ...question,
        answers: answers
      }));
    }

    const setUserAnswer = answer => {
        var key = questions.key
        var answers = questions.answers;
        if (searchQuestions.questions[questions.counter].type === 'multiple'){
          answers[key] = answer;
        } else {
          answers[key] = [answer];
        }
        setQuestions(question => ({
            ...question,
            answers: answers
        }));
    }

    const setNextQuestion = () => {
        setQuestion(questions.counter + 1, questions.questionId + 1);
    }

    const setPreviousQuestion = () => {
        setQuestion(questions.counter - 1, questions.questionId - 1);
    }

    const setQuestion = (counter, questionId) => {
        setQuestions(question => ({
            ...question,
            counter: counter,
            questionId: questionId,
            key: searchQuestions.questions[counter].key,
            question: searchQuestions.questions[counter].question,
            answerOptions: searchQuestions.questions[counter].answers,
            type: searchQuestions.questions[counter].type
        }));
    }

    const renderQuiz = () => {
        return (
          <Quiz
            region={questions.answers.regions ? questions.answers.regions[0] : ''}
            questionKey={questions.key}
            questionType={questions.type}
            answers={questions.answers[questions.key]}
            answerOptions={questions.answerOptions}
            questionId={questions.questionId}
            question={questions.question}
            questionTotal={searchQuestions.questions.length}
            onAnswerSelected={handleAnswerSelected}
            onAnswerConfirmed={handleConfirmAnswer}
            onPrevious = {setPreviousQuestion}
            toggleGuidedSearch = {toggleGuidedSearch}
            setFiltersVisible = {setFiltersVisible}
          />
        );
    }

    if (error) return {};
    return(
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <TouchableWithoutFeedback onPress={() => setFiltersVisible(false)}>
          <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.15}}></View>
        </TouchableWithoutFeedback>
        <View style={{...globalStyles.searchModal, height: '60%', }}>
          {(loading || searching) ? 
            <View style={{ justifyContent: 'center', flex: 1}}>
              <Text style={{ textAlign: 'center', marginBottom: 10}}>Cargando resultados...</Text>
              <ActivityIndicator />
            </View>:
          renderQuiz()}
        </View>
      </View>
    );
}