/* eslint-disable @typescript-eslint/no-explicit-any */
import BulletSchema from "@/models/bullet";
import EducationSchema from "@/models/education";
import ExperienceSchema from "@/models/experience";
import GeneralSchema from "@/models/general";
import OnelineSchema from "@/models/oneline";
import PublicationSchema from "@/models/publication";
import { ZodError, ZodType } from "zod";

type Schema = {
  Education: ZodType<any, any, any>;
  Experience: ZodType<any, any, any>;
  General: ZodType<any, any, any>;
  Oneline: ZodType<any, any, any>;
  Publication: ZodType<any, any, any>;
  Bullet: ZodType<any, any, any>;
};

type UniqueProps = {
  Education: Array<string>;
  Experience: Array<string>;
  General: Array<string>;
  Oneline: Array<string>;
  Publication: Array<string>;
  Bullet: Array<string>;
};

type SchemaKey = keyof Schema;

const schemas: Schema = {
  Education: EducationSchema,
  Experience: ExperienceSchema,
  General: GeneralSchema,
  Oneline: OnelineSchema,
  Publication: PublicationSchema,
  Bullet: BulletSchema,
};

const unique_props: UniqueProps = {
  Education: ["degree", "field", "GPA"],
  Experience: ["company", "position", "current"],
  General: ["name"],
  Oneline: ["label", "details"],
  Publication: ["title", "authors", "journal", "doi"],
  Bullet: ["bullet"],
};

const haveCommonItems = (arr1: any[], arr2: string | any[]) => {
  return arr1.some((item) => arr2.includes(item));
};

const schemaMatcher = (
  sectionObject: object
): [boolean, SchemaKey, ZodType<any, any, any>, object, ZodError | object] => {
  const schemasKeys = Object.keys(schemas) as SchemaKey[];
  let resultSchema: [
    boolean,
    SchemaKey,
    ZodType<any, any, any>,
    object,
    ZodError | object
  ] = [false, schemasKeys[0], schemas[schemasKeys[0]], sectionObject, {}];

  // eslint-disable-next-line prefer-const
  for(let i in schemasKeys){
    console.log(schemasKeys[i])
    const result = schemas[schemasKeys[i]].safeParse(sectionObject);
    if (result.success) {
        resultSchema = [true, schemasKeys[i], schemas[schemasKeys[i]], sectionObject, {}];
        break;
    }
    else if (haveCommonItems(unique_props[schemasKeys[i]], Object.keys(sectionObject))) {
        resultSchema = [true, schemasKeys[i], schemas[schemasKeys[i]], sectionObject, result.error];
        break;
    }
  }

  return resultSchema;
};

export default schemaMatcher;
