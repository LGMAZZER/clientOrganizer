import bcrypt from "bcrypt";

// Altere a senha aqui
const senha = "teste@12345";

async function gerarHash() {
    const hash = await bcrypt.hash(senha, 10);
    console.log("Senha original:", senha);
    console.log("Hash para inserir no banco:", hash);
    console.log("\nSQL de exemplo:");
    console.log(`INSERT INTO users (email, senha, nome) VALUES ('email@exemplo.com', '${hash}', 'Nome do Usuario');`);
    console.log("\nOu para atualizar um usuário existente:");
    console.log(`UPDATE users SET senha = '${hash}' WHERE email = 'email@exemplo.com';`);
}

gerarHash();
