import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useState } from 'react';

const Hero = () => {
  // Initialisation de l'état videoSrc avec une valeur
  //  conditionnelle basée sur la largeur de la fenêtre
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
  
  // Fonction pour mettre à jour videoSrc en fonction de la largeur de la fenêtre
  const handleVideoSrcSet = () => {
    if(window.innerWidth < 760) {
      // Si la largeur de la fenêtre est inférieure à 760 pixels, utiliser smallHeroVideo
      setVideoSrc(smallHeroVideo);
    } else {
      // Sinon, utiliser heroVideo
      setVideoSrc(heroVideo);
    }
  }
  
  useEffect(() => {
    // Ajouter un écouteur d'événement 'resize' à la fenêtre pour appeler handleVideoSrcSet 
    // à chaque redimensionnement
    window.addEventListener('resize', handleVideoSrcSet);
  
    // Fonction de nettoyage pour supprimer l'écouteur d'événement
    //  lorsque le composant est démonté
    return () => {
      window.removeEventListener('resize', handleVideoSrcSet); // Correction de la faute de frappe 'reisze'
    }
  }, []); // Le tableau de dépendances vide signifie que cet effet s'exécute une fois après le montage du composant
  

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 })
    gsap.to('#cta', { opacity: 1, y: -50, delay: 2 })
  }, [])

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">iPhone 15 Pro</p>
        <div className="md:w-10/12 w-9/12">
          <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero