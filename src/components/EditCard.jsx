import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "../../src/app/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EditCard({ isOpen, onClose, user }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const ProfileForm = ({ user }) => {
    const [editUser, setEditUser] = React.useState({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      role: user.role || "",
      gender: user.gender || "",
    });

    React.useEffect(() => {
      if (user) {
        setEditUser({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          role: user.role || "",
          gender: user.gender || "",
        });
      }
    }, [user]);

    const updateUser = async (id, data) => {
      try {
        const res = await fetch("/api/update-user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, data }),
        });
        const result = await res.json();
        alert("User updated successfully");
      } catch (err) {
        console.log(err);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      updateUser(user.id, editUser);
    };

    if (!user) {
      return null; // or return a loading indicator
    }

    return (
      <form className={cn("grid items-start gap-4")} onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            value={editUser.firstName}
            onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            value={editUser.lastName}
            onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <Input
            type="text"
            id="role"
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="gender">Gender</Label>
          <Input
            type="text"
            id="gender"
            value={editUser.gender}
            onChange={(e) => setEditUser({ ...editUser, gender: e.target.value })}
          />
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    );
  };

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm user={user} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm user={user} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}