import { useMatchesData } from "~/utils";

export default function Index() {
  const ips = useMatchesData("root")?.ips as string;
  return (
    <main>
      <p>
        {ips}
      </p>
    </main>
  );
}
