import Dashboard from "./dashboard";

export const dynamic = "force-static";

export default async function Home() {
  const advocates = await getAdvocates();

  return <Dashboard advocates={advocates} />;
}

async function getAdvocates() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/advocates`);
  const advocates = await res.json();

  return advocates.data;
}
