const express = require('express');
const router = express.Router();

const filmes = [
    {
        id: 1,
        nome: 'Velozes e Furiosos 9',
        imagem: 'https://br.web.img3.acsta.net/c_310_420/pictures/21/04/14/19/06/3385237.jpg',
        genero: 'Ação',
        nota: 7,
        descricao: 'Em Velozes & Furiosos 9, Dominic Toretto (Vin Diesel) e Letty (Michelle Rodriguez) vivem uma vida pacata ao lado de seu filho Brian. Mas eles logo são ameaçados quando o irmão desaparecido de Dom retorna. Jakob (John Cena), um assassino habilidoso e excelente motorista, está trabalhando ao lado de Cipher (Charlize Theron), vilã de Velozes & Furiosos 8. Para enfrentá-los, Toretto vai precisar reunir sua equipe novamente, inclusive Han (Sung Kang), que todos acreditavam estar morto.',
        assistido: false
    },

    {
        id: 2,
        nome: 'Velozes e Furiosos 7',
        imagem: 'https://br.web.img3.acsta.net/c_310_420/pictures/15/03/30/21/19/054397.jpg',
        genero: 'Ação',
        nota: 8,
        descricao: 'Velozes e Furiosos 7 acompanha Dom (Vin Diesel), Brian (Paul Walker), Letty (Michelle Rodriguez) e o resto da equipe após os acontecimentos em Londres. Apesar de terem suas chances de voltar para os Estados Unidos e recomeçarem suas vidas, a tranquilidade do grupo é destruída quando Deckard Shaw (Jason Statham), um assassino profissional, quer vingança pela morte de seu irmão. Agora, a equipe tem que se reunir para impedir este novo vilão. Mas dessa vez, não é só sobre ser veloz. A luta é pela sobrevivência.',
        assistido: false
    },
]

router.get('/', (req, res) => {
    res.send(filmes);
})

router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const filme = filmes.find(filme => filme.id == idParam);

    if(!filme) {
        res.status(404).send({error: 'Filme não encontrado.'});
        return;
    }

    res.send(filme);
})

router.post('/add', (req, res) => {
    const filme = req.body;

    if(!filme || !filme.nome || !filme.imagem || !filme.genero || !filme.nota || !filme.descricao) {
        res.status(400).send({
            message: 'Filme inválido, está faltando os campos titulo e imagem'
        })
        return;
    }
    
    filme.id = filmes[filmes.length -1].id + 1;
    filmes.push(filme);
    res.status(201).send({
        message: 'Filme Cadastrado com sucesso!',
        data: filme
    });
})

router.put('/edit/:id', (req, res) => {
    const filmeEdit = req.body;
    const idParam = req.params.id;
    let index = filmes.findIndex(filme => filme.id == idParam);

    if(index < 0) {
        res.status(404).send({
            error: 'O Filme que voce está tentando editar nao foi encontrado.'
        })
        return;
    }

    filmes[index] = {
        ...filmes[index],
        ...filmeEdit
    }

    res.send({
        message: `Filme ${filmes[index].nome} atualizado com sucesso!`,
        data: filmes[index]
    })
})

router.delete('/delete/:id', (req, res) => {
    const idParam = req.params.id;

    const index = filmes.findIndex(filme => filme.id == idParam);
    const nome = filmes[index];
    filmes.splice(index, 1);
    res.send({
        message: `Filme ${nome.nome} excluido com sucesso!`,
    })
})

module.exports = router;