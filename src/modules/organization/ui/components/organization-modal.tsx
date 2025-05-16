import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCreateStore } from "../../store/use-create-modal";
import { OrganizationForm } from "./organization-form";

export const OrganizationModal = () => {
  const { isOpen, onClose } = useCreateStore();

  // TODO: More improved

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-100">
        <DialogHeader>
          <DialogTitle className="text-xl">Create organization</DialogTitle>
        </DialogHeader>
        <OrganizationForm />
      </DialogContent>
    </Dialog>
  );
}