'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const DeleteIssueButton = ({issueId} : {issueId : number}) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
  <AlertDialog.Trigger>
    <Button color='red'>Delete Issue</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content style={{ maxWidth: 450 }}>
    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
    <AlertDialog.Description size="2">
      Are you sure?
    </AlertDialog.Description>

    <Flex gap="3" mt="4" justify="end">
      <AlertDialog.Cancel>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </AlertDialog.Cancel>
      <AlertDialog.Action>
        <Button variant="solid" color="red" onClick={async () => {
          console.log(issueId);
          
          await axios.delete('/api/issues/'+issueId);
          router.push('/issues');
          router.refresh();
        }}>
          Delete Issuse
        </Button>
      </AlertDialog.Action>
    </Flex>
  </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton