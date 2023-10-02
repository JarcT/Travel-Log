import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import  {postData} from '../api/api'

export default function form({longitude, latitude, onClose}) {
  const {register, handleSubmit} = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit =async (data) => {
    const fullData = {...data, longitude: longitude, latitude: latitude}
    console.log(fullData);
    try {
      setLoading(true)
      const created = await postData(fullData)
      onClose()
    } catch (error) {
      console.log(error)
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}  className='form'>
      {error ? <h3>{error}</h3> : null}
      <label>
        Title: 
        <br />
        <input type="text" name='title' required {...register("title")}/>
      </label>
      <label>
        Description: 
        <br />
        <textarea name="description"  cols="25" rows="3" {...register("description")}></textarea>
      </label>
      <label>
        Date visited: 
        <br />
        <input type="date" name="date" {...register("date")}/>
      </label>
      <button disabled={loading}>{loading? 'Loading...' :'Create Entry'}</button>
    </form>
  )
}

