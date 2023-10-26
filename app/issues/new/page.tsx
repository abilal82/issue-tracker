'use client'
import { ErrorMessage, Spinner } from '@/app/components';
import { createIssueSchema } from '@/app/validationschema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, CalloutRoot, TextField, TextFieldRoot } from '@radix-ui/themes';
import axios from 'axios';
import delay from 'delay';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';
import IssueForm from '../_components/IssueForm';


const NewIssuePage =  () => {   
  return (
    <div>
        <IssueForm/>
    </div>
  )
}


export default NewIssuePage