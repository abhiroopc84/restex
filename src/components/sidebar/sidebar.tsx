import { Blocks, Text } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useContext } from "react";
import { TemplateContext } from "../context/template-provider";

export const Sidebar = () => {
  const { template, setTemplate } = useContext(TemplateContext);
  
  return (
    <div className="flex-col space-y-4 sm:flex md:order-2">
      <div className="grid gap-2">
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Mode
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-[320px] text-sm" side="left">
            Choose the interface that best suits you. You can choose to preview
            the result in a new window, or in the same one.
          </HoverCardContent>
        </HoverCard>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="text">
            <span className="sr-only">Text</span>
            <Text className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="gui">
            <span className="sr-only">GUI</span>
            <Blocks className="h-5 w-5" />
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="grid gap-2">
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Template
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-[320px] text-sm" side="left">
            Select the template that best suits you.
          </HoverCardContent>
        </HoverCard>
        <Select value={template} onValueChange={(event) => setTemplate(event)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="faangpath">FAANGPath</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
