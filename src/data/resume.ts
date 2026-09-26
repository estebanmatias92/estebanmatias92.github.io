import resumeYaml from "./resume.yaml?raw";
import { parse } from "yaml";

export interface ResumeData {
  contact: {
    name: string;
    headline: string;
    location: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  skills: { category: string; proficient: string[]; familiar: string[] }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    start: string;
    end: string;
    gpa: string;
    honors: string;
    specialization: string;
    omitOnResume: boolean;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    expiry: string;
    url: string;
    verified: boolean;
  }[];
  experienceProjects: {
    fingerprint: string;
    title: string;
    org: string;
    start: string;
    end: string;
    description: string;
    // Repo-only rule: url may hold a repository URL. Roles, teaching posts,
    // institutions, and non-repo coursework containers must use "".
    url: string;
    bullets: string[];
    tags: string[];
  }[];
  timelineNotes: { period: string; note: string }[];
  resumeVariants: Record<string, { summary?: string; featured: string[] }>;
  publications: unknown[];
  talks: unknown[];
  teaching: unknown[];
  grants: unknown[];
  opensource: unknown[];
  volunteer: unknown[];
}

export function loadResume(): ResumeData {
  return parse(resumeYaml) as ResumeData;
}
