import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta title="Login page" description="Login page pet care" />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
