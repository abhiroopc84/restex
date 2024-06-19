import {
  ZodObject,
  ZodString,
  ZodNumber,
  ZodBoolean,
  ZodArray,
  ZodOptional,
  ZodEffects,
  ZodDate,
  ZodSchema,
} from "zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { CalendarIcon, CirclePlus, Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";

const generateDefaultValues = (schema: ZodObject<any>) => {
  const fields = schema.shape;
  const defaultValues: any = {};

  Object.keys(fields).forEach((key) => {
    const fieldSchema = fields[key];

    const actualFieldSchema =
      fieldSchema instanceof ZodOptional || fieldSchema instanceof ZodEffects
        ? fieldSchema._def.innerType || fieldSchema._def.schema
        : fieldSchema;

    if (actualFieldSchema instanceof ZodString) {
      defaultValues[key] = "";
    } else if (actualFieldSchema instanceof ZodNumber) {
      defaultValues[key] = 0;
    } else if (actualFieldSchema instanceof ZodBoolean) {
      defaultValues[key] = false;
    } else if (actualFieldSchema instanceof ZodDate) {
      defaultValues[key] = null;
    } else if (actualFieldSchema instanceof ZodArray) {
      defaultValues[key] = [];
    } else if (actualFieldSchema instanceof ZodObject) {
      defaultValues[key] = generateDefaultValues(actualFieldSchema);
    }
  });

  return defaultValues;
};

const ArrayField = ({
  fieldkey,
  control,
  label,
}: {
  fieldkey: string;
  control: any;
  label: string;
}) => {
  const {
    fields: arrayFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: fieldkey,
  });

  return (
    <FormItem key={fieldkey}>
      <FormLabel className="flex flex-row items-center gap-2">
        {label}
        <Button
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            append("");
          }}
        >
          <CirclePlus className="w-4 h-4" />
        </Button>
      </FormLabel>
      {arrayFields.map((item, index) => (
        <FormField
          key={item.id}
          control={control}
          name={`${fieldkey}[${index}]`}
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center gap-2">
                <FormControl>
                  <Input
                    placeholder={`Enter ${fieldkey} item ${index + 1}`}
                    {...field}
                  />
                </FormControl>
                <Button
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    remove(index);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <FormMessage />
    </FormItem>
  );
};

const FormFields = ({
  schema,
  control,
}: {
  schema: ZodObject<any, any, any>;
  control: any;
}) => {
  const fields = schema.shape;
  const currentField = useWatch({ control, name: "current" });

  return Object.keys(fields).map((key) => {
    const fieldSchema = fields[key];
    let label = key.replace(/_+/g, " ");
    label = label
      .split(" ")
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
    if (!(fieldSchema instanceof ZodOptional)) {
      label = label + "*";
    }

    const actualFieldSchema =
      fieldSchema instanceof ZodOptional || fieldSchema instanceof ZodEffects
        ? fieldSchema._def.innerType || fieldSchema._def.schema
        : fieldSchema;

    if (key === "end_date" && currentField) {
      return null;
    }

    if (actualFieldSchema instanceof ZodDate) {
      return (
        <FormField
          key={key}
          control={control}
          name={key}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    } else if (actualFieldSchema instanceof ZodString) {
      if (key === "text") {
        return (
          <FormField
            key={key}
            control={control}
            name={key}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Textarea placeholder={`Enter ${key}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      }
      return (
        <FormField
          key={key}
          control={control}
          name={key}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder={`Enter ${key}`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    } else if (actualFieldSchema instanceof ZodNumber) {
      return (
        <FormField
          key={key}
          control={control}
          name={key}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={`Enter ${key}`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    } else if (actualFieldSchema instanceof ZodBoolean) {
      return (
        <FormField
          key={key}
          control={control}
          name={key}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  {label.slice(0, label.length - 1)}
                </FormLabel>
                <FormDescription>Is this entry ongoing?</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      );
    } else if (
      actualFieldSchema instanceof ZodArray &&
      actualFieldSchema._def.type instanceof ZodString
    ) {
      return (
        <div key={key}>
          <ArrayField fieldkey={key} control={control} label={label} />
        </div>
      );
    } else if (
      actualFieldSchema instanceof ZodArray &&
      actualFieldSchema._def.type instanceof ZodObject
    ) {
      const {
        fields: arrayFields,
        append,
        remove,
      } = useFieldArray({
        control,
        name: key,
      });

      return (
        <FormItem key={key}>
          <FormLabel className="flex flex-row items-center gap-2">
            {label}
            <Button
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                append(generateDefaultValues(actualFieldSchema._def.type));
              }}
            >
              <CirclePlus className="w-4 h-4" />
            </Button>
          </FormLabel>
          {arrayFields.map((item, index) => (
            <div key={item.id} className="flex flex-row gap-2">
              {Object.keys(item)
                .filter((subKey) => subKey !== "id")
                .map((subKey) => (
                  <FormControl key={`${key}[${index}].${subKey}`}>
                    <Input
                      placeholder={`Enter ${subKey}`}
                      {...control.register(`${key}[${index}].${subKey}`)}
                    />
                  </FormControl>
                ))}
              <div>
                <Button
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    remove(index);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          <FormMessage />
        </FormItem>
      );
    } else {
      return null;
    }
  });
};

const FormBuilder = ({
  formSchema,
  initialValues,
  handleFormSubmit,
}: {
  formSchema: ZodSchema;
  initialValues: any;
  handleFormSubmit: (values: any) => void;
}) => {
  if (Object.values(initialValues).length == 0) {
    initialValues = generateDefaultValues(formSchema);
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  function onSubmit(values: any) {
    handleFormSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-3/4">
        <FormFields schema={formSchema} control={form.control} />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
};

export default FormBuilder;
