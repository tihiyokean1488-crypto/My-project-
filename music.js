const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
audio.loop = true;
audio.volume = 0.3;
audio.play().catch(e=>console.log('Автозапуск музыки заблокирован, нажмите на экран'));
