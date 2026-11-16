import { Metadata } from "next";
import FormatPage from "@/components/formats/FormatPage";
import { getFormat } from "@/components/formats/formats-data";

const format = getFormat("career-fair");

export const metadata: Metadata = {
  title: "Career Fair",
  description: format.summary,
};

export default function Page() {
  return <FormatPage format={format} />;
}
