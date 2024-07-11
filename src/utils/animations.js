import gsap from 'gsap'; // Importation de la bibliothèque GSAP (GreenSock Animation Platform)

// Importation du plugin ScrollTrigger de GSAP
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger); // Enregistrement du plugin ScrollTrigger avec GSAP

// Fonction pour animer un élément cible avec GSAP et ScrollTrigger
export const animateWithGsap = (target, animationProps, scrollProps) => {
	gsap.to(target, {
		// Application des propriétés d'animation
		...animationProps,
		// Configuration de ScrollTrigger
		scrollTrigger: {
			trigger: target, // Élément qui déclenche l'animation
			// La propriété toggleActions dans ScrollTrigger spécifie quelles
			// actions doivent être prises en fonction des événements de défilement. Elle
			//  accepte une chaîne de quatre actions séparées par des espaces. Ces actions
			//  sont exécutées dans l'ordre suivant : onEnter, onLeave, onEnterBack, onLeaveBack.
			toggleActions: 'restart reverse restart reverse', // Actions à effectuer lors des événements de défilement
			start: 'top 85%', // Point de départ de l'animation (lorsque le haut de l'élément atteint 85% de la hauteur de la fenêtre)
			...scrollProps, // Autres propriétés de défilement personnalisées
		},
	});
};

// Fonction pour animer plusieurs éléments dans une timeline avec GSAP et ScrollTrigger
export const animateWithGsapTimeline = (
	timeline,
	rotationRef,
	rotationState,
	firstTarget,
	secondTarget,
	animationProps
) => {
	// Première animation : rotation d'un élément référencé
	timeline.to(rotationRef.current.rotation, {
		y: rotationState, // Nouvelle valeur de rotation sur l'axe Y
		duration: 1, // Durée de l'animation en secondes
		ease: 'power2.inOut', // Type d'interpolation pour l'animation
	});

	// Deuxième animation : animation du premier élément cible
	timeline.to(
		firstTarget,
		{
			...animationProps, // Propriétés d'animation appliquées
			ease: 'power2.inOut', // Type d'interpolation pour l'animation
		},
		'<' // Indicateur de timing pour que cette animation commence en même temps que la précédente
	);

	// Troisième animation : animation du deuxième élément cible
	timeline.to(
		secondTarget,
		{
			...animationProps, // Propriétés d'animation appliquées
			ease: 'power2.inOut', // Type d'interpolation pour l'animation
		},
		'<' // Indicateur de timing pour que cette animation commence en même temps que les précédentes
	);
};
