document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalOverlay = document.getElementById('leadModal');
    const leadForm = document.getElementById('leadForm');

    // Abre o modal
    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.classList.add('active');
    });

    // Fecha o modal clicando no X
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    // Fecha o modal clicando fora da caixa
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // Formata o telefone automaticamente enquanto o usuário digita (Mascara)
    const phoneInput = document.getElementById('telefone');
    phoneInput.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    // URL do Web App do Google Apps Script (Você precisará substituir pela sua URL)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxYzCBo_hKqD9fRa4jhsPuSrD19DcdTuOuV6w03dS_2T4UrqcySaIhU116PkghH5BysRg/exec';

    // Lida com o envio do formulário
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        
        // Coletar os dados
        const formData = new FormData(leadForm);
        
        // Altera o texto do botão para dar feedback ao usuário
        const submitBtn = leadForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Processando...';
        submitBtn.disabled = true;

        // Faz a requisição para o Google Sheets em segundo plano
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Evita erros de CORS no navegador
        })
        .then(() => {
            // Após registrar na planilha (ou mesmo se der erro no log, para não travar o usuário)
            // Redireciona para o grupo do WhatsApp
            window.location.href = "https://chat.whatsapp.com/Iqdxg8supSQBQh1iFY1Evf";
        })
        .catch(error => {
            console.error('Erro ao salvar no Google Sheets:', error);
            // Redireciona mesmo em caso de erro para garantir a experiência do usuário
            window.location.href = "https://chat.whatsapp.com/Iqdxg8supSQBQh1iFY1Evf";
        });
    });
});
