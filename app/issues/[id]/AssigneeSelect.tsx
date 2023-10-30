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
  } = useUsers();

  if (isLoading) return <Skeleton />;
  if (error) return null;
  const assignIssue = (userId : String) => {
    axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userId || null,
      })
      .then((data) => toast.success("Changes have been updated."))
      .catch((error) => toast.error("Changes couldn't be saved."));
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssue}
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

const useUsers = () => useQuery<User[]>({
  queryKey: ["users"],
  queryFn: () => axios.get("/api/users").then((res) => res.data),
  staleTime: 1000, // 60s
  retry: 5,
});
export default AssigneeSelect;
