import Form from "@/components/Form";

function Login() {
  return (
    <div className="notebook-background">
      <Form route="/api/token/" method="login" />
    </div>
  );
}

export default Login;
