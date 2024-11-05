

import * as React from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditCard } from "./EditCard";

export function UserDisplay() {
  const [users, setUsers] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userToPass, setUserToPass] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/get-user", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const text = await res.text();
        const data = text ? JSON.parse(text) : [];
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const openDrawer = (user) => {
    setIsDrawerOpen(true);
    setUserToPass(user);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="grid grid-cols-3 gap-10">
      {users.map((user) => (
        <Card key={user.id} className="w-[350px] shadow-lg">
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Full Name"
                    value={`${user.firstName} ${user.lastName}`}
                    readOnly
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    placeholder="Role"
                    value={user.role}
                    readOnly
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    value={user.email}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={() => openDrawer(user)}>View Details</Button>
          </CardFooter>
        </Card>
      ))}
      <EditCard isOpen={isDrawerOpen} onClose={closeDrawer} user={userToPass} />
    </div>
  );
}