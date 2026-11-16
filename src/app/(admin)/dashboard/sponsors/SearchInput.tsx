// "use client";

// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";

// const SearchInput = ({ placeholder }: { placeholder: string }) => {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace } = useRouter();

//   const handleSearch = useDebouncedCallback((term: string) => {
//     const params = new URLSearchParams(searchParams);
//     if (term) {
//       params.set("query", term);
//     } else {
//       params.delete("query");
//     }
//     replace(`${pathname}?${params.toString()}`);
//   }, 300);

//   return (
//     <div className="flex items-center w-full h-10 bg-white border rounded-md focus-within:ring-1 focus-within:ring-main-blue">
//       <Search className="mx-2 text-gray-300" />
//       <Input
//         className="h-full pl-0 border-none shadow-none focus:outline-none focus-visible:ring-0"
//         placeholder={placeholder}
//         onChange={(e) => {
//           handleSearch(e.target.value);
//         }}
//         defaultValue={searchParams.get("query")?.toString()}
//       />
//     </div>
//   );
// };

// export default SearchInput;
