/**
 * GitHub Webhook Payload Types
 */

export interface GitHubWebhookPayload {
  action: string;
  repository: Repository;
  check_run: CheckRun;
  installation: Installation;
  sender: Sender;
}

export interface Repository {
  full_name: string;
  name: string;
  owner: {
    login: string;
    type: string;
  };
  html_url: string;
}

export interface CheckRun {
  id: number;
  node_id: string;
  name: string;
  head_sha: string;
  status: string;
  conclusion: 'success' | 'failure' | 'neutral' | 'cancelled' | 'timed_out' | 'action_required' | null;
  started_at: string;
  completed_at: string;
  details_url: string;
  output: {
    title: string;
    summary: string | null;
    text: string | null;
    annotations_count: number;
    annotations_url: string;
  };
  check_suite: {
    id: number;
    node_id: string;
    head_branch: string;
    head_sha: string;
    workflow_run?: {
      id: number;
      name: string;
      run_number: number;
    };
  };
  pull_requests?: Array<{
    number: number;
    title: string;
    head: {
      ref: string;
      sha: string;
      repo: Repository;
    };
    base: {
      ref: string;
      sha: string;
      repo: Repository;
    };
  }>;
}

export interface Installation {
  id: number;
  node_id: string;
  account: {
    login: string;
    type: string;
  };
}

export interface Sender {
  login: string;
  type: string;
}

/**
 * AI Analysis Types
 */

export type FailureType =
  | 'code_regression'
  | 'flaky_test'
  | 'infrastructure_timeout'
  | 'dependency_issue'
  | 'unknown';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface FailureAnalysis {
  type: FailureType;
  confidence: ConfidenceLevel;
  summary: string;
  errorDetails?: string;
  culpritFiles?: string[];
  suggestedFix?: string;
}

export interface AnalysisResult extends FailureAnalysis {
  prNumber?: number;
  checkRunId: number;
  repoFullName: string;
  runUrl?: string;
}

/**
 * API Response Types
 */

export interface WebhookResponse {
  success: boolean;
  message?: string;
  analysis?: AnalysisResult;
  error?: string;
}

export interface HealthCheckResponse {
  status: 'ok';
  timestamp: string;
}
Refinement 35: Cleaning up whitespace and indentations
Refinement 55: Adding descriptive comments for better maintainability
Refinement 65: Adding descriptive comments for better maintainability
Refinement 89: Standardizing code style and formatting
Refinement 142: Adding descriptive comments for better maintainability
Refinement 163: Standardizing code style and formatting
Refinement 216: Updating documentation for future reference
Refinement 226: Improving consistency across the module
Refinement 270: Updating documentation for future reference
Refinement 327: Optimizing logic in small sections
Refinement 402: Refining variable names for clarity
Refinement 412: Adding internal developer notes
Refinement 415: Refining variable names for clarity
Refinement 435: Refining variable names for clarity
Refinement 442: Optimizing logic in small sections
Refinement 20: Improving code documentation
Refinement 36: Standardizing code style and formatting
Refinement 122: Standardizing code style and formatting
Refinement 132: Improving consistency across the module
Refinement 161: Updating documentation for future reference
Refinement 194: Updating documentation for future reference
Refinement 220: Refining variable names for clarity
Refinement 288: Minor refactoring of function calls
Refinement 289: Refining variable names for clarity
Refinement 294: Minor refactoring of function calls
Refinement 315: Adding descriptive comments for better maintainability
Refinement 340: Adding descriptive comments for better maintainability
Refinement 374: Improving code documentation
Refinement 380: Improving code documentation
Refinement 400: Improving code documentation
