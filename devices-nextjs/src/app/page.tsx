import Devices from "@/Features/Devices";
import Devices2 from "@/Features/Devices2";
import { FromFigmaAnimaPlug } from "@/Features/FromFigmaAnimaPlug";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div>
        {/* <Devices /> */}
        {/* <Devices2 /> */}
        <FromFigmaAnimaPlug />
      </div>
    </main>
  );
}
