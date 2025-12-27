export const getStatutCouleur = (statut) => {
switch (statut) {
case 'excellent': return 'bg-green-500'
case 'bon': return 'bg-yellow-500'
case 'risque': return 'bg-orange-500'
case 'deconseille': return 'bg-red-500'
case 'alerte': return 'bg-purple-500'
default: return 'bg-gray-500'
}
}


export const getStatutTexte = (statut) => {
switch (statut) {
case 'excellent': return '🟢 Excellent'
case 'bon': return '🟡 Bon'
case 'risque': return '🟠 Risqué'
case 'deconseille': return '🔴 Déconseillé'
case 'alerte': return '🟣 Alerte'
default: return 'Neutre'
}
}