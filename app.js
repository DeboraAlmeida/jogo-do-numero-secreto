let numerosJaSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
document.getElementById('easy').style.backgroundColor = '#1875E8';

const alterarConteudoTag = (tag, texto) => {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
}

const exibirMensagemInicial = () => {
  alterarConteudoTag('h2', 'Vamos lá!');
  alterarConteudoTag('#mensagem', 'Será que você está com sorte?');
  alterarConteudoTag('p', `Escolha um número entre 1 e ${numeroLimite}:`);
}

alterarConteudoTag('h1', 'Jogo do Número Secreto');
exibirMensagemInicial();

const limparCampo = () => {
  chuteInput = document.getElementById('chute');
  chuteInput.value = ''
}

const verificarChute = () => {
  let chuteInput = Number(document.getElementById('chute').value);
  if (chuteInput === numeroSecreto) {
    alterarConteudoTag('h2', 'Acertou!!');
    alterarConteudoTag('#mensagem', `Parabéns!! Você acertou com ${tentativas} tentativa${tentativas !== 1 ? 's': ''}!`);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    alterarConteudoTag('h2', 'Ainda não...');
    if (chuteInput > numeroSecreto) {
      alterarConteudoTag('#mensagem', `Tente um número menor que ${chuteInput}`);
    } else {
      alterarConteudoTag('#mensagem', `Tente um número maior que ${chuteInput}`);
    }
    tentativas++
    limparCampo()
  } 
  
}

function gerarNumeroAleatorio() { // não usei arrow function pois o código reclama se a variável numeroSecreto chamá-la antes de sua inicialização
  let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);
  const tamanhoLista = numerosJaSorteados.length;
  
  if (tamanhoLista === numeroLimite) {
    numerosJaSorteados = []
  }

  if (numerosJaSorteados.includes(numeroSorteado)) {
    return gerarNumeroAleatorio();
  } else {
    numerosJaSorteados.push(numeroSorteado)
    return numeroSorteado
  }
}

const reiniciarJogo = () => {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  exibirMensagemInicial();
  tentativas = 1;
  document.getElementById('reiniciar').setAttribute('disabled', true);
  document.querySelectorAll('.level').style.backgroundColor = '#1875E838'
}

const selecionarNivel = (numero) => {
  const trocarCor = (id, id2, id3, id4) => {
    document.getElementById(id).style.backgroundColor = '#1875E8';
    document.getElementById(id2).style.backgroundColor = '#1875E838';
    document.getElementById(id3).style.backgroundColor = '#1875E838';
    document.getElementById(id4).style.backgroundColor = '#1875E838';
  }

  numeroLimite = numero
  document.getElementById('chute').setAttribute('max', numero);

  switch (numero) {
    case 10:
      trocarCor('easy', 'medium', 'hard', 'torture');
      break;
    case 100:
      trocarCor('medium', 'easy', 'hard', 'torture');
      break;
    case 500:
      trocarCor('hard', 'easy', 'medium', 'torture');
      break;
    case 1000:
      trocarCor('torture', 'easy', 'medium', 'hard');
      break;  
    default:
      break;
  }
  reiniciarJogo()
}


