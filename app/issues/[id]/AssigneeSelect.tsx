'use client'
import { Select } from "@radix-ui/themes";

function AssigneeSelect() {
  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value=''>Mosh</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
