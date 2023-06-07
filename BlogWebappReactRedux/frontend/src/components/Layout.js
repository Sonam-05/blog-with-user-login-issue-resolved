import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Contact from '../client/Contact'

const Layout = ({children}) => {
  return (
    <>
      <Header />
      <main style={{"minHeight" : "90vh"}}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
