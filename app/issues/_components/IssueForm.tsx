'use client'
import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationschema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, CalloutRoot, TextField, TextFieldRoot } from '@radix-ui/themes';
import axios from 'axios';
import delay from 'delay';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';



type IssueFormData = z.infer<typeof issueSchema>

const IssueForm =  ({issue}: { issue?: Issue}) => {

    const [error, setError] = useState('');
    const [isSubmiting, setIsSubmiting] = useState(false);
    const router = useRouter();
    const {register, control, handleSubmit,formState : {errors}} = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });


    const onSubmit = handleSubmit( async (data) => {
        try {
            setIsSubmiting(true);
            
            if(issue)
                await axios.patch('/api/issues/'+issue.id,data)
            else 
                await axios.post('/api/issues',data);
            router.push('/issues/list');
            router.refresh();
        } catch (error) {
            setError('An unexpected error occured.')
            await delay(2000);

            setIsSubmiting(false);
        }
        
    });

    
  return (
    <div className='max-w-xl'>
        {error && 
        <CalloutRoot color='red' className='mb-5' highContrast role="alert" size='2'>
            <Callout.Text>{error}</Callout.Text>
        </CalloutRoot>}

    <form className=' space-y-3' 
        onSubmit={onSubmit}>
        <TextFieldRoot>
            <TextField.Input placeholder='Enter issue title'defaultValue={issue?.title}  {...register('title')}/>
        </TextFieldRoot>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller name='description' defaultValue={issue?.description} control={control} render={({field}) => <SimpleMDE  placeholder='Description' {...field}/> } />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Button disabled={isSubmiting}>
            {issue ? 'Update Issue' : 'Submit New Issue'}{''}
            {isSubmiting && <Spinner/>}
        </Button>
    </form>
    </div>

   
  )
}


export default IssueForm