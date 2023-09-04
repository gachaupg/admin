import React from 'react'

const Footer = () => {
  return (
    <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        ©{new Date().getFullYear()} Copyright:
        <span>Eazybuyenterprises All Rights Reserved </span>
      </div>
  )
}

export default Footer