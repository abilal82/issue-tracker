'use client'
import { Button, TextArea, TextField, TextFieldInput, TextFieldRoot } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextFieldRoot>
            <TextField.Input placeholder='Enter issue title'/>
        </TextFieldRoot>
        <TextArea placeholder='Description'/>
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage