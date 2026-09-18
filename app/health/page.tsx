async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function HealthPage() {
  const data = await getData();
  return (
    <main className="flex-grow p-8">
      <h1 className="text-3xl font-bold mb-4">Health Check</h1>
      <pre className="bg-zinc-100 p-4 rounded-lg overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
