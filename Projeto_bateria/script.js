//Primeiro: Saber a tecla apertada no site.

document.body.addEventListener('keyup', (event)=>{
    playSound(event.code.toLowerCase());
});

/*document.body representa todo o corpo do site. Vou usar um LISTENER (espera um evento acontecer e captura)!
uso o keyup para o listener capturar o evento de clicar e soltar uma tela. Primeiro uso o parâmetro ('keyup'), depois a função.
A função será um evento (event) de capturar o código da tecla (event.code) e associar a um som -> função "playsound".
Utilizo um .toLowerCase porque o código da tecla é maiúsculo, mas o som salvo está em minúsculo (ex: keya, keyb...).
*/

//Segundo: criar função para associar a tecla apertada à um som.
function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);
    /* Para associar qual som preciso, utilizo a tag das IDs (#). Para selecionar, utilizo um document.queryselector.
Como preciso de algo dinâmico (uma vez que cada tecla possui um codigo diferente), e meus sons começam com "s_",
uso um TEMPLATE STRING `${sound}` (ISSO NAO É aspas` `). sound se refere ao código de cada tecla.
*/

/*Aqui, faço com que a tecla apertada pisque de acordo com o efeito definido no CSS. Eu tenho uma classe "key" em todas as
divs, e um valor de "data-key" para cada tecla para selecionar a div do elemento clicado.
*/  let keyElement = document.querySelector(`div[data-key="${sound}"]`);

//agora, para fazer tocar as teclas salvas: Se for uma das teclas que existem som, ele toca.
    if(audioElement) {
        audioElement.currentTime = 0; //isso é para que ele sempre inicie o audio do zero quando apertar, mesmo em audios mais longos.
        audioElement.play();
    }

/*aqui, procuro a classe do CSS que representa o efeito que eu quero quando clico num elemento específico.
A classe no css é .active. Assim, eu adiciono ela a uma .key e o botão DA DIV ficará amarelo*/
    if(keyElement){
        keyElement.classList.add('active');

//Depois que ele fica ativo, preciso remover, senão ele ficará sempre amarelo.
        setTimeout(() => {
           keyElement.classList.remove('active');
        }, 300);
    }
}

//Agora, fazer com que o Botão "composição" funcione:
/*Irei pegar a classe .composer referente à caixa de texto no HTML e, no botão "tocar",
vou adicionar outro Listener para evento de clicar (click).

- depois, criarei uma variável "song" para selecionar o valor (.value) do que for digitado (#input) na
caixa de texto. Posso utilizar um querySelector ou um getElementById*/

document.querySelector('.composer button').addEventListener('click', () =>{
    let song = document.querySelector('#input').value; // song será uma variável com as letras digitadas. Mas, preciso transformar em ARRAY

    if(song !== ''){
        let songArray = song.split(''); //assim, "aaa" vira (3) ['a', 'a', 'a'], com posições [0, 1, 2], lenght (3) e tudo mais.
        playComposition(songArray); //criarei uma função para tocar a composição criada
        // DICA: separar código em funções e definições par organizar o código. Aqui, vou deixar sequencial para facilitar entendimento.
    }
});

//nessa função, crio um loop para que cada ITEM de SONG (songItem) dentro de songArray seja linkado a um som salvo na função playSound
function playComposition(songArray) {

    /*Mas, o loop roda tudo ao mesmo tempo, sem intervalo entre os sons. Então defino um tempo para tocar entre os itens.
    Crio uma variável que inicia em zero e a sequência do loop será: enquanto tiver item, TOCAR, ADICIONAR 250ms (1/4 de segundo), TOCAR PRÓXIMO*/
    let wait = 0;

    for(let songItem of songArray) {
        setTimeout(() => {
            playSound(`key${songItem}`);
        }, wait);
       
        wait += 250;
    }
}

/* Resumindo:
- evento de click na tela inteira;
- joga pra playsound. verifica se tem audio, toca, mostra;
- depois, digita a composição, pega o que foi digitado, transforma em array;
- usa um loop para transformar os itens do array em sequencia de sons.*/