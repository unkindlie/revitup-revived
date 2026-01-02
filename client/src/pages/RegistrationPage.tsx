import Logo from '@/assets/REVITUP_logo.svg?react';

export const RegistrationPage = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="bg-header flex w-96 flex-col items-center justify-center gap-y-3 rounded-lg px-4 py-6">
        <Logo className="h-auto w-60 fill-white" title="Logo" />
        <hr className="mt-1 h-px w-full bg-white" />
        <span className="text-center text-lg font-medium text-white">
          The one and only. Where motorsport lives and revs.
        </span>
      </div>
    </div>
  );
};
