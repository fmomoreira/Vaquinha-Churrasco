# 🎣 Vaquinha da Pescaria

> Sistema para divisão de despesas de churrasco entre pescadores

## 📋 Sobre o Projeto

Este sistema foi desenvolvido para facilitar a divisão de despesas do churrasco após uma pescaria. Ele automaticamente:
- Calcula o valor que cada pescador deve pagar
- Desconta valores já pagos em compras
- Gera instruções de pagamento via PIX
- Facilita a cópia das chaves PIX

## ✨ Funcionalidades

### 💰 Gestão de Despesas
- Registro de compras por pescador
- Cálculo automático do valor por pessoa
- Balanço de quem deve pagar e quem deve receber

### 💸 Sistema de Pagamentos
- Integração com PIX
- Botão de cópia rápida das chaves PIX
- Detalhamento dos valores a serem transferidos

### 🔄 Interface Intuitiva
- Design responsivo com Bootstrap 5
- Expansão de detalhes de pagamento
- Feedback visual das ações

## 🚀 Como Usar

### 1️⃣ Adicionar Pescador
1. Preencha o nome do pescador
2. Digite o valor total de compras (se houver)
3. Informe a chave PIX (obrigatória se houver compras)
4. Clique em "Adicionar Pescador"

### 2️⃣ Visualizar Pagamentos
1. Localize o pescador na tabela
2. Clique no botão "Ver Pagamentos"
3. Veja os detalhes de quanto e para quem pagar

### 3️⃣ Realizar Pagamentos
1. Expanda os detalhes de pagamento
2. Clique no ícone 📋 para copiar a chave PIX
3. Use o valor indicado para fazer a transferência

## 💻 Tecnologias Utilizadas

- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
- ![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat&logo=bootstrap&logoColor=white)

## 🔍 Exemplos de Uso

### Cenário 1: Pescador que Comprou Itens
```
João comprou R$ 400 em carne
Total da pescaria: R$ 1000
Número de pescadores: 10
Valor por pessoa: R$ 100
João receberá: R$ 300 (R$ 400 - R$ 100)
```

### Cenário 2: Pescador sem Compras
```
Maria não fez compras
Valor por pessoa: R$ 100
Maria deverá pagar: R$ 100
```

## ⚠️ Observações Importantes

- A chave PIX é obrigatória para pescadores que fizeram compras
- Os valores são calculados automaticamente
- O sistema otimiza a distribuição dos pagamentos
- Mantenha o navegador atualizado para melhor experiência

## 🤝 Contribuições

Sugestões e contribuições são sempre bem-vindas! 
1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📱 Contato

Se tiver dúvidas ou sugestões, entre em contato!

---
⌨️ com ❤️ por [Felipe Moreira]
