import { useQuery } from '@tanstack/react-query';
import type { IAppGraph } from '../types';

async function fetchAppGraph(appId: string): Promise<IAppGraph> {
  const res = await fetch(`/apps/${appId}/graph`);
  if (!res.ok) throw new Error('Failed to fetch graph');
  return res.json();
}

export function useAppGraph(appId: string) {
  return useQuery({
    queryKey: ['graph', appId],
    queryFn: () => fetchAppGraph(appId),
    enabled: !!appId,
  });
}
