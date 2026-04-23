import type { MemberRole, Project, ProjectMember, ProjectStatus, User } from "@/generated/prisma/client";

export type { ProjectStatus, MemberRole };

export type ProjectWithOwner = Project & {
  owner: Pick<User, "id" | "name" | "image">;
  _count: { tasks: number; members: number };
};

export type ProjectWithMembers = Project & {
  members: (ProjectMember & {
    user: Pick<User, "id" | "name" | "image" | "email">;
  })[];
};

export type CreateProjectInput = {
  name: string;
  description?: string;
};

export type UpdateProjectInput = {
  name?: string;
  description?: string;
  status?: ProjectStatus;
};