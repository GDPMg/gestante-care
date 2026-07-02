const MENSAGENS: Record<string, string> = {
  'Invalid login credentials': 'E-mail ou senha inválidos.',
  'User already registered': 'Já existe uma conta com esse e-mail.',
  'Password should be at least 6 characters': 'A senha precisa ter pelo menos 6 caracteres.',
  'Email not confirmed': 'Confirme seu e-mail antes de entrar.',
}

export function translateAuthError(message: string) {
  return MENSAGENS[message] ?? 'Não foi possível concluir. Tente novamente em instantes.'
}
