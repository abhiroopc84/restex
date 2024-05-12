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
import { Label } from "@/components/ui/label";
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
import React from "react";
import { useState } from "react";
import { MdDragIndicator } from "react-icons/md";

function HeaderForm({ data, onDataChange }) {
  return (
    <form>
      <Input></Input>
    </form>
  );
}

export function GuiMode() {
  const [sections, setSections] = useState([
    { id: 1, name: "section1" },
    { id: 2, name: "section2" },
    { id: 3, name: "section3" },
    { id: 4, name: "section4" },
  ]);
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

  function handleNewSection() {
    const newSection = {
      id: sections.length + 1,
      name: "section" + (sections.length + 1),
    };

    setSections([...sections, newSection]);
  }

  return (
    <Tabs defaultValue="header" className="flex gap-2 h-full">
      <TabsList className="flex-col h-full justify-start items-start gap-2 w-1/4">
        <Button className="w-full" onClick={handleNewSection}>
          New Section
        </Button>
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
              <CardDescription>section type goes here</CardDescription>
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
}

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
          <MdDragIndicator />
        </Button>
      </TabsTrigger>
    </div>
  );
}
