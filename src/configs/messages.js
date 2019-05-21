/* istanbul ignore file */
// [entityFieldType]: 'Mensagem'
export default {
  // [request]
  requestInvalid: 'Requisição inválida',
  // [user]
  userEmailInvalid: 'Email inválido',
  userEmailRequired: 'Email obrigatório',
  userEmailExists: 'Já existe um usuário cadastrado com o email',
  userNameRequired: 'Nome do usuário é obrigatório',
  userPassRequired: 'Senha é obrigatória',
  userPassInvalid: 'Senha inválida, mínimo 8 caracteres',
  userPassIncorrect: 'Senha incorreta',
  userNotFound: 'Usuário não encontrado',
  // [question]
  questionDescriptionRequired: 'Descrição obrigatória',
  questionIdInvalid: 'Id inválido',
  questionAlternativesRepetedId: 'Questão inválida, questões com identificador repetido',
  questionAlternativesMin: 'É obrigatório no mínimo 2 alternativas',
  questionCorrectInvalid: 'Alternativa correta inválida',
  questionCorrectNotFound: 'Questão inválida, não possui alternativa correta',
  questionCategoriesMin: 'Questão inválida, é obrigatório ao menos uma categoria',
  questionIdRequired: 'Identificador[_id] é Obrigatório',
  // [category]
  categoryNameRequired: 'Nome da categoria é obrigatório',
  // [http]
  httpBadRequest: 'Bad request',
  // [jwt]
  jwtTokenMalformatted: 'Token malformatted',
  jwtTokenInvalid: 'Token invalid',
};
