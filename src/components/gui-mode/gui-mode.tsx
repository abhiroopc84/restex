import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { CirclePlus, GripVertical, Pencil, Save, Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import { SectionsContext } from "../context/sections-provider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import FormBuilder from "./form-builder";
import { guischemas as schemas } from "@/models/schemas";
import HeaderSchema from "@/models/header";
import { ScrollArea } from "../ui/scroll-area";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { Input } from "../ui/input";

export const GuiMode = () => {
  const { sections, setSections } = useContext(SectionsContext);
  const [typeOpen, setTypeOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [currSection, setCurrSection] = useState<string>("header");

  const handleFormSubmit = (sectionId: number, values: any) => {
    setSections((sections) =>
      sections.map((section) =>
        section.id === sectionId ? { ...section, values } : section
      )
    );
    console.log(values);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
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
  };

  const handleNewSection = (type: string) => {
    const newSection = {
      id: sections.length,
      name: "section" + sections.length,
      type: type,
      values: {},
    };

    setSections((sections) => [...sections, newSection]);
    setCurrSection(newSection.id.toString());
  };

  return (
    <>
      <Tabs
        value={currSection}
        onValueChange={(value) => setCurrSection(value)}
        className="flex h-full gap-2"
      >
        <div className="relative w-1/4">
          <ScrollArea className="h-[74vh] relative overflow-x-hidden bg-muted rounded-md py-2">
            <div className="px-2 absolute z-10 w-full">
              <Popover open={typeOpen} onOpenChange={setTypeOpen}>
                <PopoverTrigger asChild className="w-full">
                  <Button className="">
                    <CirclePlus className="mr-2 h-4 w-4" />
                    Section
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="center">
                  <Command>
                    <CommandInput placeholder="Search type" />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {Object.keys(schemas).map((schema) => {
                          const name =
                            schema[0].toUpperCase() +
                            schema.slice(1) +
                            " Entry";
                          return (
                            <CommandItem
                              key={schema}
                              value={schema}
                              onSelect={(value) => {
                                handleNewSection(value);
                                setTypeOpen(false);
                              }}
                            >
                              {name} - {schema}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <TabsList className="flex flex-col mt-10 justify-start items-start gap-2 w-full p-2">
              <TabsTrigger
                value="header"
                className="flex w-full justify-start h-12"
              >
                Header
              </TabsTrigger>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[
                  restrictToVerticalAxis,
                  restrictToFirstScrollableAncestor,
                ]}
              >
                <SortableContext
                  items={sections}
                  strategy={verticalListSortingStrategy}
                >
                  {sections.slice(1).map((i) => (
                    <SectionTrigger
                      id={i.id}
                      key={i.id}
                      name={i.name}
                      value={i.id}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </TabsList>
          </ScrollArea>
        </div>
        <TabsContent value="header" className="w-full mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Header</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormBuilder
                formSchema={HeaderSchema}
                initialValues={sections[0].values || {}}
                handleFormSubmit={(values) =>
                  handleFormSubmit(sections[0].id, values)
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
        {sections.slice(1).map((section) => (
          <TabsContent
            value={section.id.toString()}
            className="w-full mt-0"
            key={section.id}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between	">
                <div>
                  <CardTitle className="flex flex-row items-center gap-2">
                    {edit == false ? (
                      section.name
                    ) : (
                      <Input
                        value={title}
                        onChange={(event) => {
                          setTitle(event.target.value);
                        }}
                        className="w-1/2"
                      ></Input>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (edit) {
                          setSections((sections) =>
                            sections.map((sect) =>
                              sect.id === section.id
                                ? { ...sect, name: title }
                                : sect
                            )
                          );
                        } else {
                          setTitle(section.name);
                        }
                        setEdit((prev) => !prev);
                      }}
                    >
                      {edit == false ? (
                        <Pencil className="h-4 w-4" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    {section.type[0].toUpperCase() + section.type.slice(1)}
                  </CardDescription>
                </div>
                <Button size="icon" variant="destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                <FormBuilder
                  formSchema={schemas[section.type]}
                  initialValues={section.values || {}}
                  handleFormSubmit={(values) =>
                    handleFormSubmit(section.id, values)
                  }
                />{" "}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

const SectionTrigger = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="w-full flex relative"
    >
      <TabsTrigger
        value={props.id.toString()}
        key={props.name}
        className="flex justify-between w-full h-12"
      >
        {props.name}
        <Button
          variant="ghost"
          asChild
          {...listeners}
          className="py-1 px-1 rounded"
        >
          <GripVertical className="h-8 w-6" />
        </Button>
      </TabsTrigger>
    </div>
  );
};
