import { useRef, useState } from 'react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/common/spinner/Spinner';

import { FileDropzone } from '@/components/common/file/Dropzone';
import { FileList } from '@/components/common/file/FileList';

import { useUploadUserPfp } from '@/hooks/features/users/useUploadUserPfp';
import { useCloseDialog } from '@/hooks/ui/useCloseDialog';
import { isImageFile, ensureSquareFile } from '@/lib/image/upload';
import { useTranslation } from '../../../../hooks/useTranslation';

export function ChangeProfilePictureDialog({ userId }: { userId: number }) {
  const { closeHidden, closeRef } = useCloseDialog();
  const { mutateAsync: uploadPfp, isPending } = useUploadUserPfp(userId);
  const { t } = useTranslation(['users']);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  const handleFileSelect = (list: FileList | null) => {
    if (!list?.length) return;

    const file = list[0];

    if (!isImageFile(file)) {
      toast.error('Only images allowed');
      return;
    }

    setFiles([file]);
    setProgress({ [file.name]: 0 });
  };

  const handleUpload = async () => {
    const file = files[0];
    if (!file) return;

    try {
      const processed = await ensureSquareFile(file);

      setProgress({ [file.name]: 30 });

      await uploadPfp(processed);

      setProgress({ [file.name]: 100 });

      toast.success('Uploaded');

      setFiles([]);
      setProgress({});
      closeRef.current?.click();
    } catch (e: any) {
      toast.error(e?.message ?? 'Upload failed');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          {t('profile.actions.changePfp.title')}
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('profile.actions.changePfp.title')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <FileDropzone
            fileInputRef={fileInputRef}
            handleBoxClick={() => fileInputRef.current?.click()}
            handleDragOver={(e) => e.preventDefault()}
            handleDrop={(e) => {
              e.preventDefault();
              handleFileSelect(e.dataTransfer.files);
            }}
            handleFileSelect={handleFileSelect}
          />

          <FileList
            uploadedFiles={files}
            fileProgresses={progress}
            removeFile={(name) =>
              setFiles((p) => p.filter((f) => f.name !== name))
            }
          />

          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={!files.length || isPending}
          >
            {isPending ? (
              <Spinner size="sm" />
            ) : (
              t('profile.actions.changePfp.action')
            )}
          </Button>
        </div>

        {closeHidden}
      </DialogContent>
    </Dialog>
  );
}
