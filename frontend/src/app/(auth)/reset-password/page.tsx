import ResetPasswordForm from "@/components/ResetPasswordForm";
import { Suspense } from "react";



 const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPassword

