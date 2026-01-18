import { Octokit } from '@octokit/rest';

export function createOctokit(accessToken: string) {
  return new Octokit({ auth: accessToken });
}

export interface Issue {
  number: number;
  title: string;
  state: string;
  html_url: string;
  created_at: string;
  labels: { name: string; color: string }[];
}

export interface PullRequest {
  number: number;
  title: string;
  state: string;
  html_url: string;
  merged: boolean;
}

export async function getIssues(octokit: Octokit, owner: string, repo: string): Promise<Issue[]> {
  const { data } = await octokit.issues.listForRepo({
    owner,
    repo,
    state: 'all',
    per_page: 20,
  });

  return data.map(issue => ({
    number: issue.number,
    title: issue.title,
    state: issue.state,
    html_url: issue.html_url,
    created_at: issue.created_at,
    labels: issue.labels.map(label =>
      typeof label === 'string'
        ? { name: label, color: '000000' }
        : { name: label.name || '', color: label.color || '000000' }
    ),
  }));
}

export async function getPullRequests(octokit: Octokit, owner: string, repo: string): Promise<PullRequest[]> {
  const { data } = await octokit.pulls.list({
    owner,
    repo,
    state: 'all',
    per_page: 20,
  });

  return data.map(pr => ({
    number: pr.number,
    title: pr.title,
    state: pr.state,
    html_url: pr.html_url,
    merged: pr.merged_at !== null,
  }));
}

export async function createIssue(
  octokit: Octokit,
  owner: string,
  repo: string,
  title: string,
  body: string
): Promise<Issue> {
  const { data } = await octokit.issues.create({
    owner,
    repo,
    title,
    body,
  });

  return {
    number: data.number,
    title: data.title,
    state: data.state,
    html_url: data.html_url,
    created_at: data.created_at,
    labels: [],
  };
}
