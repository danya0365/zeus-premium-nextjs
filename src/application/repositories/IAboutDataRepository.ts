import { TeamValue, TimelineEvent } from "@/src/presentation/presenters/about/AboutPresenter";

export interface IAboutDataRepository {
  /**
   * Get all timeline events (milestones)
   */
  getTimeline(): Promise<TimelineEvent[]>;

  /**
   * Get all team values (core values)
   */
  getValues(): Promise<TeamValue[]>;
}
