import ModalShell from '../../../components/auth/ModalShell';
import { SignupForm } from '../../../components/auth/AuthForms';

export default function SignupModal() {
  return (
    <ModalShell>
      <SignupForm />
    </ModalShell>
  );
}
