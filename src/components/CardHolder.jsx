"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CardHolder() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    age: null,
    gender: "",
  });

  const addUser = async () => {
    try {
      const res = await fetch("/api/add-user", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });

      const data = await res.json();
      console.log(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="w-[550px]">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
        <CardDescription>Tells Us More About Him</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-2 w-full items-center gap-10 ">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  placeholder="First Name"
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  placeholder="Last Name"
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  placeholder="Role"
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, role: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Age"
                  min="0"
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, age: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  onValueChange={(value) =>
                    setUser((prev) => ({ ...prev, gender: value }))
                  }
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={addUser}>Add</Button>
      </CardFooter>
    </Card>
  );
}
