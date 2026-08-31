import ModalShell from '../../../components/auth/ModalShell';
import { LoginForm } from '../../../components/auth/AuthForms';

export default function LoginModal() {
  return (
    <ModalShell>
      <LoginForm />
    </ModalShell>
  );
}
