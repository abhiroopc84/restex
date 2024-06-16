import BulletSchema from "@/models/bullet";
import Education from "@/models/education";
import Experience from "@/models/experience";
import General from "@/models/general";
import OnelineSchema from "@/models/oneline";
import Publication from "@/models/publication";
import TextSchema from "@/models/text";
import { ZodSchema } from "zod";

export const schemas: { [key: string]: ZodSchema } = {
  text: TextSchema,
  education: Education.EducationSchema,
  experience: Experience.ExperienceSchema,
  general: General.GeneralSchema,
  oneline: OnelineSchema,
  publication: Publication.PublicationSchema,
  bullet: BulletSchema,
};

export const guischemas: { [key: string]: ZodSchema } = {
    text: TextSchema,
    education: Education.EducationGuiSchema,
    experience: Experience.ExperienceGuiSchema,
    general: General.GeneralGuiSchema,
    oneline: OnelineSchema,
    publication: Publication.PublicationGuiSchema,
    bullet: BulletSchema,
  };
