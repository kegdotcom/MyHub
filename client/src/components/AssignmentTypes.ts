import { NumberLiteralType } from "typescript";

export interface TodoObj {
  type: string;
  assignment?: AssignmentObj;
  quiz?: QuizObj;
  ignore: string;
  ignore_permanently: string;
  html_url: string;
  needs_grading_count?: number;
  context_type: string;
  course_id: number;
  group_id?: number | null;
}

export interface AssignmentObj {
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  due_at: string;
  lock_at: string | null;
  unlock_at: string | null;
  has_overrides: boolean;
  all_dates?: object | string[] | string | null;
  course_id: number;
  html_url: string;
  submissions_download_url: string;
  assignment_group_id: number;
  allowed_extensions: string[];
  turnitin_enabled?: boolean;
  peer_reviews: boolean;
  automatic_peer_reviews: boolean;
  peer_review_count: number;
  peer_reviews_assign_at?: string;
  group_category_id?: number;
  needs_grading_count?: number;
  position?: number;
  points_possible: number;
  submission_types: string[];
  grading_type: string;
  published: boolean;
  locked_for_user: boolean;
  lock_explanation?: string;
  quiz_id?: number;
  omit_from_final_grade?: boolean;
  allowed_attempts: number;
  is_quiz_assignment: boolean;
  workflow_state: string;
}

export interface QuizObj {
  title: string;
  html_url: string;
  mobile_url: string;
  description: string;
  quiz_type: string;
  time_limit: number;
  hide_results: string | null;
  show_correct_answers?: boolean;
  allowed_attempts: number;
  question_count: number;
  points_possible: number;
  access_code?: string;
  due_at: string;
  lock_at: string;
  unlock_at: string;
  published: boolean;
  locked_for_user: boolean;
  locked_explanation?: string;
  question_types: string[];
}

export default interface FinalTaskObj {
  classification: string;
  type: string;
  name: string;
  description: string;
  dueDate: string;
  points: number;
  url: string;
  locked: boolean;
  courseID: number;
}
