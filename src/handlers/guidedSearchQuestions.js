const asistedSearch = (data) =>{
  const info = [];
  var answers = []

  // 1. ¿Está buscando ayuda para usted o para otra persona?
  answers.push({
      value: "Para mí",
      label: "Para mí"
  })

  answers.push({
      value: "Para otra persona",
      label: "Para otra persona"
  })

  info.push({
      question: "¿Está buscando ayuda para usted o para otra persona?",
      key: "Person",
      type: "single",
      answers: answers
  });

  // 2. edad

  answers = []

  info.push({
      question: "¿Cuantos años tienes?",
      key: "ageRange",
      type: "single",
      answers: answers
  });

  // 3. ¿Busca atención presencial o por videoconferencia?

  answers = []
  
  answers.push({
      value: 'Videoconferencia',
      label: 'Videoconferencia'
  })
  
  answers.push({
      value: 'Presencial',
      label: 'Presencial'
  })
  
  answers.push({
      value: 'Cualquiera',
      label: 'Cualquiera'
  })
  
  info.push({
      question: "¿Busca atención presencial o por videoconferencia?",
      key: "atentionType",
      type: "single",
      answers: answers
  });

  // 4. ¿En qué región y ciudad vive actualmente?

  answers = { 'regions': [], 'cities': {} }

  data.allRegiones.edges.map(Item => {
      answers['regions'].push({
          value: Item.node.id,
          label: Item.node.nombre
      })
      answers['cities'][Item.node.id] = []
      Item.node.ciudadSet.edges.map(city => {
          answers['cities'][Item.node.id].push({
              value: city.node.id,
              label: city.node.nombre
          })
      })
  })

  info.push({
      question: "¿En qué región y ciudad/comuna vive actualmente?",
      key: "regions",
      type: "dropdown",
      answers: answers
  });

  // 6. ¿Qué tipo de profesional de la salud mental está buscando?

  answers = []

  data.allTiposProfesionales.edges.map(Item => {
      answers.push({
          value: Item.node.id,
          label: Item.node.nombre
      })
  })

  info.push({
      question: "¿Qué tipo de profesional de la salud mental está buscando?",
      key: "professionalType",
      type: "single",
      answers: answers
  });

  // 7. ¿Qué tipo de modalidad está buscando?

  answers = []

  data.allModalidades.edges.map(Item => {
      answers.push({
          value: Item.node.id,
          label: Item.node.nombre
      })
  })

  info.push({
      question: "¿Qué tipo de modalidad está buscando?",
      key: "allModalidades",
      type: "single",
      answers: answers
  });

  // 8. ¿Cuánto es el máximo que podría pagar por sesión?

  answers = []

  info.push({
      question: "¿Cuánto es el máximo que podría pagar por sesión?",
      key: "priceRange",
      type: "price",
      answers: answers
  });

  /* 9. Opción 1: A continuación, hay una lista con distintos temas que pueden afectar
nuestra salud mental. Por favor, indique aquellas temáticas con las que usted cree que
necesita ayuda:*/

  var children = []

  data.allPatologias.edges.map(Item => {
      children.push({
          id: Item.node.id,
          name: Item.node.descripcionPacientes
      })
  })

  
  answers = [{ 'name': 'Patologias', 'children': children }]

  info.push({
      question: "Opción 1: A continuación, hay una lista con distintos temas que pueden afectar nuestra salud mental. Por favor, indique aquellas temáticas con las que usted cree que necesita ayuda:",
      key: "allPathologies",
      type: "multiple",
      answers: answers
  });

  // 10. ¿A qué sistema previsional de salud pertenece?

  answers = []
  
  data.allPrevisiones.edges.map(Item => {
      answers.push({
          value: Item.node.id,
          label: Item.node.nombre
      })
  })

  info.push({
      question: "¿A qué sistema previsional de salud pertenece?",
      key: "socialWelfare",
      type: "single",
      answers: answers
  });

  // 11. Prefiere un profesional que sea:

  answers = []

  answers.push({
      value: 'Mujer',
      label: 'Mujer'
  })
  
  answers.push({
      value: 'Hombre',
      label: 'Hombre'
  })
  
  answers.push({
      value: 'Cualquiera',
      label: 'Cualquiera'
  })

  info.push({
      question: "Prefiere un profesional que sea:",
      key: "gender",
      type: "single",
      answers: answers
  });

  return info
}

export default asistedSearch;