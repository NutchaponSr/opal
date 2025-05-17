import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useCreateStore } from "../../store/use-create-modal";
import { OrganizationForm } from "./organization-form";

export const OrganizationModal = () => {
  const { isOpen, onClose } = useCreateStore();

  // TODO: More improved

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[360px] p-5 gap-6">
        <DialogHeader>
          <DialogTitle className="text-xl">Create organization</DialogTitle>
          <DialogDescription>
            Enter the details below to create a new organization for your team or project.
          </DialogDescription>
        </DialogHeader>
        <OrganizationForm />
      </DialogContent>
    </Dialog>
  );
} 