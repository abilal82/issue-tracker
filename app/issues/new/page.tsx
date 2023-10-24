'use client'
import { Button, CalloutRoot, Callout,TextField, TextFieldRoot, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm , Controller} from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import {zodResolver} from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationschema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import delay from 'delay';

// interface NewIssueForm {
//     title : string,
//     description : string
// }

type NewIssueForm = z.infer<typeof createIssueSchema>
const NewIssuePage =  () => {

    const [error, setError] = useState('');
    const [isSubmiting, setIsSubmiting] = useState(false);
    const router = useRouter();
    const {register, control, handleSubmit,formState : {errors}} = useForm<NewIssueForm>({
        resolver: zodResolver(createIssueSchema)
    });

     delay(3000).then(data => console.log(data));

    const onSubmit = handleSubmit( async (data) => {
        try {
            setIsSubmiting(true);
            await axios.post('/api/issues',data);
            router.push('/issues');
            
        } catch (error) {
            setIsSubmiting(true);
            setError('An unexpected error occured.')
        }
        
    })
    
  return (

   

    
    <div className='max-w-xl'>

        {error && 
        <CalloutRoot color='red' className='mb-5' highContrast role="alert" size='2'>
            <Callout.Text>{error}</Callout.Text>
        </CalloutRoot>}

        <form className=' space-y-3' 
        onSubmit={onSubmit}>
        <TextFieldRoot>
            <TextField.Input placeholder='Enter issue title' {...register('title')}/>
        </TextFieldRoot>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller name='description' control={control} render={({field}) => <SimpleMDE placeholder='Description' {...field}/> } />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Button disabled={isSubmiting}>Submit New Issue{isSubmiting && <Spinner/>}</Button>
    </form>
    </div>

   
  )
}


export default NewIssuePage