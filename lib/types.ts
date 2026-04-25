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
