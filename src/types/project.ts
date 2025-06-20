export interface IProject {
  _id?: string;
  projectId: string;
  projectName: string;
  station: string;
  clientId: string;
  projectValue: number;
  deadline: Date | string; // ✅ Updated here
  cancellationNote?: string;
  teamName?: string;
  frontendRoleAssignedTo?: string;
  backendRoleAssignedTo?: string;
  uiRoleAssignedTo?: string;
  lastUpdate?: string;
  lastMeeting?: string;
  projectStatus?: "ui/ux" | "wip" | "new" | "qa" | "delivered" | "revision";
  estimatedDelivery?: "thisMonth" | "thisWeek" | "nextMonth";
  rating?: "1" | "2" | "3" | "4" | "5" | "noRating";
  clientStatus?:
    | "active"
    | "inactive"
    | "satisfied"
    | "unsatisfied"
    | "angry"
    | "neutral";
  figmaLink?: string;
  backendLink?: string;
  liveLink?: string;
  deliveryDate?: string;
  requirementDoc?: string;
  notes?: { noteProvider?: string; noteText?: string }[];
  createdAt?: string;
  updatedAt?: string;
}
