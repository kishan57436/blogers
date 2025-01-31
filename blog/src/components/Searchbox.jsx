import React, { useState } from 'react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom'
import { Routesearch } from './helpers/RouterName'

const Searchbox = () => {


  const navigate = useNavigate()
  const [query, setQuery] = useState()
  const getInput = (e) => {
      setQuery(e.target.value)
  }
  const handleSubmit = (e) => {
      e.preventDefault()
      navigate(Routesearch(query))
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='text-white'>
        <Input name="q" onInput={getInput} placeholder="Seach here....." className="h-9 rounded-full"/>
      </form>
    </div>
  )
}

export default Searchbox
