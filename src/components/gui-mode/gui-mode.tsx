import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CirclePlus, GripVertical } from "lucide-react";
import { useContext, useState } from "react";
import { SectionsContext } from "../context/sections-provider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { schemas } from "@/helpers/yaml-parser";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

function HeaderForm({ data, onDataChange }) {
  return (
    <form>
      <Input></Input>
    </form>
  );
}

export const GuiMode = () => {
  const { sections, setSections } = useContext(SectionsContext);
  const [typeOpen, setTypeOpen] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    console.log(active, over);

    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((obj) => obj.id === active.id);
        const newIndex = items.findIndex((obj) => obj.id === over.id);
        console.log("from: ", oldIndex, "to: ", newIndex);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const handleNewSection = (type: string) => {
    const newSection = {
      id: sections.length + 1,
      name: "section" + (sections.length + 1),
      type: type,
    };

    setSections((sections) => [...sections, newSection]);
  };

  return (
    <Tabs defaultValue="header" className="flex gap-2 h-full">
      <TabsList className="flex-col h-full justify-start items-start gap-2 w-1/4 p-2">
        {/* <Popover open={typeOpen} onOpenChange={setTypeOpen}>
          <PopoverTrigger className="w-full" asChild>
            <Button className="w-full">
              <CirclePlus className="mr-2 h-4 w-4" />
              New Section
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="center">
            <Command>
              <CommandInput placeholder="Search type" />
              <CommandList>
                <CommandGroup>
                  {Object.keys(schemas).map((schema) => {
                    const name =
                      schema[0].toUpperCase() + schema.slice(1) + " Entry";
                    return (
                      <CommandItem
                        key={schema}
                        value={schema}
                        onSelect={(value) => {
                          handleNewSection(value);
                          setTypeOpen(false);
                        }}
                      >
                        {name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover> */}
        <Popover open={typeOpen} onOpenChange={setTypeOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-[200px] justify-between"
            >
              "Select framework..."
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." className="h-9" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {Object.keys(schemas).map((schema) => (
                    <CommandItem
                      key={schema}
                      value={schema}
                      onSelect={() => {
                        setTypeOpen(false);
                      }}
                    >
                      {schema}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <TabsTrigger value="header" className="w-full justify-start h-10">
          Header
        </TabsTrigger>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((i) => (
              <SectionTrigger id={i.id} key={i.id} name={i.name} value={i.id} />
            ))}
          </SortableContext>
        </DndContext>
      </TabsList>
      <TabsContent value="header" className="w-full mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Header</CardTitle>
            {/* <CardDescription>section type goes here</CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-2">
            <HeaderForm />
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      {sections.map((section) => (
        <TabsContent
          value={section.id}
          className="w-full mt-0"
          key={section.id}
        >
          <Card>
            <CardHeader>
              <CardTitle>{section.name}</CardTitle>
              <CardDescription>{section.type}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">form goes here</CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

function SectionTrigger(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} className="w-full">
      <TabsTrigger
        value={props.id}
        key={props.name}
        className="flex justify-between w-full"
      >
        {props.name}
        <Button variant="ghost" {...listeners} className="py-1 px-1 rounded">
          <GripVertical className="h-4 w-4" />
        </Button>
      </TabsTrigger>
    </div>
  );
}
