'use client'
import { Button, CalloutRoot, Callout,TextField, TextFieldRoot, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm , Controller} from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {zodResolver} from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationschema';
import { z } from 'zod';

// interface NewIssueForm {
//     title : string,
//     description : string
// }

type NewIssueForm = z.infer<typeof createIssueSchema>
const NewIssuePage = () => {

    const [error, setError] = useState('');
    const router = useRouter();
    const {register, control, handleSubmit,formState : {errors}} = useForm<NewIssueForm>({
        resolver: zodResolver(createIssueSchema)
    });

    
  return (

    <div className='max-w-xl'>

        {error && 
        <CalloutRoot color='red' className='mb-5' highContrast role="alert" size='2'>
            <Callout.Text>{error}</Callout.Text>
        </CalloutRoot>}

        <form className=' space-y-3' 
        onSubmit={handleSubmit( async (data) => {
            try {
                await axios.post('/api/issues',data);
                router.push('/issues');
                
            } catch (error) {
                setError('An unexpected error occured.')
            }
        })}>
        <TextFieldRoot>
            <TextField.Input placeholder='Enter issue title' {...register('title')}/>
        </TextFieldRoot>
            {errors && <Text color='red' as='p'>{errors.title?.message}</Text>}
        <Controller name='description' control={control} render={({field}) => <SimpleMDE placeholder='Description' {...field}/> } />
        { errors && <Text color='red' as='p'>{errors.description?.message}</Text>}
        <Button>Submit New Issue</Button>
    </form>
    </div>
   
  )
}

export default NewIssuePage