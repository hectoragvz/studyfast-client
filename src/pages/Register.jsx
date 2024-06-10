import Form from "@/components/Form";

function Register() {
  return (
    <div className="notebook-background">
      <Form route="/api/user/register/" method="register" />
    </div>
  );
}

export default Register;
