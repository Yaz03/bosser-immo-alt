import ModalShell from '../../../components/auth/ModalShell';
import { ForgotPasswordForm } from '../../../components/auth/AuthForms';

export default function ForgotPasswordModal() {
  return (
    <ModalShell>
      <ForgotPasswordForm />
    </ModalShell>
  );
}
