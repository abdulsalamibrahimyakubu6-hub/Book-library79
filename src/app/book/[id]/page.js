export default async function BookPage({ params} ) {
  return (
    <pre>
      {JSON.stringify(params, null, 2)}
    </pre>
  );
  
}
