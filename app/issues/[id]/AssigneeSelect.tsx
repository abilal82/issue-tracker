'use client'
import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

function AssigneeSelect() {

    const [users, setUsers] = useState<User[]>([]);
    
    useEffect(() => {
        const fetchUsers = async () => {
            const {data} = await axios.get<User[]>('/api/users');
            setUsers(data);
        }
        fetchUsers();
    },[])
    
  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map(user => (
              <Select.Item key={user.id} value={user.id}>{user.email}</Select.Item>

          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
