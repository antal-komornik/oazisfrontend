
export default function Home() {
  return (
    <div>

      <div className="block md:hidden">
        <h1 className="text-xl font-bold">Mobil Dashboard</h1>
        <p>Itt található a mobil verzió tartalma.</p>
      </div>

      <div className="hidden md:block ">
        <h1 className="text-2xl font-bold">Desktop Dashboard</h1>
        <p>Ez az asztali nézet tartalma.</p>
        </div>

    </div>
  );
}
