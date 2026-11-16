import { Metadata } from "next";
import FormatPage from "@/components/formats/FormatPage";
import { getFormat } from "@/components/formats/formats-data";

const format = getFormat("comic-con");

export const metadata: Metadata = {
  title: "Comic Con",
  description: format.summary,
};

export default function Page() {
  return <FormatPage format={format} />;
}
