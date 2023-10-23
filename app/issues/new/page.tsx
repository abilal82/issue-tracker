'use client'
import { Button, TextField, TextFieldRoot } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm , Controller} from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface NewIssueForm {
    title : string,
    description : string
}
const NewIssuePage = () => {

    const router = useRouter();
    const {register, control, handleSubmit} = useForm<NewIssueForm>();

  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit( async (data) => {
        await axios.post('/api/issues',data);
        router.push('/issues');
    })}>
        <TextFieldRoot>
            <TextField.Input placeholder='Enter issue title' {...register('title')}/>
        </TextFieldRoot>
        <Controller name='description' control={control} render={({field}) => <SimpleMDE placeholder='Description' {...field}/> } />
        <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage