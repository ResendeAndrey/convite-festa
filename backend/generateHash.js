const bcrypt = require("bcryptjs");

// Função para gerar o hash de uma senha
const generateHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10); // Gera um "salt" com 10 rodadas
    const hashedPassword = await bcrypt.hash(password, salt); // Cria o hash da senha com o salt
    console.log("Senha criptografada:", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error("Erro ao gerar hash:", error);
  }
};

// Exemplo de uso
const password = process.env.PASSWORD_HASH;
generateHash(password);
