import { beautifyString } from "@/lib/utils";
import { Clipboard } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { ContentRenderer } from "./ui/render";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useToast } from "./molecules/Toast/use-toast";

type DataTableProps = {
  title?: string;
  truncateLongData?: boolean;
  data: { [key: string]: Array<any> };
};

export default function DataTable({
  title,
  truncateLongData,
  data,
}: DataTableProps) {
  const { toast } = useToast();

  const copyData = (pin: string, data: string) => {
    navigator.clipboard.writeText(data).then(() => {
      toast({
        title: `"${pin}" data copied to clipboard!`,
        duration: 2000,
      });
    });
  };

  return (
    <>
      {title && <strong className="mt-2 flex justify-center">{title}</strong>}
      <Table className="cursor-default select-text">
        <TableHeader>
          <TableRow>
            <TableHead>Pin</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(data).map(([key, value]) => (
            <TableRow className="group" key={key}>
              <TableCell className="cursor-text">
                {beautifyString(key)}
              </TableCell>
              <TableCell className="cursor-text">
                <div className="flex min-h-9 items-center whitespace-pre-wrap">
                  <Button
                    className="absolute right-1 top-auto m-1 hidden p-2 group-hover:block"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      copyData(
                        beautifyString(key),
                        value
                          .map((i) =>
                            typeof i === "object"
                              ? JSON.stringify(i, null, 2)
                              : String(i),
                          )
                          .join(", "),
                      )
                    }
                    title="Copy Data"
                  >
                    <Clipboard size={18} />
                  </Button>
                  {value.map((item, index) => (
                    <React.Fragment key={index}>
                      <ContentRenderer
                        value={item}
                        truncateLongData={truncateLongData}
                      />
                      {index < value.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
