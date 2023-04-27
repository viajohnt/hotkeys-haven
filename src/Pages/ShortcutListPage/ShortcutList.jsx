import React from 'react'
import shortcutList from '../../assets/shortcut-list.png'

export default function ShortcutList() {
  return (
    <div className="overflow-y-auto overflow-x-hidden h-screen">
      <img src={shortcutList} className="listpng translate-y-[8.65rem] translate-x-[.1rem] z-[-30]" />
    </div>
  );
}