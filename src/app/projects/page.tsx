import { AppShell } from "@/components/layout/app-shell";
import { AddProjectModal } from "@/components/projects/add-project-modal";
import { ProjectCard } from "@/components/projects/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { FeedbackBanner } from "@/components/ui/feedback-banner";
import { PageHeader } from "@/components/ui/page-header";
import { getCurrentUser } from "@/lib/auth";
import { getProjectsPageData } from "@/lib/data";

type ProjectsPageProps = {
  searchParams: Promise<{
    notice?: string;
    noticeType?: string;
  }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const [user, projects, resolvedSearchParams] = await Promise.all([
    getCurrentUser(),
    getProjectsPageData(),
    searchParams,
  ]);

  return (
    <AppShell currentPath="/projects" userEmail={user?.email}>
      <PageHeader
        eyebrow="Workspace"
        title="Projects"
        description="Create project buckets for every stream of work, keep their status visible, and open each board when it is time to ship."
        action={<AddProjectModal redirectTo="/projects" />}
      />

      <FeedbackBanner
        notice={resolvedSearchParams.notice}
        noticeType={resolvedSearchParams.noticeType}
        variant="swal"
      />

      <section className="space-y-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} redirectTo="/projects" />
          ))
        ) : (
          <EmptyState
            title="No projects created"
            description="Start with a single project and add tasks as requests come in."
          />
        )}
      </section>
    </AppShell>
  );
}
