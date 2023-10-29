'use client'
import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

function AssigneeSelect() {

    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey : ['users'],
        queryFn: () => axios.get('/api/users').then(res =>res.data ),
        staleTime: 1000, // 60s
        retry: 5
    });


    if(isLoading)return <Skeleton/>
    if(error) return null;
    // const [users, setUsers] = useState<User[]>([]);
    
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const {data} = await axios.get<User[]>('/api/users');
    //         setUsers(data);
    //     }
    //     fetchUsers();
    // },[])
    
  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>{user.email}</Select.Item>

          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
