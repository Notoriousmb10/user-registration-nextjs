import { Button } from "@/components/ui/button"
import { CardHolder } from "./CardHolder"
import {
  Dialog,
  DialogContent,
 
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogCard() {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black text-white">Add User</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[610px] py-10 ">
        <CardHolder/>
      </DialogContent>
    </Dialog>
  )
}
