document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const myTimezonesContainer = document.getElementById('my-timezones');
    const addCityButton = document.getElementById('add-city-button');
    const cityInput = document.getElementById('city-input');

    // Lógica para trocar de abas
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Lógica para exibir os fusos horários
    const timezones = [
        { name: 'Local', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
        { name: 'Nova York', timezone: 'America/New_York' },
        { name: 'Londres', timezone: 'Europe/London' },
        { name: 'Tóquio', timezone: 'Asia/Tokyo' }
    ];

    function renderTimezones() {
        myTimezonesContainer.innerHTML = '';
        timezones.forEach(tz => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('pt-BR', {
                timeZone: tz.timezone,
                hour: '2-digit',
                minute: '2-digit'
            });

            const timezoneItem = document.createElement('div');
            timezoneItem.classList.add('timezone-item');
            timezoneItem.innerHTML = `
                <span class="city-name">${tz.name}</span>
                <span class="current-time">${timeString}</span>
            `;
            myTimezonesContainer.appendChild(timezoneItem);
        });
    }

    // Atualiza os horários a cada segundo
    setInterval(renderTimezones, 1000);
    renderTimezones(); // Chama a função na inicialização

    // Lógica para adicionar uma nova cidade
    addCityButton.addEventListener('click', () => {
        const cityName = cityInput.value.trim();
        if (cityName) {
            // Este é um exemplo simplificado. Para uma implementação real,
            // você precisaria de uma API que converta o nome da cidade em um
            // nome de fuso horário válido (ex: 'America/Los_Angeles').
            // Por exemplo, usando a biblioteca 'moment-timezone' ou uma API pública.
            
            // Aqui, vamos apenas adicionar uma cidade de exemplo para fins de demonstração
            const newTimezone = {
                name: cityName,
                timezone: 'America/Los_Angeles' // Fuso horário de exemplo
            };

            timezones.push(newTimezone);
            renderTimezones();
            cityInput.value = ''; // Limpa o campo de input
            
            // Volta para a aba principal após adicionar
            document.getElementById('tab1').classList.add('active');
            document.getElementById('tab2').classList.remove('active');
            document.querySelector('[data-tab="tab1"]').classList.add('active');
            document.querySelector('[data-tab="tab2"]').classList.remove('active');
        }
    });
});
