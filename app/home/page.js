"use client"
import React from 'react'
import About from './about'
import ActionSection from './action-section'
import Hero from './hero'

const Home = () => {
  return (
    <div className='flex flex-col mt-[10px]'>
      <Hero />
      <About />
      <ActionSection />
    </div>
  )
}

export default Home