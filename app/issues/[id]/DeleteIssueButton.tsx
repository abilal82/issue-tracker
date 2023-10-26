'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'


const DeleteIssueButton = ({issueId} : {issueId : number}) => {
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
        <Button variant="solid" color="red">
          Delete Issuse
        </Button>
      </AlertDialog.Action>
    </Flex>
  </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton