import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import useGame from '../hooks/useGame';

export default function FindGameButton() {
  const [audioElements, setAudioElements] = useState([]);
  const currentAudioIndex = useRef(0);
  const router = useRouter();
  const { createGame, error } = useGame();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Создаем несколько аудио элементов для одновременного воспроизведения
    const elements = [];
    for (let i = 0; i < 3; i++) {
      const audio = new Audio('/sounds/button.mp3');
      audio.volume = 0.8;
      audio.load();
      elements.push(audio);
    }
    setAudioElements(elements);

    return () => {
      // Очистка при размонтировании
      elements.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  const handleClick = async () => {
    if (isLoading) return;

    // Воспроизводим звук
    if (audioElements.length > 0) {
      const audioIndex = currentAudioIndex.current;
      const audio = audioElements[audioIndex];
      
      audio.currentTime = 0;
      audio.play().catch(e => {
        console.error('Ошибка воспроизведения:', e);
        // Пробуем создать новый элемент при ошибке
        const newAudio = new Audio('/sounds/button.mp3');
          newAudio.volume = 0.8;
        newAudio.load();
          newAudio.play().catch(e => console.error('Повторная ошибка:', e));
        });
      
      currentAudioIndex.current = (audioIndex + 1) % audioElements.length;
    }

    // Создаем игру
    try {
      setIsLoading(true);
      const game = await createGame();
      if (game?.id) {
        router.push(`/waiting-room?gameId=${game.id}`);
      }
    } catch (err) {
      console.error('Error creating game:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
      <div style={{ position: 'relative', width: 334, height: 140 }}>
        <svg width="334" height="140" viewBox="0 0 334 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, opacity: isLoading ? 0.7 : 1 }}>
          <g filter="url(#filter0_ddd_2236_43806)">
            <g clipPath="url(#clip0_2236_43806)">
              <rect x="48" y="48" width="238" height="40" rx="20" fill={isLoading ? "#666" : "#FF8A00"}/>
              <rect x="48" y="48" width="238" height="40" rx="20" fill="url(#paint0_linear_2236_43806)" fillOpacity="0.1"/>
              <g filter="url(#filter1_d_2236_43806)">
                <path d="M135.348 63.528V64.872H131.784V67.14H134.64V68.436H131.784V72H130.092V63.528H135.348ZM138.183 63.528V72H136.491V63.528H138.183ZM146.889 72H145.197L141.405 66.24V72H139.713V63.528H141.405L145.197 69.336V63.528H146.889V72ZM155.872 67.752C155.872 68.592 155.696 69.332 155.344 69.972C154.992 70.612 154.48 71.112 153.808 71.472C153.144 71.824 152.352 72 151.432 72H148.42V63.528H151.432C152.352 63.528 153.144 63.704 153.808 64.056C154.48 64.4 154.992 64.892 155.344 65.532C155.696 66.164 155.872 66.904 155.872 67.752ZM151.288 70.488C152.2 70.488 152.904 70.248 153.4 69.768C153.904 69.288 154.156 68.616 154.156 67.752C154.156 66.88 153.904 66.204 153.4 65.724C152.904 65.244 152.2 65.004 151.288 65.004H150.112V70.488H151.288ZM164.912 70.296H161.516L160.916 72H159.128L162.248 63.624H164.18L167.288 72H165.5L164.912 70.296ZM164.456 69.012L163.208 65.436L161.96 69.012H164.456ZM174.739 63.444C175.771 63.444 176.627 63.7 177.307 64.212C177.987 64.716 178.423 65.4 178.615 66.264H176.839C176.671 65.88 176.403 65.576 176.035 65.352C175.675 65.12 175.247 65.004 174.751 65.004C174.263 65.004 173.831 65.116 173.455 65.34C173.079 65.564 172.787 65.884 172.579 66.3C172.371 66.716 172.267 67.204 172.267 67.764C172.267 68.652 172.503 69.344 172.975 69.84C173.455 70.336 174.107 70.584 174.931 70.584C175.539 70.584 176.059 70.404 176.491 70.044C176.931 69.684 177.215 69.184 177.343 68.544H174.475V67.332H178.759V68.964C178.639 69.524 178.403 70.04 178.051 70.512C177.707 70.984 177.251 71.364 176.683 71.652C176.123 71.932 175.479 72.072 174.751 72.072C173.919 72.072 173.183 71.892 172.543 71.532C171.911 71.164 171.419 70.656 171.067 70.008C170.723 69.352 170.551 68.604 170.551 67.764C170.551 66.924 170.723 66.18 171.067 65.532C171.419 64.876 171.911 64.364 172.543 63.996C173.175 63.628 173.907 63.444 174.739 63.444ZM185.186 70.296H181.79L181.19 72H179.402L182.522 63.624H184.454L187.562 72H185.774L185.186 70.296ZM184.73 69.012L183.482 65.436L182.234 69.012H184.73ZM197.607 63.624V72H195.927V66.156L193.779 72H192.315L190.167 66.18V72H188.475V63.624H190.527L193.071 69.924L195.567 63.624H197.607ZM200.831 64.872V67.068H203.831V68.364H200.831V70.644H204.191V72H199.139V63.528H204.191V64.872H200.831Z" fill="white"/>
              </g>
              <g filter="url(#filter2_f_2236_43806)">
                <ellipse cx="167" cy="46" rx="122" ry="14" fill="white" fillOpacity="0.5"/>
              </g>
            </g>
            <rect x="48.5" y="48.5" width="237" height="39" rx="19.5" stroke="url(#paint1_linear_2236_43806)" strokeOpacity="0.5"/>
          </g>
          <defs>
            <filter id="filter0_ddd_2236_43806" x="0" y="0" width="334" height="140" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="8" operator="erode" in="SourceAlpha" result="effect1_dropShadow_2236_43806"/>
              <feOffset dy="28"/>
              <feGaussianBlur stdDeviation="16"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.0235294 0 0 0 0 0.0470588 0 0 0 0 0.172549 0 0 0 0.5 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2236_43806"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="24"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.65 0 0 0 0 0 0 0 0 0.5 0"/>
              <feBlend mode="normal" in2="effect1_dropShadow_2236_43806" result="effect2_dropShadow_2236_43806"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.550834 0 0 0 0 0.326378 0 0 0 0 0.0628872 0 0 0 1 0"/>
              <feBlend mode="normal" in2="effect2_dropShadow_2236_43806" result="effect3_dropShadow_2236_43806"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_2236_43806" result="shape"/>
            </filter>
            <filter id="filter1_d_2236_43806" x="126.092" y="59.444" width="82.099" height="18.628" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="2"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2236_43806"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2236_43806" result="shape"/>
            </filter>
            <filter id="filter2_f_2236_43806" x="1" y="-12" width="332" height="116" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="14" result="effect1_foregroundBlur_2236_43806"/>
            </filter>
            <linearGradient id="paint0_linear_2236_43806" x1="167" y1="48" x2="167" y2="88" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint1_linear_2236_43806" x1="167" y1="48" x2="167" y2="88" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
            <clipPath id="clip0_2236_43806">
              <rect x="48" y="48" width="238" height="40" rx="20" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <button 
          onClick={handleClick} 
          disabled={isLoading}
          style={{
            position: 'absolute',
            top: 48,
            left: 48,
            width: 238,
            height: 40,
            background: 'transparent',
            border: 'none',
            borderRadius: 20,
            cursor: isLoading ? 'wait' : 'pointer',
            zIndex: 10,
          }}
        />
        {error && (
          <div style={{
            position: 'absolute',
            bottom: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#FF6161',
            fontSize: '12px',
            whiteSpace: 'nowrap'
          }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
} 