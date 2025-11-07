// while using params in next js 15 always wrap it in async await function and declare it with a await params
export default async function UserProfile({ params }: any) {
  const { id } = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>User Profile</h1>
      <hr />
      <p>
        Welcome to your profile page !
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">{id}</span>
      </p>
    </div>
  );
}
