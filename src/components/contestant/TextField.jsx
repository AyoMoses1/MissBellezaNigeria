import React from 'react'
import { useField } from 'formik'

const TextField = ({label, ...props}) => {

    const [field, meta] = React.useState(props)
    console.log(meta)
  return (
    <div>
        <label htmlFor={field.name}></label>
        <input type='text'/>
    </div>
  )
}

export default TextField