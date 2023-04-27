import React from 'react'
import { FaStar } from 'react-icons/fa'

const FavoriteShortcut = ({ shortcut, isFavorite, onToggleFavorite }) => {
  const toggleFavorite = () => {
    const newIsFavorite = !isFavorite
    onToggleFavorite(shortcut, newIsFavorite)
    const favorites = JSON.parse(localStorage.getItem('favoriteShortcuts') || '[]')

    if (newIsFavorite) {
      favorites.push(shortcut)
    } else {
      const index = favorites.findIndex(fav => fav.id === shortcut.id)
      if (index !== -1) {
        favorites.splice(index, 1)
      }
    }

    localStorage.setItem('favoriteShortcuts', JSON.stringify(favorites))
  }

  return (
    <button onClick={toggleFavorite} aria-label="Toggle favorite">
      <FaStar color={isFavorite ? '#FFD700' : '#ccc'} size={24} />
    </button>
  )
}

export default FavoriteShortcut
