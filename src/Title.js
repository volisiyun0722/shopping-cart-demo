import React from 'react'

export default function Title({mainTitle}) {
  const titleStyle={
    textAlign:"center"
  }
  return (
    <div>
         <h1 style={titleStyle}>
          {mainTitle}
          </h1>
    </div>
  )
}
