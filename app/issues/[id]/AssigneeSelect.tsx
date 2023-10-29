"use client";
import prisma from "@/prisma/client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

function AssigneeSelect({ issue }: { issue: Issue }) {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1000, // 60s
    retry: 5,
  });

  if (isLoading) return <Skeleton />;
  if (error) return null;
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //     const fetchUsers = async () => {
  //         const {data} = await axios.get<User[]>('/api/users');
  //         setUsers(data);
  //     }
  //     fetchUsers();
  // },[])

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(userId) => {
          axios
            .patch("/api/issues/" + issue.id, {
              assignedToUserId: userId || null,
            })
            .then((data) => toast.success("Changes have been updated."))
            .catch((error) => toast.error("Changes couldn't be saved."));
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.email}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster/>
    </>
  );
}

export default AssigneeSelect;
