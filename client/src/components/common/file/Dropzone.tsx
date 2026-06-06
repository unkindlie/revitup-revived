import { Upload } from 'lucide-react';
import type { RefObject } from 'react';

interface FileDropzoneProps {
  fileInputRef?: RefObject<HTMLInputElement | null>;
  handleBoxClick: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileSelect: (files: FileList | null) => void;
}

export function FileDropzone({
  fileInputRef,
  handleBoxClick,
  handleDragOver,
  handleDrop,
  handleFileSelect,
}: FileDropzoneProps) {
  return (
    <div className="w-full">
      <div
        className="border-border flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-8 text-center"
        onClick={handleBoxClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="bg-muted mb-2 rounded-full p-3">
          <Upload className="text-muted-foreground h-5 w-5" />
        </div>
        <p className="text-foreground text-sm font-medium">Upload an image</p>
        <p className="text-muted-foreground mt-1 text-sm">
          or,{' '}
          <label
            htmlFor="fileUpload"
            className="text-primary hover:text-primary/90 cursor-pointer font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            click to browse
          </label>{' '}
        </p>
        <input
          type="file"
          id="fileUpload"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>
    </div>
  );
}
